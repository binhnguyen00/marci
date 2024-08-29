source ./common/utils.sh

CORE_HOME=`cd $CURRENT_DIR/../../core; pwd`
HR_HOME=`cd $CURRENT_DIR/../hr; pwd`
REALEASE_HOME=`cd $HR_HOME/app/core; pwd`

function buildProjectCore() {
  echo """
--------------------------------
Building Marci Core...
Project Directory: $CORE_HOME
-------------------------------- """

  cd $CORE_HOME
  if [ $CLEAN_OPT = "true" ] ; then
    gradle clean build publishToMavenLocal -x test --warning-mode all
  else 
    gradle build publishToMavenLocal -x test --warning-mode all
  fi
}

function buildProjectHr() {
  echo """
--------------------------------
Building Marci HR...
Project Directory: $HR_HOME
-------------------------------- """

  cd $HR_HOME
  if [ $CLEAN_OPT = "true" ] ; then
    gradle clean build publishToMavenLocal -x test --warning-mode all
  else 
    gradle build publishToMavenLocal -x test --warning-mode all
  fi
}

function buildServer() {
  CLEAN_OPT=$(has_opt "-clean" $@)
  buildProjectCore $CLEAN_OPT
  buildProjectHr $CLEAN_OPT
  release $CLEAN_OPT
}

function buildUI() {
  CLEAN_OPT=$(has_opt "-clean" $@)
  
  TARGET=`cd $CORE_HOME/ui/lib; pwd`
  echo """
--------------------------------
Building UI Marci Core...
Project Directory: $TARGET
-------------------------------- """
  _buildUI $TARGET $CLEAN_OPT

  TARGET=`cd $HR_HOME/ui/hr; pwd`
  echo """
--------------------------------
Building UI Marci HR...
Project Directory: $TARGET
-------------------------------- """
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
  echo """
--------------------------------
Releasing Marci...
Project Directory: $REALEASE_HOME
-------------------------------- """

  cd $REALEASE_HOME
  if [ -d "./release" ]; then
    rm -rf ./release
  fi
  gradle release -x test
}

function deploy() {
  echo """
--------------------------------
DEPLOYING MARCI...
-------------------------------- """

  CLEAN_OPT="true"
  build $@ $CLEAN_OPT
  release $@ $CLEAN_OPT
}

function showHelp() {
  echo """
Usage: ./project [COMMAND] [-OPTION]

These are commands used in various situations:

Deploy Project
  [COMMAND]
  deploy            Include [build], [release] and [-clean] process

Build Project
  [COMMAND]
  build             Compile Java & Typescript code
  build-ui          Compile Typescript code
  build-server      Compile Java code

  [-OPTION]
  -clean            Remove Server release jars & UI's node_modules, dist. 
                    In case of updating dependencies' versions in package.json, You might need to remove pnpm-lock.yaml by hand.

Release Project
  [COMMAND]
  release           Release server's jars

Other Commands
  [COMMAND]
  help              Show command usages

"""
}

COMMAND=$1;
if [ -n "$COMMAND" ]; then
  shift
else
  echo "No command provided. Showing help..."
  showHelp
  exit 1
fi

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
