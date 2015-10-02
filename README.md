# Flexys
A Light Grid System base on Flexbox, and compiled by Sass now.
To understand how to use Flexys, hit [Demo](http://jaychsu.github.io/flexys/). (will be completed soon)

## Quickstart

1. Install with [Bower](http://bower.io/):

    ```
    bower install --save flexys
    ```

2. Import these files to your `main.scss`:

    ```
    @import "../bower_components/sass-flex-mixin/_flexbox.scss";
    @import "../bower_components/flexys/src/_flexys.scss";
    ```

## Override
Set variables to override origin one in `src/flexys/_variables.scss`.

## Development
To watch compiled `.css` files, run commands as following:

```
cd test
sass test.scss test.css
```
