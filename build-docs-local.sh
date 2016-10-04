#!/bin/bash

TARGET_DIR=./doc_target

#reset target
rm -rf ${TARGET_DIR}
mkdir ${TARGET_DIR}

# checkout uw-frame
pushd ${TARGET_DIR}
git clone --depth 1 https://github.com/UW-Madison-DoIT/uw-frame.git
pushd uw-frame
npm install
npm run build-docs
popd #back to target_dir

mkdir -p gh-pages
popd #back to root

cp -r ${TARGET_DIR}/uw-frame/docs/target/* ${TARGET_DIR}/gh-pages/
rm -rf ${TARGET_DIR}/gh-pages/markdown


cp -r docs/markdown ${TARGET_DIR}/gh-pages/markdown
cp -r docs/img ${TARGET_DIR}/gh-pages/
cp docs/override.js ${TARGET_DIR}/gh-pages/js/override.js

pushd ${TARGET_DIR}/gh-pages
echo "configuration complete, firing http-server"
http-server
popd
