#!/bin/sh

set -e

cmd="$@"

while ! curl -sSL "http://${HOST}:4444/wd/hub/status" 2>&1 \
        | jq -r '.value.ready' 2>&1 | grep "true" >/dev/null; do
    echo "Waiting for the Grid readiness on '${HOST}'."
    sleep 1
done

>&2 echo "Selenium Grid is up - executing tests."
exec $cmd