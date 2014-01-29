/*
---

name: uFilterList
description: A simple grid list plugin for easy filter and sorting.
license: MIT-Style License <http://www.joseluisquintana.pe/license.txt>
copyright: Jose Luis Quintana <http://www.joseluisquintana.pe/>
authors: Jose Luis Quintana <joseluisquintana20@gmail.com>
requires: 
  - Core: 1.4/*
provides: uFilterList
 
...
*/
var uFilterList = new Class({
    version: '1.0',
    Implements: [Events, Options],
    currentFilter: 'all',
    options: {
        margin: 0
    },
    initialize: function(sortlist, options) {
        this.sortlist = sortlist;
        this.setOptions(options);
        this._build();
    },
    _build: function() {
        window.addEvent('resize', this.sort.bind(this));
        this.sort();
    }.protect(),
    sort: function() {
        var sortlist = this.sortlist,
                w, h, sw, tw, th, rtw, cth, ctw, items,
                mr = this.options.margin;

        w = w = sw = tw = th = ctw = cth = rtw = 0;
        sw = sortlist.getParent().getSize().x;

        items = sortlist.getElements('li:not(.hidden)');
        this.size = items.length;

        items.each(function(li, i) {
            w = li.getSize().x;
            h = li.getSize().y;

            if (tw >= (sw - h - mr)) {
                tw = 0;
                th += h + mr;

                if (!ctw) {
                    ctw = i * w + ((i * mr) - mr);
                }
            } else {
                tw += i ? mr : 0;
            }

            tw += w;
            rtw = tw - w;
            cth = th + h;

            li.store('data-cords', rtw + ',' + th);
            this._effect(li, rtw + ',' + th, false);
        }.bind(this));

        sortlist.setStyles({
            'width': ctw ? ctw : this.size * w,
            'height': cth
        });
    },
    filterBy: function(filter) {
        if (this.currentFilter !== filter) {
            var xy, list = this.sortlist.getElements('li'),
                    matches = list.filter(function(li, i) {
                        return li.get('data-filter').test(filter, 'i');
                    }).length;

            if (!matches && filter !== 'all') {
                return;
            }

            this.currentFilter = filter;
            this.filtered = this.unfiltered = [];

            list.each(function(li) {
                xy = li.retrieve('data-cords');

                if (filter === 'all') {
                    this.filtered.push(li);
                    this._effect(li, xy, false);
                } else {
                    var b = li.get('data-filter').test(filter, 'i');

                    if (b) {
                        this.filtered.push(li);
                    } else {
                        this.unfiltered.push(li);
                    }

                    this._effect(li, xy, !b);
                }
            }.bind(this));

            this.sort();
        }
    },
    _effect: function(li, xy, h) {
        if (h) {
            li.addClass('hidden');
        } else {
            li.removeClass('hidden');
        }
        li.setStyles({
            'opacity': h ? 0 : 1,
            '-webkit-transform': 'matrix(1,0,0,1,' + xy + ') scale(' + (h ? '0.001' : '1') + ')',
            '-moz-transform': 'matrix(1,0,0,1,' + xy + ') scale(' + (h ? '0.001' : '1') + ')',
            'transform': 'matrix(1,0,0,1,' + xy + ') scale(' + (h ? '0.001' : '1') + ')'
        });
    }.protect(),
    getFilter: function() {
        return this.currentFilter;
    },
    getSize: function() {
        return this.size;
    },
    getItemsMatched: function() {
        return this.filtered;
    },
    getItemsUnmatched: function() {
        return this.unfiltered;
    }
});