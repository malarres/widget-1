# User Feedback Widget

This package contains the user feedback widget designed for use with the [Unified Listing](ul.gpii.net) and other
systems.

# Viewing this Widget Integrated with the Unified Listing

To test this widget with a demo instance of the Unified Listing, run the following command:

```
node tests/js/launch-test-harness.js
```

That will launch a test server that includes sample data.  To see the widget in action, you will need to view a product
record.  There are two ways to do this:

1. Browse directly to a known good record, like: [http://localhost:6941/api/product/unified/1421059432806-826608318](http://localhost:6941/api/product/unified/1421059432806-826608318)
2. Search for a record using the UL search interface: [http://localhost:6941/api/search/](http://localhost:6941/api/search/) (NOT WORKING AT THE MOMENT)


# Adding the Widget to a Static Page

If you want to integrate this anywhere else, you will need `jQuery`, the CSS for the widget, and the Javascript for the
widget, as in:

```
<link href="src/css/widget.css" rel="stylesheet">
<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
<script src="js/widget.js"></script>
```
See below for details on each file

## `src/css/widget.css`

Here are all styles of widget (colors , shapes, sizes , etc ).


## `src/js/widget.js`

This part is all the logic for creaccion the widget and behavior.
Very important: The first few lines of the file are those that have to redefine :

```
var user = "insert user id " ;
var page = "inset page id " ;
var urlserverGlobal = "insert urlserver";
```