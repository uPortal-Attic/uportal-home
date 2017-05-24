# Widget types and configuration

Widgets are designed to be flexible - users can accomplish or access a single task or piece of information, or they can access
a collection of related things that will help them accomplish their task.

Widgets can:

* Provide users with real-time, continuous info about their account (e.g. list of pay statements in the Payroll Information widget, Wiscard balance in the Wiscard widget)
* Provide users with a snapshot of information that may impact their decision to take an action (e.g. adding money to my Wiscard)
* Support periodic user action (e.g. viewing pay statements)
* Allow users to quickly access pieces of the app to complete key or regular tasks (e.g. Course Services, My Professional Development, Course Guide)
* Provide users with at-a-glance information that represents the main use for the widget (e.g. Weather)

## Basic widgets

The barebones widget provides an app title, a large icon, and a launch button with configurable text. It's a simple link to an app or external URL.

![basic widget](./img/basic-widget.png)

### Sample entity file

This code block includes most of the fields needed to configure a widget, but there are additional XML tags (`<portlet-definition>`) you'll need
to create one from scratch. [See the full entity file](./assets/examples/example-entity.xml) for a complete example.

```xml
<title>Enrollment</title>
<name>Enrollment</name>
<fname>enrollment-experience</fname>
<desc>Try out the newly redesigned student enrollment experience</desc>
<parameter>
  <name>faIcon</name>
  <value>fa-university</value>
</parameter>
<parameter>
  <name>alternativeMaximizedLink</name>
  <value>https://enroll.wisc.edu/</value>
</parameter>
<portlet-preference>
  <name>keywords</name>
  <value>enroll</value>
  <value>enrollment</value>
  <value>SOAR</value>
</portlet-preference>
<portlet-preference>
  <name>content</name>
  <readOnly>false</readOnly>
  <value>
    <![CDATA[
      <p>Access the
        <a href="https://enroll.wisc.edu" target="_blank" rel="noopener noreferrer">student enrollment app</a>.
      </p>
    ]]>
  </value>
</portlet-preference>
```

#### About entity file values

* **title**: The widget title
* **fname**: The technical name of the app entry (lowercase and hyphenated)
* **desc**: Description of the app (visible when hovering the widget's "info" icon
* **faIcon** parameter: The widget's icon
* **alternativeMaximizedLink** parameter: An optional parameter to use if your widget links to an external URL
* **keywords** portlet-preference: A list of keywords to expose your widget when users search the portal marketplace
* **content** portlet-preference: A required snippet of static content. If your widget has an alternativeMaximizedLink, this content will never be visible, but it's still required.

The above attributes are all you need to configure a basic widget!

***Notes:***

* *DO NOT USE a `widgetType` portlet-preference if you want a basic widget*
* *Some of these parameters may not be required (ex. faIcon) when using the predefined widget types described below*
* *The above descriptions are in the context of widgets only. Most entity file attributes have other functions within the portal. Ask your portal development team if you want to know more about entity files.*

# Predefined widget types

+ List of links
+ Search with links
+ RSS widget

## Advantages of widget types

Widget types provide a predefined standard template that can do a lot more than a basic widget while saving you the trouble of creating a custom design.

+ It is less development effort to compose configuration and data for an existing widget type than to develop a novel widget.
+ Widget types are maintained as part of the AngularJS-Portal product, so usages of these types will less often need developer attention to keep them looking up-to-date and working well.
+ Widget types separate configuration (widgetConfig) and data (backing JSON web service) from the implementation of the markup for the widget (widget type).
+ Widget types are more amenable to automated unit testing than are ad-hoc custom widgets.

## How to use

Follow these steps for each of the predefined widget types described in this doc:

1. Follow the "when to use" guidance to select the widget type that will best suit your needs
2. Add the appropriate `widgetType` value to your app's entity file (see widget type's sample code)
3. Add a `widgetConfig` to your app's entity file (see widget type's sample code)

### List of links

![list of links widget](./img/list-of-links.png)

```xml
<name>widgetType</name>
<value>list-of-links</value>
```

#### When to use

* You only need your widget to display a list of 2-7 links

#### Additional entity file configuration

```xml
<portlet-preference>
  <name>widgetType</name>
  <value>list-of-links</value>
</portlet-preference>
<portlet-preference>
  <name>widgetConfig</name>
  <value>
    <![CDATA[{
      "launchText":"Launch talent development",
      "links": [
        {
          "title":"All courses and events",
          "href":"https://www.ohrd.wisc.edu/home/",
          "icon":"fa-at",
          "target":"_blank"
        },
        {
          "title":"My transcript",
          "href":"https://www.ohrd.wisc.edu/ohrdcatalogportal/LearningTranscript/tabid/57/Default.aspx?ctl=login",
          "icon":"fa-envelope-o",
          "target":"_blank"
        }
      ]
    }]]>
  </value>
</portlet-preference>

```

#### Additional information

* `launchText` is optional. Omitting `launchText` suppresses the launch button at the bottom of the list-of-links widget. This is appropriate
when there's nothing more to launch, that is, when the list-of-links widget simply presents all the intended links and that's all there is to it.
* Avoid using a `list-of-links` widget when you only need to display one link. Instead, use the name and `alternativeMaximizedLink` of [the app directory entry](app-directory.md) to represent the link.
This provides a more usable click surface, a simpler and cleaner user experience, and achieves better consistency with other just-a-link widgets in MyUW.
* The length of your list of links will affect the widget's appearance. If you have more than 4 links, they will be displayed in a more traditional-style list, rather than with the `<circle-button>` directive.

### Search with links

![search with links widget](./img/search-with-links.png)

```xml
<name>widgetType</name>
<value>search-with-links</value>
```

#### When to use

* Your app has built-in search
* (optional) and you want to display up to 2 links

#### Additional entity file configuration

```xml
<portlet-preference>
  <name>widgetType</name>
  <value>search-with-links</value>
</portlet-preference>
<portlet-preference>
  <name>widgetConfig</name>
  <value>
    <![CDATA[{
      "actionURL":"https://rprg.wisc.edu/search/",
      "actionTarget":"_blank",
      "actionParameter":"q",
      "launchText":"Go to resource guide",
      "links":[
        {
          "title":"Get started",
          "href":"https://rprg.wisc.edu/phases/initiate/",
          "icon":"fa-map-o",
          "target":"_blank"
        },
        {
          "title":"Resources",
          "href":"https://rprg.wisc.edu/category/resource/",
          "icon":"fa-th-list",
          "target":"_blank"
        }
      ]
    }]]>
  </value>
</portlet-preference>
```

### RSS widget

![rss widget](./img/rss.png)

```xml
<name>widgetType</name>
<value>rss</value>
```

#### When to use

* You want to display an RSS feed right on your MyUW home page

#### Additional entity file configuration

```xml
<portlet-preference>
    <name>widgetType</name>
    <value>rss</value>
</portlet-preference>
<portlet-preference>
    <name>widgetURL</name>
    <value>/rss-to-json/rssTransform/prop/campus-news</value>
</portlet-preference>
<portlet-preference>
    <name>widgetConfig</name>
    <value>
      <![CDATA[{
        "lim": 4,
        "titleLim": 30,
        "showdate": true,
        "showShowing": true
      }]]>
    </value>
</portlet-preference>
```

#### About entity file values

* **lim**: The number of items to show. Any number greater than 6 will default to 6 (due to space limitations). Use a smaller number for feeds that are infrequently updated.
* **titleLim**: Limit the length (in characters, including spaces) of feed titles. This number should be between 30 and 60 (depending on whether you're showing dates or not).
* **showdate**: T/F show each feed item's published date. The date format is "M/d/yy" (localizable) due to space consideration.
* **showShowing**: T/F Show the "Showing \[x] out of \[y]" message (to communicate that there is more to see). Set this to true if your feed has frequent updates.

#### Additional information

Note the addition required value in the entity file:

* **widgetUrl**: The URL of the *JSON representation of the* RSS feed you want to display

The [rssToJson][] microservice is a fine way to convert desired RSS feeds into the required JSON representation.

## Custom widgets
Using a JSON service is a great way to have user-focused content in your widgets. Here are the steps you have to take to create your custom JSON-backed widget:

### 1. widgetURL
This is where we will get the data from (in a JSON format). If your JSON feed lives outside of the portal, you will need to setup
a rest proxy for that. Please contact the MyUW team for details and assistance.

```xml
<portlet-preference>
  <name>widgetURL</name>
  <value>/portal/p/earnings-statement/max/earningStatements.resource.uP</value>
</portlet-preference>
```

When your widget is rendered, this service is called via a `GET`. The returned content is stored in the scope variable `content`.

### 2. widgetType
Setting this to `custom` will enable you to provide your own custom template. Be sure to evaluate the out of the box widget types
before creating your own (documentation on those above).

```xml
<portlet-preference>
    <name>widgetType</name>
    <value>custom</value>
</portlet-preference>
```

### 3. widgetTemplate
This is where the template goes. We suggest using a CDATA tag here.

```xml
<portlet-preference>
  <name>widgetTemplate</name>
  <value>
    <![CDATA[
      <div style='margin : 0 10px 0 10px;'>
        <loading-gif data-object='content' data-empty='isEmpty'></loading-gif>
        <ul class='widget-list'>
          <li ng-repeat=\"item in content.report |orderBy: ['-paid.substring(6)','-paid.substring(0,2)'] | limitTo:3\"
              class='center'>
            <a href='/portal/p/earnings-statement/max/earning_statement.pdf.resource.uP?pP_docId={{item.docId}}' target='_blank'>
              <i class='fa fa-bank fa-fw'></i> {{item.paid}} Statement</a>
          </li>
        </ul>
        <div ng-if='isEmpty' style='padding: 10px; font-size: 14px;'>
          <i class='fa fa-exclamation-triangle fa-3x pull-left' style='color: #b70101;'></i>
          <span style='color: #898989;'>We had a problem finding your statements (or you don't have any).</span>
        </div>
        <div style='background-color: #EAEAEA; border-radius:4px;padding:10px; margin-top:10px;'>
          <span class='bold display-block left' style='text-align: left; padding-left: 10px; font-size: 14px;'>
            See all payroll information for more options:
          </span>
          <ul style='text-align: left;list-style-type: disc; font-size: 12px;'>
            <li>See all pay stubs</li>
            <li>Tax statements</li>
            <li>Update direct deposit</li>
          </ul>
        </div>
      </div>
      <a class='btn btn-default launch-app-button' href='/portal/p/earnings-statement'>See all payroll information</a>
    ]]>
  </value>
</portlet-preference>
```

### 4. widgetConfig

The widget config is a JSON object. Please note it has to be valid JSON. We used the <![CDATA[]]> tag so we didn't have to encode everything.

Currently we only use the evalString to evaluate emptiness. We may add more in the future.

```xml
<portlet-preference>
  <name>widgetConfig</name>
  <value><![CDATA[{ "evalString" : "!$scope.content.report || $scope.content.report.length === 0"}]]></value>
</portlet-preference>
```

By doing just this we were able to generate:

![custom widget](./img/custom-widget.png)

## Other Configuration

### Launch button text
If you provide a `widgetConfig` with any widget type with a value for `launchText`, it will replace the text of the
launch button with the provided value, even for non-widgets.

### Maintenance mode
If your widget/application depends on a service that is currently experiencing an outage or planned maintenance, you can
add the `maintenanceMode` attribute to your `widgetConfig` with a value of "true." Widgets in maintenance mode will display
a message communicating that the app is unavailable and the widget will be disabled (unclickable). To turn maintenance mode off,
simply set the attributes value to "false" or remove it from your `widgetConfig` altogether.

Example:

```xml
<portlet-preference>
  <name>widgetConfig</name>
  <value>
    <![CDATA[{
      'launchText' : 'See all the Weather',
      'maintenanceMode' : true
    }]]>
  </value>
</portlet-preference>
```

Read more about the [launch button text guidance](widget-launch-button.md).


[rssToJson]: https://github.com/UW-Madison-DoIT/rssToJson
