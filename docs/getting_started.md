Some hints on getting started working with this codebase.

The target audience of this document is a student employee or intern working directly with the MyUW core team.  It will be largely useful and relevant to anyone looking at this codebase regardless of where you sit, but there are some local-isms and Badger-isms in here.

# Have a GitHub account

Be sure you can log in at [GitHub.com][].

_Why? : We use GitHub as the git-repo-in-the-cloud with some nice social coding features for this project. You too will need to use GitHub to be most productive. Don't worry, the free as in cheapness zero-dollars GitHub account is just fine for purposes of this project._

# Fork the GitHub repo

View the [UW-Madison-DoIT/angularjs-portal repo][angularjs-portal repo] in your Web browser of choice.

Fork the repo using the handy Fork button at the upper right of the page.  If you are prompted to select the context into which to fork the repo, choose your own username context.

_Why? : The collaboration model for this codebase involves a publicly viewable canonical Git repository that the core team curates. Project participants make their own forks of this repo that they can edit where they draft changes in feature branches and, when those look good, propose that those branches' changes be pulled into the canonical repo's canonical branches. You'll need your own fork of the repo so you too have a place to draft changes. Don't worry; forking public repos is free-as-in-cheapness on GitHub._

# Have a Git client on your computer

Have a Git client you like. [GitHub's native client][GitHub native client]. [Command line client][Git command line client] if you like. [SourceTree][]. Something built-in to your IDE if you must. Any Git client.

_Why? : You will need a Git client to clone the code to your computer and to craft commits and push changes back up to your fork of the repo on GitHub._

# Clone your fork

Clone your fork of the angularjs-portal repo down to your laptop, using the Git client.

How you do that depends on your Git client.  On the command line, it's 

XXX
`git clone `

# Have a text editor

Have a text editor you like.  [Sublime][] , atom.io , Emacs, vi, etc. are all good choices, if they are good choices for you.

It's a text editor.  Any one you like.  Avoid Notepad and MS Word.

# Look at your cloned folder in your text editor

Open the folder you cloned down to your laptop in the text editor.


# Celebrate!

No seriously, this much is progress.  You can now inspect the codebase in the text editor, and you can make branches and compose commits and push those branches to your fork of the repo in GitHub.  This is serious progress.

Even with just this much, you could post Pull Requests and the team could review them and merge them.

# Take a look around

Take some time to look through the code in the text editor, familiarize yourself with what's where.  It might be useful to do this at the same time as looking at MyUW in a web browser so you can compare what you see in the running application with what you see in the source code.

# Learn the basics of AngularJS

You could spend your whole summer learning Angular, and I do hope you learn lots of Angular this summer, but even just getting the basic concepts is going to make it easier to read the codebase.

https://angularjs.org/

http://campus.codeschool.com/courses/shaping-up-with-angular-js/intro

(If you happen to be a book person, I've got a couple AngularJS books you're welcome to borrow.  If you're not a book person, you're in good company -- there's lots of content on the Web etc.)

# Fix a few issues?

So, the workflow goes like this:

a. make a feature branch specific to the changes you're intending to make (and check out that branch)
b. compose commits in that feature branch making the changes
c. push the feature branch to your fork of the angularjs-portal github repo
d. go to https://github.com/UW-Madison-DoIT/angularjs-portal and click through the workflow to turn your feature branch into a Pull Request.
e. (optional but encouraged) : tell the team that you've created a Pull Request, so that the team can prioritize looking at it and giving you feedback and working with you to merge it.
f. after the branch is merged, Jenkins will automatically build a new version of the product and deploy it to my-predev.doit.wisc.edu, where you'll then be able to test / verify your change.
g. check out your master branch
h. update that master branch with the latest master branch from the https://github.com/UW-Madison-DoIT/angularjs-portal repo.  (This will probably require some set up the first time you do it.)
i. tada!  You're now ready to start this workflow again at a.


Note that you can work through this workflow without a local build and deployment of the product, and I do think that's appropriate, in that there's already a lot to learn and work through to get this far.

As I mentioned, we do have a Scrum process for identifying and tracking what issues to work on, but I think especially between now and Tuesday while you're learning this, it's just fine for you to pick out any accessibility bug you'd like to take a shot at fixing.  No worries.


And then yes, there's more.

To build and render the product right on your laptop, you'll need:

Maven
Tomcat7

and to step through some setup steps that are largely articulated in that README.md .

How about getting at least through step 7 above, optionally 8, and then we can pick up from there in tackling getting the product building and deploying and running right on your laptop, and then you'll be able to test your changes even before issuing the Pull Requests. Definitely worth getting there; I don't think we have to get there right away, totally depends on how comfortable you get with this how quickly, no worries.

Kind regards,

Andrew

[GitHub.com]
[angularjs-portal repo]
[GitHub native client]
[Git command line client]
[SourceTree]
[Sublime]
