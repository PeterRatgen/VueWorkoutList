#!/bin/sh

echo "Replacing env constants in JS"
for file in ./dist/js/*.js;
do
  echo "Processing $file ...";

  sed -i 's|process.env.VUE_APP_API_URL|"'${VUE_APP_API_URL}'"|g' $file

done
