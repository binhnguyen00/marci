source utils.sh

CORE_HOME=`cd $CURRENT_DIR/../core; pwd`
HR_HOME=`cd $CURRENT_DIR/../hr; pwd`
REALEASE_HOME=`cd $HR_HOME/app/core; pwd`

function buildProjectCore() {
  echo -e "\n>> Building Marci Core..."
  echo ">> Project Directory: $CORE_HOME"
  echo -e "--------------------------------\n"

  cd $CORE_HOME
  if [ $CLEAN_OPT = "true" ] ; then
    gradle clean build publishToMavenLocal -x test
  else 
    gradle build publishToMavenLocal -x test
  fi
}

function buildProjectHr() {
  echo -e "\n>> Building Marci HR..."
  echo ">> Project Directory: $HR_HOME"
  echo -e "--------------------------------\n"

  cd $HR_HOME
  if [ $CLEAN_OPT = "true" ] ; then
    gradle clean build publishToMavenLocal -x test
  else 
    gradle build publishToMavenLocal -x test
  fi
}

function build() {
  CLEAN_OPT=$(has_opt "-clean" $@)
  buildProjectCore $CLEAN_OPT
  buildProjectHr $CLEAN_OPT
}

function release() {
  echo -e "\n>> Releasing Marci..."
  echo ">> Project Directory: $REALEASE_HOME"
  echo -e "--------------------------------\n"

  cd $REALEASE_HOME
  gradle release -x test
}

function deploy() {
  echo -e "\n>> Deploying Marci..."
  echo -e "--------------------------------\n"

  build $@
  release $@
}

COMMAND=$1;
shift

if [ "$COMMAND" = "build" ] ; then
  build $@
elif [ "$COMMAND" = "release" ] ; then
  release $@
elif [ "$COMMAND" = "deploy" ] ; then
  deploy $@
elif [ "$COMMAND" = "help" ] ; then
  echo "1. Deploy Project (Include build + release process)"
  echo ">> ./project.sh deploy"
  echo "2. Build Project"
  echo "  a. Just Build"
  echo "  >> ./project.sh build"
  echo "  b. Clean Build"
  echo "  >> ./project.sh build -clean"
  echo "3. Release Project"
  echo ">> ./project.sh release"
else
  echo "Get help with commands"
  echo ">> ./project.sh help" 
fi