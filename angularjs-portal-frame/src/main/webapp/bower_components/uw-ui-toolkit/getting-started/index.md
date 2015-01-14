---
layout: page
title: Getting Started
slug: getting-started
---

<p class="lead">
  The UW UI Toolkit can be easily added to your project. There are two different ways of doing this, depending on your needs and skill level:
</p>

##1. Download the UW UI Toolkit compiled files (easy, best for front-end development): ##

1. [Download](https://github.com/UWMadisonUcomm/uw-ui-toolkit/releases/download/v0.1.5/uw-ui-toolkit-0.1.5.zip) the compressed files and open them.
2. Link the CSS and JavaScript files in your HTML as follows (you can also use the [examples](/examples/) as a starting point for your project):


        <html>
          <head>
            <title>Your site title</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <link href="/css/uw-ui-toolkit.css" rel="stylesheet" media="screen">
            <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
          </head>

          ...
          
          <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
          <script src="//netdna.bootstrapcdn.com/bootstrap/3.0.2/js/bootstrap.min.js"></script>
          </body>
        </html>

<br>
## 2. Download the UW UI Toolkit source code (advanced, best for customizing and/or contributing to the project): ##

<p class="lead">If you want to either customize or contribute to the UW UI Toolkit project, please follow the steps below to set up your development environment.</p>

<br>
#### 1. Get the code using either of these methods:

  - Install via bower:
  
        $ bower install uw-ui-toolkit
 
  - Install via npm:
  
        $ npm install uw-ui-tookit (<-- need to register)

  - **For contributors:** Fork from GitHub:
  
        $ git clone git@github.com:UWMadisonUcomm/uw-ui-toolkit.git        

<br>
#### 2. Set up your development environment:

After cloning/downloading the files, `cd` into your UW UI Toolkit's directory and:

1. Install [Node.js](http://nodejs.org/) modules (Node.js is needed for downloading the required dependencies to compile the UW UI Toolkit).

        $ npm install

1. Install [Grunt](http://gruntjs.com/) command line tools (Grunt is needed for building and compiling the UW UI Toolkit's source code).

        $ npm install -g grunt-cli

1. Install [Jekyll](http://jekyllrb.com/) (Jekyll is needed to generate the sample files of the UW UI Toolkit)

        $ bundle install

<br>
#### 3. Start the local server ####

1. To start the local web server, run:
        
        $ jekyll serve --watch

1. View the site at [http://localhost:4000](http://localhost:4000)

<br>
#### 4. Compile the LESS ####

1. To compile the LESS files, run:

        $ grunt watch


The *watch* task will dynamically recompile your CSS as you save changes to the LESS files.
