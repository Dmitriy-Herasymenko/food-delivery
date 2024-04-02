#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

osascript -e "tell application \"Terminal\" to do script \"cd '$DIR/backend' && npm run start:dev\""

sleep 5

osascript -e "tell application \"Ter minal\" to do script \"cd '$DIR/ui' && npm run dev\""
 