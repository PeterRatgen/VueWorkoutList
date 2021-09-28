#!/bin/sh

ROOT_DIR=/app/dist

echo "Replacing env constants in JS"

echo "${VUE_APP_API_URL}"

ls /app/dist/js
for file in $ROOT_DIR/js/*.js; do
  echo "Processing $file ...";

  sed -i 's|process.env.VUE_APP_API_URL|"'${VUE_APP_API_URL}'"|g' $file
  sed -i 's|VUE_APP_API_URL|"'${VUE_APP_API_URL}'"|g' $file
done
