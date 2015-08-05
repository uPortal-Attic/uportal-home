<!DOCTYPE html>
<html lang="en-US" class="respondr">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
  <meta name="apple-mobile-web-app-capable" content="yes"/>
  <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
  <meta name="description" content="MyUW"/>
  <meta name="keywords" content="portal, uPortal, academic, higher education, open source, enterprise, JA-SIG, JASIG, Jasig"/>
  <base href="<%=getServletContext().getContextPath() %>/">
  <!-- CSS links -->
  <!-- Latest compiled and minified CSS -->
  <!-- <link href="css/font-awesome.min.css" rel="stylesheet" type="text/css"/> -->
  <link href="css/angular.${project.version}.css" rel="stylesheet" type="text/css"/>
  <link href="my-app/my-app.css" rel="stylesheet" type="text/css"/>
  <link rel="shortcut icon" href="bower_components/uw-ui-toolkit/dist/img/favicon.ico" type="image/x-icon"/>
</head>

<body ng-controller="MainController as mainCtrl">
  <div class='sr-only' ng-if="classicURL">
    <a ng-href='{{classicURL}}'>Switch back to the classic MyUW</a>
  </div>
  <div ng-controller="WelcomeController as welcomeCtrl">
    <!--[if lt IE 10]>
    <div class="browserupgrade">
      <span class="fa fa-frown-o"></span>
      <p>Sorry, MyUW beta does not support your browser.<br/><a href="https://kb.wisc.edu/myuw/page.php?id=51345">Learn how to upgrade your browser.</a><br/>Can't upgrade? <a href="http://my.wisc.edu/portal/Login?profile=default">Switch back to MyUW classic.</a></p>
    </div>
    <![endif]-->
    <noscript>
        <div class="alert alert-warning alert-dismissible" role="alert" style="margin-bottom:0;">
        <div class="container">
          <i class="fa fa-2x fw fa-exclamation-triangle pull-left"></i>
          <strong>
            Please <a href="http://enable-javascript.com" target="_blank">enable Javascript</a> to interact with all forms and features on our website.  For further assistance, contact the <a href="https://kb.wisc.edu/helpdesk/" target="_blank">DoIT Help Desk</a>.
          </strong>
        </div>
      </div>
    </noscript>

      <!-- beta header -->
      <!-- <beta-header></beta-header> -->
      <!-- HEADER -->
      <div class="container-fluid" id="body-background">
        <portal-header></portal-header>

        <!-- Body -->
        <div class="row page-content">

          <div class="region-sidebar-left col-sm-2 col-xs-0 hidden-xs no-margin" ng-if="$storage.showSidebar">
              <side-bar-menu></side-bar-menu>
          </div>
          <div ng-if="!($storage.showSidebar)" class="show-sidebar" ng-click="$storage.showSidebar = true">
            <span class="fa fa-bars"></span>
          </div>
          <div id="region-main" class="col-xs-12 my-uw" ng-class="{'col-sm-10 col-sm-offset-2' : $storage.showSidebar, 'col-sm-11 max-view' : !($storage.showSidebar)}">
            <div ng-view></div>
          </div>
        </div>
      </div>
    </div>
  <!-- FOOTER  -->
  <site-footer></site-footer>
  <script type="text/javascript" src="js/config.js"></script>
  <script type="text/javascript" src="js/ga.js"></script>
  <script type="text/javascript" src="bower_components/requirejs/require.js" data-main="main"></script>

</body>
</html>
