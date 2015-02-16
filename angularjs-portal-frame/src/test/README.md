### Installing Test Dependencies

Global dependencies
```shell
sudo npm install -g grunt-cli
```

```shell
npm install karma --save-dev  
npm install karma-jasmine --save-dev
npm install karma-chrome-launcher --save-dev
npm install karma-htmlfile-reporter --save-dev
npm install jasmine-core --save-dev
npm install grunt --save-dev
npm install grunt-karma --save-dev
```

may require sudo

### Running Unit tests
```shell
grunt karma:unit
```