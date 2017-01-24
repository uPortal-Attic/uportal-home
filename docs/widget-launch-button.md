### Launch button purpose
The launch button label used on your MyUW widget should concisely reflect the action a user should expect to take place upon clicking. 
For example, clicking on the main button of a widget could allow the user to take the following actions:

* View a full list of “To-Dos” or a full checklist
* Launch an application within MyUW
* Launch an application outside of MyUW
* Launch a website outside of MyUW

### The launch-button directive
All uw-frame apps have access to the `<launch-button>` directive, which you can use by copying the following code into your widget's template:

```html
<launch-button 
	data-href="" 
	data-target="" 
	data-button-text=""
	data-aria-label="">
</launch-button>
```

This directive includes the classes, styles, and configurable attributes necessary to create a launch button and looks and feels like it's part 
of the widget. You can read more about the configurable attributes of this directive in [uw-frame's directive documentation](http://uw-madison-doit.github.io/uw-frame/latest/#/md/directives)

### Suggested button text
To maintain consistency of labeling, which is key for a good user experience, **we strongly suggest you choose from following labels** for 
your launch button's `data-button-text` attribute:

* **See all**: Best used if your widget features a list of items (a checklist, a list of headlines, an RSS feed) and if clicking on the widget button takes users to a complete list
* **Open website**: For content-based websites and any widgets that link to a static site with an external URL
* **Launch app**: Best for task-based applications -- can also be used for any applications that open within MyUW and do not meet the criteria of other labels

### Launch buttons and accessibility
To ensure your launch buttons are accessible to vision-impaired users and other screen reader users, use the `data-aria-label` 
to provide additional context that is not communicated by the button's text alone. Aria-labels should be kept short and should include 
only the bare minimum text to communicate what the button does. For example:

If your app's title is "Time and Absence" and your launch-button text is "Launch app," the best aria-label in this case would be "Launch Time and Absence app."

[Read more about how to use aria-labels effectively](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute)

### Custom button text
If one of the suggested labels does not suit your needs, consider the following guidelines when coming up with custom button text:

* Choose a clear action verb to describe what will happen when a user clicks the button -- "launch," "open," "go to," "view," and "explore" are all viable examples
* Choose a noun to following the action verb that accurately describes the thing the user is about to experience (e.g. "website," "app," "list," "feed," "wiki," etc.)   
* Limit the length of your button text to 25 characters (including spaces). This will ensure that all the text is visible on all screen sizes. Text that is too long will be truncated.
* Use the language your intended audience expects to see
* Remember that the button exists in the context of the widget it belongs to. It is not necessary to include the application's title in the button text (save it for the aria-label).
