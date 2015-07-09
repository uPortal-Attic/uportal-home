FROM codenvy/jdk7_tomcat7

$debug?EXPOSE 8000:$
$debug?ENV CODENVY_APP_PORT_8000_DEBUG 8000:$
$debug?CMD ./catalina.sh jpda run 2>&1:$

ADD $build$ /home/user/tomcat7/webapps

ADD $src$/src/main/webapp/index.html /home/user/tomcat7/webapps/ROOT/index.html
ADD $src$/src/main/webapp/badger-animal.jpg /home/user/tomcat7/webapps/ROOT/badger-animal.jpg
