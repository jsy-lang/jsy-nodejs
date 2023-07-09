#!/bin/sh
JSY_PRE=""
JSY_EVAL=${*:-1}

while getopts 'a:c:e:' OPT ; do
  case $OPT in
    a) JSY_PRE="$JSY_PRE;\n${OPTARG};" ;;
    c) JSY_EVAL=$OPTARG ;;
    e) JSY_EVAL=$OPTARG ;;
    y) JSY_EVAL=$OPTARG ;;
  esac
done

JSY_EVAL=$(echo $JSY_PRE '\n;\n' $JSY_EVAL | jsy-transpile -)
#echo "jsy-eval: $JSY_EVAL"

exec node \
  --loader @jsy-lang/nodejs/jsy.js \
  --no-warnings \
  --input-type=module \
  --eval "$JSY_EVAL"
