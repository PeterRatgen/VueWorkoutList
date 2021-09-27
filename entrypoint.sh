#!/bin/sh

ROOT_DIR=/app/dist

echo "Replacing env constants in JS"
for file in $ROOT_DIR/js/*.js;
do
  echo "Processing $file ...";

  sed -i 's|process.env.VUE_APP_API_URL|"'${VUE_APP_API_URL}'"|g' $file

done
