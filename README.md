# Flexys
A Light Grid System base on Flexbox, and compiled by Sass now.

To understand how to use Flexys, hit [Demo](http://jaychsu.github.io/flexys/). (Demo page will be completed soon)

## Browser Support

|  Browser    | Version |
| ----------- | ------- |
|  IE         |    10+  |
|  Chrome     |     1+  |
|  Firefox    |     2+  |
|  Safari     |   3.1+  |
|  Opera      |  12.1+  |
|  Android    |   2.1+  |
|  iOS        |   3.2+  |
|  BlackBerry |    10+  |

## Quickstart

1. Install from [Bower](http://bower.io/):

    ```
    bower install --save flexys
    ```

2. Develop with...

    a. [Sass](http://sass-lang.com/): Import these files to your `main.scss`

    ```
    @import "../bower_components/sass-flex-mixin/_flexbox.scss";
    @import "../bower_components/flexys/src/_flexys.scss";
    ```

    b. Native CSS: 

    - Run `gulp release` to generate CSS files
    - Find compiled `.css` files in `dist/`

## Override
Set variables to override original one in [`src/flexys/_variables.scss`](https://github.com/jaychsu/flexys/blob/master/src/flexys/_variables.scss).

## Development
There have two tasks to make development more convenient:

1. Release Flexys: compile latest flexys to `.css` files, and saved in `dist/`

    ```
    gulp release
    ```

2. Develop demo page: start a local server and watch all changed files

    ```
    gulp serve
    ```