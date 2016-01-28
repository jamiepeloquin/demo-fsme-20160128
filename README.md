RosettaHtmlEmail
================

This project will generate HTML for email campaigns, with inline CSS.


CSS
---
The CSS is written, initially, using [SASS](http://sass-lang.com) (specifically SCSS). These files are located in the `/src/scss` directory,
and are compiled into a single `/src/email.css` file, which is linked to from the HTML files. The stylesheets are broken
down into components, called *partials*: **\_colors.scss**, **\_fonts.scss** and the parent **email.scss**. The latter
includes the others.

Any Media Queries should be added in the `<style>` block in the `<head>` of your HTML. These styles will not be removed during processing,
and will allow you to make style changes for a more responsive design.

Setup & Usage
-------------
1. Install **[npm](https://nodejs.org/en/download/)**
1. In the command line, install the Javascript dependencies for this project:
    `cd /path/to/this/project`
    `npm install`
1. If you are using VisualStudio, you can install the [Task Runner Explorer](https://visualstudiogallery.msdn.microsoft.com/8e1b4368-4afb-467a-bc13-9650572db708) extension.

After you create your HTML files, in the `/src` directory, and link to the compiled `/src/email.css` in the `<head>` of
your HTML like:

    <link href="scss/email.css" rel="stylesheet">

You can then compile the finished HTML for the emails:

1. From the command line:
    `cd /path/to/this/project`
    `gulp`
1. From VisualStudio, you can enact the [Task Runner](https://visualstudiogallery.msdn.microsoft.com/8e1b4368-4afb-467a-bc13-9650572db708),
or run the commands above from the CommandPrompt.
1. The compiled HTML and Email Subject template files will be output to the `/output` directory, in the project folder. We output a `.html` file for previewing/testing.
        Example:
        /output/Welcome-Users.email.body.en.html
        /output/Welcome-Users.email.body.en.txt
        /output/Welcome-Users.email.title.en.txt


