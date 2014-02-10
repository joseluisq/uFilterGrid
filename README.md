uFilterList
===========

A simple grid list plugin for easy filter and sorting.


How to use
----------
It's very easy, defines only your list using an `ul` and `li` tags then <br/>
sets your filters in each `li` tags with the `data-filter` attribute, it can add many filters for one item.

JS :

    var mg = new uFilterList($('sortlist'), {
      // you can set the margin in pixels
      margin: 5
    });
    
    // Filter example
    mg.filterBy('programing');


HMTL :

    <ul id="sortlist">
      <li data-filter="programing"></li>
      <li data-filter="programing back-end"></li>
      <li data-filter="graphic-design illustration"></li>
      <li data-filter="webdesign front-end"></li>
      <li data-filter="graphic-design printing"></li>
    </ul>


Live Demo
-----------

[Live demo](http://goo.gl/5cY8M1)


Screenshots
-----------
![Screenshot](http://joseluisquintana.pe/sourcecode/mootools/screenshots/ufiltergrid.jpg)


Reference
-----------
Options :

  * margin = the margin for item defined in pixels

Public Methods :
    
  * uFilterList.filterBy(string) = string it's text to filter, it should match to `data-filter` attribute on `li` tags. matching.
    
Events :

  * Coming soon..
