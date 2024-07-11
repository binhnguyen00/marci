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

function buildUI() {
  CLEAN_OPT=$(has_opt "-clean" $@)
  
  TARGET=`cd $CORE_HOME/ui/lib; pwd`
  echo "\\n--------------------------------"
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

function _buildUI() {
  cd $TARGET
  if [ $CLEAN_OPT = "true" ] ; then
    rm -rf node_modules dist
    pnpm install
    pnpm run build
  else 
    if [ ! -d "./node_modules" ]; then pnpm install; fi
    rm -rf dist
    pnpm run build
  fi
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
  echo "\\n--------------------------------"
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
  echo "\\n--------------------------------"
  echo "DEPLOYING MARCI..."
  echo "--------------------------------"

  CLEAN_OPT="true"
  build $@ $CLEAN_OPT
  release $@ $CLEAN_OPT
}

function showHelp() {
  echo """
These are commands used in various situations:

Deploy Project
  deploy            Include [build], [release] and [-clean] process

Build Project
  build             Compile Server & UI
  build-ui          Compile Typescript code
  build-server      Compile Java code
  [-clean]          Remove Server release jars & UI's node_modules, dist. 
                    In case of update dependencies's version in package.json, You might need to remove pnpm-lock.yaml by hand.

Release Project
  release           Release server's jars

Other Commands
  help              Show this help message

"""
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
  showHelp
else
  ./project.sh help 
fi