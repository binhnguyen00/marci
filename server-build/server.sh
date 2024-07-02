source utils.sh

PID_FILE="/tmp/server_app.pid"
LOG_FILE="/tmp/server_app.log"

bin=`cd "$bin"; pwd`
PROJECT_DIR=`cd $bin/..; pwd`
APP_HOME="$PROJECT_DIR/hr/app"

if $window; then
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
LIB="$PROJECT_DIR:$APP_RELEASE_HOME/libs/*:$APP_RELEASE_HOME/libs/springboot/*:$APP_RELEASE_HOME/libs/hibernate/*:$APP_RELEASE_HOME/libs/common/*"
CLASSPATH="${CLASSPATH}:$LIB:$APP_CONFIG_HOME"

if $window; then
  CLASSPATH=`cygpath --path --windows "$CLASSPATH"`
fi

function start() {
  DATETIME=$(date '+%Y.%m.%d.%H%M%S')
  PROFILE=$(get_opt --profile 'console' $@)
  CONFIG_FILES="file:$APP_CONFIG_HOME/application.yaml"
  CLASS="net.marci.app.core.ServerApp"
  ARGS="""
    --app.home=$APP_SERVER_HOME 
    --app.config.dir=$APP_CONFIG_HOME 
    --build.version=$DATETIME 
    --spring.config.location=$CONFIG_FILES
  """

  DAEMON_OPT=$(has_opt "-daemon" $@ )
  if [ "$DAEMON_OPT" = "true" ] ; then
    JAVA_OPTS="$JAVA_OPTS -Dspring.profiles.active=$PROFILE,deamon"
    nohup "$JAVACMD" -cp "$CLASSPATH" $JAVA_OPTS $CLASS $ARGS $@ > $LOG_FILE 2>&1 < /dev/null &
    printf '%d' $! > $PID_FILE
  else
    JAVA_OPTS="$JAVA_OPTS -Dspring.profiles.active=$PROFILE"
    exec "$JAVACMD" -cp "$CLASSPATH" $JAVA_OPTS $CLASS $ARGS $@
  fi
}

function stop() {
  STOP_OPT=$(has_opt "stop" $@ )
  PID=`cat $PID_FILE`
  kill -9 $PID
  echo "Stopped processs $PID"
}

COMMAND=$1;
shift

echo ">> JAVA_HOME: $JAVA_HOME"
echo ">> JAVA_OPTS: $JAVA_OPTS"
echo ">> APP_HOME:  $APP_HOME"

if [ "$COMMAND" = "start" ] ; then
  start $@
elif [ "$COMMAND" = "stop" ] ; then
  stop $@
else
  echo "Usage: "
  echo "  To run the server as daemon"
  echo "    ./server.sh -daemon "
  echo "  To stop the daemon server"
  echo "    ./server.sh stop "
  echo "  To run the server as console"
  echo "    ./server.sh start"
fi
