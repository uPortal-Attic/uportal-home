MyUW widgets are designed to be flexible - users can accomplish or access a single task or piece of information, or they can access a collection of related things that will help them accomplish their task. Widgets can:

* Provide users with real-time, continuous info about their account (e.g. list of pay statements in the Payroll Information widget, Wiscard balance in the Wiscard widget)
* Provide users with a snapshot of information that may impact their decision to take an action (e.g. adding money to my Wiscard)
* Support periodic user action (e.g. viewing pay statements)
* Allow users to quickly access pieces of the app to complete key or regular tasks (e.g. Course Services, My Professional Development, Course Guide)
* Provide users with at-a-glance information that represents the main use for the widget (e.g. Weather)

The main button label used on your MyUW widget should succinctly and consistently (across widgets) reflect the action a user should expect to take place upon clicking. For example, clicking on the main button of a widget could allow the user to take the following actions:

* View a full list of “To-Dos” or a full checklist
* Launch an application within MyUW
* Launch an application outside of MyUW
* Launch a website outside of MyUW

To maintain consistency of labeling, which is key for a good user experience, we strongly suggest you use the following labels for your widget buttons:

* Launch app - For task-based applications
* See all - Best used if your widget features a list of items (a checklist, a list of headlines) and if clicking on the widget button takes users to a complete list, not to a website or app
* Open website - For content-based websites

If one of these labels does not work, widget button labels are customizable. Because the action a user can take upon clicking on the main button on a MyUW widget can vary, it’s important to consider the following guidelines:

* Be clear about what will happen when a user clicks the main button - will it launch an application? Display a full list?
* Keep button labels to around 20 characters; this character limit will ensure the label fits the button even when a user is using MyUW on a mobile device
* Use direct and actionable verbs: “open,” “launch,” “view,” etc.
* Make sure you’re using language the user also uses
* Remember that the button exists in the context of the widget and the task the user is focused on, so redundancy may not be necessary. For example, you don’t need to repeat the application’s name in the button label.

To make sure your buttons are accessible, we encourage you to use the [aria-describedby](https://www.w3.org/TR/WCAG20-TECHS/ARIA1.html) property to provide non-sighted users more explicit information about what action the user is taking. For example, your visual button label, which can be seen by sighted users, may be “Launch app,” but your aria-describedby property could note: “This button will launch the Time and Absence app in MyUW.”
