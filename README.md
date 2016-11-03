# Gulp Workflow with SASS and JADE
This workflow gathers some cool tasks like compiling [JADE](http://jade-lang.com/ "JADE official website") files into HTML files, compiling [SASS](http://sass-lang.com/ "SASS official website") files into CSS files, minifying images and browser reloading.

## 1\. Getting Started

First you need to install [Node.js](https://nodejs.org/en/ "officiel Nodejs website") on your computer. Then open a terminal (Your favorite terminal will be perfect), and now go to the directory base with the following command:

`cd path/to/the/directory/gulp-workflow`


## 2\. Installation

Here, you can install [NPM](https://www.npmjs.com/ "npmjs official website")(Node Package Manager) dependancies.

Run this command:

`npm install`

It installs all dependancies found in the `package.json`.


## 3\. Run it

You need to install gulp globally with this command:

`npm install gulp -g`

Then just run the following command line:

`gulp`

It executes the default task and launch the server.
I think it's better to show you this workflow in action. So the `index.html` is a kind of documentation and it can help you with some option.

## Changelog
* **V1.02** 2016-11-03:
    * Now Browser reload the page when images and fonts are added to the project.
    * Add a .gitignore for node_modules
* **V1.01** 2016-06-22:
    * SASS `@import` with [the official SASS specification](http://sass-lang.com/guide "SASS Guide") for filenames. SASS files are now preceded by an underscore like `_colors.scss`.
    * Fix the directory structure in jade too.
* **V1.0** 2016-06-16: Initial release
