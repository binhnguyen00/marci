#!/usr/bin/env bash

windowsOS=false
if [ "$OSTYPE" = "msys" ] ; then
  windowsOS=true;
elif [[ "$OSTYPE" == "cygwin" ]]; then
  windowsOS=true;
elif [[ "$OSTYPE" == "win32" ]]; then
  windowsOS=true;
fi

bin=`cd "$bin"; pwd`
CURRENT_DIR=`cd $bin; pwd`

function has_opt() {
  OPT_NAME=$1
  shift
  for i in "$@"; do
    if [[ $i == $OPT_NAME ]] ; then
      echo "true"
      return
    fi
  done
  echo "false"
}

function get_opt() {
  OPT_NAME=$1
  DEFAULT_VALUE=$2
  shift

  for i in "$@"; do
    index=$(($index+1))
    if [[ $i == $OPT_NAME* ]] ; then
      value="${i#*=}"
      echo "$value"
      return
    fi
  done
  echo $DEFAULT_VALUE
}