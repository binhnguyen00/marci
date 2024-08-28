source ./utils.sh

PID_FILE="/tmp/server_app.pid"
LOG_FILE="/tmp/server_app.log"

PROJECT_DIR=`cd $CURRENT_DIR/..; pwd`
APP_HOME="$PROJECT_DIR/hr/app"

if $windowsOS; then
  JAVA_HOME=`cygpath --absolute --windows "$JAVA_HOME"`
  APP_HOME=`cygpath --path --windows "$APP_HOME"`
fi

APP_SERVER_HOME="$APP_HOME/core"
APP_CONFIG_HOME="$APP_HOME/config"
APP_RELEASE_HOME="$APP_HOME/release"

JAVACMD="$JAVA_HOME/bin/java"
JAVA_OPTS="""
  -server 
  -XX:+UseParallelGC 
  -Xshare:auto 
  -Xms128m 
  -Xmx1024m 
  -Dfile.encoding=UTF-8
  -Duser.dir=$APP_SERVER_HOME
"""
LIB="$PROJECT_DIR:$APP_RELEASE_HOME/libs/marci/*:$APP_RELEASE_HOME/libs/springboot/*:$APP_RELEASE_HOME/libs/hibernate/*:$APP_RELEASE_HOME/libs/common/*"
CLASSPATH="${CLASSPATH}:$LIB:$APP_CONFIG_HOME"

if $windowsOS; then
  CLASSPATH=`cygpath --path --windows "$CLASSPATH"`
fi

function start() {
  DATETIME=$(date '+%Y.%m.%d.%H%M%S')
  PROFILE=$(get_opt --profile 'console' $@)


  if [ $PROFILE_PRODUCTION = "true" ] ; then
    CONFIG_FILES="file:$APP_CONFIG_HOME/application-production.yaml"
    INITIAL_DATA="false"
  else 
    CONFIG_FILES="file:$APP_CONFIG_HOME/application.yaml"
    INITIAL_DATA="true"
  fi

  CLASS="net.marci.app.core.ServerApp"
  ARGS="""
    --app.home=$APP_SERVER_HOME 
    --app.config.dir=$APP_CONFIG_HOME 
    --build.version=$DATETIME 
    --spring.config.location=$CONFIG_FILES
    --initial.data=$INITIAL_DATA
  """

  DAEMON_OPT=$(has_opt "-daemon" $@ )
  if [ "$DAEMON_OPT" = "true" ] ; then
    JAVA_OPTS="$JAVA_OPTS -Dspring.profiles.active=$PROFILE,deamon"
    nohup "$JAVACMD" -cp "$CLASSPATH" $JAVA_OPTS $CLASS $ARGS $@ > $LOG_FILE 2>&1 < /dev/null &
    printf '%d' $! > $PID_FILE
  else
    echo """
--------------------------------
STARTING SERVER...
--------------------------------
    """
    JAVA_OPTS="$JAVA_OPTS -Dspring.profiles.active=$PROFILE"
    echo ">> JAVA_HOME: $JAVA_HOME"
    echo ">> JAVA_OPTS: $JAVA_OPTS"
    echo ">> APP_HOME:  $APP_HOME"
    exec "$JAVACMD" -cp "$CLASSPATH" $JAVA_OPTS $CLASS $ARGS
  fi
}

function stop() {
  STOP_OPT=$(has_opt "stop" $@ )
  PID=`cat $PID_FILE`
  kill -9 $PID
  echo "Stopped processs $PID"
}

function startUI() {
  cd $PROJECT_DIR/hr/ui/hr
  if [ ! -d "dist" ] ; then
    echo """
----------------------------------
No dist folder found !!!
Build the UI in order to process. 
Use ./project.sh for more details.
----------------------------------
    """
  else 
    pnpm run server
  fi
}

function showHelp() {
  echo """
Usage: ./server.sh [COMMAND] [-OPTION]

These are common commaneds to run the server

Start the server:
  [COMMAND]
  start               Run the server as console
  stop                Stop the server
  
  [-OPTION]
  -daemon             Run the server as daemon
  -production         Database won't be drop

Start the UI:
  start-ui            Run the UI

Other Commands
  [COMMAND]
  help                Show command usages

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

if [ "$COMMAND" = "start" ] ; then
  PROFILE_PRODUCTION=$(has_opt "-production" $@)
  start $@ $PROFILE_PRODUCTION
elif [ "$COMMAND" = "stop" ] ; then
  stop $@
elif [ "$COMMAND" = "help" ] ; then
  showHelp
elif [ "$COMMAND" = "start-ui" ] ; then
  startUI $@
else
  ./server.sh help
fi
