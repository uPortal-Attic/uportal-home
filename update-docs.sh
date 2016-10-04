#/bin/bash

TARGET_DIR=./doc_target

cp -r docs/markdown ${TARGET_DIR}/gh-pages/
cp -r docs/img ${TARGET_DIR}/gh-pages/
cp docs/override.js ${TARGET_DIR}/gh-pages/js/override.js
