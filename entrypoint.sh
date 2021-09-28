#!/bin/sh

ROOT_DIR=/app/dist

echo "Replacing env constants in JS"
echo "${RUN_TIME_API_URL}"

ls /app/dist/js
for file in $ROOT_DIR/js/*.js; do
  echo "Processing $file ...";

  sed -i 's|RUN_TIME_API_URL|'${RUN_TIME_API_URL}'|g' $file
done

http-server dist --cors
