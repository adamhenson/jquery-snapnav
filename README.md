jquery.snapnav.js
========================================

A jQuery plugin that sets an element fixed to the top of the window when the top of the element meets or is above it. 

The element snaps back in its original position if the original position is met.

Usage
-------------

Two elements are added to the DOM when the element becomes fixed:
  * A placeholder div: ".snap-holder"
  * A container div around the instantiated element: ".snap-fixed"

### Default Usage

$("#my-snappy-element").snapNav();

### Using Options

Classes may be specified to replace in the noted elements above like so:

$("#my-snappy-element").snapNav({ classSnapHolder: "my-new-holder-class", classSnapFixed: "my-new-fixed-class" });

License
-------

Copyright (c) 2013 Adam Henson.
Released under the [MIT](https://github.com/jsor/jcarousel/blob/master/LICENSE-MIT) license.
