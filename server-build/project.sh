source utils.sh

CORE_HOME=`cd $CURRENT_DIR/../core; pwd`
HR_HOME=`cd $CURRENT_DIR/../hr; pwd`
REALEASE_HOME=`cd $HR_HOME/app/core; pwd`

function buildProjectCore() {
  echo "\\n--------------------------------"
  echo ">> Building Marci Core..."
  echo ">> Project Directory: $CORE_HOME"
  echo "--------------------------------\\n"

  cd $CORE_HOME
  if [ $CLEAN_OPT = "true" ] ; then
    gradle clean build publishToMavenLocal -x test
  else 
    gradle build publishToMavenLocal -x test
  fi
}

function buildProjectHr() {
  echo "\\n--------------------------------"
  echo ">> Building Marci HR..."
  echo ">> Project Directory: $HR_HOME"
  echo "--------------------------------"

  cd $HR_HOME
  if [ $CLEAN_OPT = "true" ] ; then
    gradle clean build publishToMavenLocal -x test
  else 
    gradle build publishToMavenLocal -x test
  fi
}

function buildServer() {
  CLEAN_OPT=$(has_opt "-clean" $@)
  buildProjectCore $CLEAN_OPT
  buildProjectHr $CLEAN_OPT
}

function _buildUI() {
  cd $TARGET
  if [ $CLEAN_OPT = "true" ] ; then
    rm -rf node_modules dist pnpm-lock.yaml
    pnpm install
    pnpm run build
  else 
    if [ ! -d "./node_modules" ]; then pnpm install; fi
    rm -rf dist
    pnpm run build
  fi
}

function buildUI() {
  CLEAN_OPT=$(has_opt "-clean" $@)
  
  TARGET=`cd $CORE_HOME/ui/lib; pwd`
  echo "\\--------------------------------"
  echo ">> Building UI Marci Core..."
  echo ">> Project Directory: $TARGET"
  echo "--------------------------------\\n"
  _buildUI $TARGET $CLEAN_OPT

  TARGET=`cd $HR_HOME/ui/hr; pwd`
  echo "\\n--------------------------------"
  echo ">> Building UI Marci HR..."
  echo ">> Project Directory: $TARGET"
  echo "--------------------------------\\n"
  _buildUI $TARGET $CLEAN_OPT
}

function build() {
  CLEAN_OPT=$(has_opt "-clean" $@)

  buildProjectCore $CLEAN_OPT
  TARGET=`cd $CORE_HOME/ui/lib; pwd`
  _buildUI $TARGET $CLEAN_OPT

  buildProjectHr $CLEAN_OPT
  TARGET=`cd $HR_HOME/ui/hr; pwd`
  _buildUI $TARGET $CLEAN_OPT
}

function release() {
  echo ""
  echo ">> Releasing Marci..."
  echo ">> Project Directory: $REALEASE_HOME"
  echo "--------------------------------"

  cd $REALEASE_HOME
  if [ -d "./release" ]; then
    rm -rf ./release
  fi
  gradle release -x test
}

function deploy() {
  echo "--------------------------------"
  echo "DEPLOYING MARCI..."
  echo "--------------------------------"

  build $@
  release $@
}

COMMAND=$1;
shift

if [ "$COMMAND" = "build-server" ] ; then
  buildServer $@
elif [ "$COMMAND" = "build-ui" ] ; then
  buildUI $@
elif [ "$COMMAND" = "build" ] ; then
  build $@
elif [ "$COMMAND" = "release" ] ; then
  release $@
elif [ "$COMMAND" = "deploy" ] ; then
  deploy $@
elif [ "$COMMAND" = "help" ] ; then
  echo "\\nThese are commands used in various situations:\n"
  echo "Deploy Project"
  echo "    deploy        \\t Include build + release process"
  echo ""
  echo "Build Project"
  echo "    build         \\t Complie Server & UI"
  echo "    build-ui      \\t Complie Typescript code"
  echo "    build-server  \\t Compile Java code"
  echo "    [-clean]      \\t Remove Server/UI/both packages"
  echo ""
  echo "Release Project"
  echo "    release       \\t Release server's jars"
  echo ""
else
  ./project.sh help 
fi
