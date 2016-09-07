Expanded mode (also referred to as widget mode) is a new method of displaying important content to users about your application. It is the most important information, and can be user specific.
<div class='center'>
![http://goo.gl/3FYU6u](http://goo.gl/3FYU6u)
</div>

## uw-frame styles
The styles used for widgets is in uw-frame. You can read about those styles in the [uw-frame documentation about widgets](http://uw-madison-doit.github.io/uw-frame/latest/#/md/widgets)

## Different Types of Widgets
We noticed a pattern with a handful of widgets when we first created them so we made a couple types.

### List of Links
To use the list of links template, give the app's entity file a widgetType of 'list-of-links' and provide an object to the widgetConfig with the information for the links. You can provide 1-7 links and the template will display accordingly using the circle-button directive.

Samples:

![http://goo.gl/v15RLL](http://goo.gl/v15RLL)

![http://goo.gl/2q68Sk](http://goo.gl/2q68Sk)

Sample code for entity file:

```html
<portlet-preference>
      <name>widgetType</name>
      <value>list-of-links</value>
  </portlet-preference>
  <portlet-preference>
    <name>widgetConfig</name>
    <value><![CDATA[{
      "launchText":"Launch talent development",
      "links": [{
          "title":"All courses and events",
          "href":"https://www.ohrd.wisc.edu/home/",
          icon":"fa-at",
          "target":"_blank"
        },
        {
          "title":"My transcript",
          "href":"https://www.ohrd.wisc.edu/ohrdcatalogportal/LearningTranscript/tabid/57/Default.aspx?ctl=login",
          "icon":"fa-envelope-o",
          "target":"_blank"}]
      }]]></value>
  </portlet-preference>

```

For the `list-of-links` widget type specifically, `launchText` is optional; omitting `launchText` suppresses the launch button at the bottom of the list-of-links widget. This is appropriate when there's nothing more to launch, that is, when the list-of-links widget simply presents all the intended links and that's all there is to it.

One-link list-of-links widgets are often better modeled as no widget at all, simply using the name and `alternativeMaximizedLink` of [the app directory entry](#/md/app-directory) to represent the link. This provides a more usable click surface, a simpler and cleaner user experience, and achieves better consistency with other just-a-link widgets in MyUW.

### Search with Links
Display a search bar and two links.

Here is a sample widget with this:

![http://goo.gl/8CJV5o](http://goo.gl/8CJV5o)

Here is the sample code:

```html
<portlet-preference>
      <name>widgetType</name>
      <value>search-with-links</value>
    </portlet-preference>
    <portlet-preference>
      <name>widgetConfig</name>
      <value><![CDATA[{
               "actionURL":"https://rprg.wisc.edu/search/",
               "actionTarget":"_blank",
               "actionParameter":"q",
               "launchText":"Go to resource guide",
               "links":[{
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
              }]
        }]]></value>
    </portlet-preference>
```

### RSS Widgets
The RSS Widget type is used to pull in RSS feeds right into your MyUW home page. This uses a 3rd party tool to get the XML, converts it to JSON, then we process it to display the top headlines from the feed.

Here is a sample of the entity file for rss:
```html
<portlet-preference>
    <name>widgetType</name>
    <value>rss</value>
</portlet-preference>
<portlet-preference>
    <name>widgetURL</name>
    <value>http://www.ncaa.com/news/ncaa/d1/rss.xml</value>
</portlet-preference>
<portlet-preference>
    <name>widgetConfig</name>
    <value><![CDATA[{"lim":4,"showdate":true,"dateFormat":"MM-dd-yyyy","showShowing":true}]]></value>
</portlet-preference>
```

### Custom Widgets
Widgets with a JSON service is a great way to have user focused content in your widgets. Here is the steps you have to take to create your custom JSON backed widget.

#### widgetURL

This is where we will get the data from (in a JSON format). If your JSON feed lives outside of the portal, you will need to setup a rest proxy for that. Please contact the MyUW team for details on that.

```html
<portlet-preference>
  <name>widgetURL</name>
  <value>/portal/p/earnings-statement/max/earningStatements.resource.uP</value>
</portlet-preference>
```

When your widget is rendered, this service is called via a GET, the returned content is stored in the scope variable `content`.

#### widgetType

Setting this to `generic` will enable you to provide your own template. Be sure to evaluate the out of the box widget types before creating your own (documentation on those above).

```html
<portlet-preference>
    <name>widgetType</name>
    <value>generic</value>
</portlet-preference>
```

#### widgetTemplate
This is where the template goes. Suggest using a CDATA tag in here.
```html
<portlet-preference>
        <name>widgetTemplate</name>
        <value><![CDATA[
            <div style='margin : 0 10px 0 10px;'>
               <loading-gif data-object='content' data-empty='isEmpty'></loading-gif>
               <ul class='widget-list'><li ng-repeat=\"item in content.report |orderBy: ['-paid.substring(6)','-paid.substring(0,2)','-paid.substring(3,5)'] | limitTo:3\" class='center'><a href='/portal/p/earnings-statement/max/earning_statement.pdf.resource.uP?pP_docId={{item.docId}}' target='_blank'><i class='fa fa-bank fa-fw'></i> {{item.paid}} Statement</a></li></ul>
               <div ng-if='isEmpty' style='padding: 10px; font-size: 14px;'><i class='fa fa-exclamation-triangle fa-3x pull-left' style='color: #b70101;'></i><span style='color: #898989;'>We had a problem finding your statements (or you don't have any).</span></div>
               <div style='background-color: #EAEAEA; border-radius:4px;padding:10px; margin-top:10px;'>
                  <span class='bold display-block left' style='text-align: left; padding-left: 10px; font-size: 14px;'>See all payroll information for more options:</span>
                  <ul style='text-align: left;list-style-type: disc; font-size: 12px;'>
                     <li>See all paystubs</li>
                     <li>Tax statements</li>
                     <li>Update direct deposit</li>
                  </ul>
               </div>
            </div>
            <a class='btn btn-default launch-app-button' href='/portal/p/earnings-statement'>See all payroll information</a>
        ]]></value>
    </portlet-preference>
```

#### widgetConfig

The widget config is a JSON object. Please note it has to be valid JSON. I used the <![CDATA[]]> tag so we didn't have to encode everything. Helpful.

Currently we only use the evalString to evaluate emptiness. We may add more in the future.

```html
<portlet-preference>
    <name>widgetConfig</name>
    <value><![CDATA[{ "evalString" : "!$scope.content.report || $scope.content.report.length === 0"}]]></value>
</portlet-preference>
```

By doing just this we were able to generate:

![https://cloud.githubusercontent.com/assets/3534544/6626304/a82c9e2e-c8c3-11e4-9bf0-acdc0fbdd2f5.png](https://cloud.githubusercontent.com/assets/3534544/6626304/a82c9e2e-c8c3-11e4-9bf0-acdc0fbdd2f5.png)

## Other Configuration

If you provide a `widgetConfig` with any widget type with a value for `'launchText'` it will replace the text of the launch button with that text value. Even for non-widgets.

Example:

```html
<portlet-preference>
    <name>widgetConfig</name>
    <value><![CDATA[{
      'launchText' : 'See all the Weather'
    }]]></value>
</portlet-preference>
```

Read more about the launch button text guidance [here](#/md/widget-launch-button).

## Build Your Own Widget Right Now with Widget Creator

We have developed a widget creator so people can get hands on with developing their content. If you have questions about the widget creator please feel free to open a github issue. You can see a live version of the widget creator [here](https://public.test.my.wisc.edu/web/widget-creator)
