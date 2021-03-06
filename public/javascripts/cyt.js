// Autofocus element having attribute data-autofocus
function addAutofocusBehaviour() {
  $('*[data-autofocus=true]').first().focus();
};

// Add datepicker
function addDatePickerBehaviour() {
  $('*[date-picker=true]').each(function(){
    $(this).datepicker({ dateFormat: 'dd.mm.yy' });
  });
};

//
function addSortableBehaviour() {
  $(".sortable").sortable({
    placeholder: 'ui-state-highlight'
  });
  $(".sortable").disableSelection();
};
                    

// Linkify containers having attribute data-href-container
function addLinkifyContainersBehaviour() {
  var elements = $('*[data-href-container]');
  elements.each(function() {
    var element = $(this);
    var container = element.closest(element.data('href-container'));
    container.css('cursor', "pointer");
    var href = element.attr('href');
    element.addClass('linkified_container')
    
    container.delegate('*', 'click', {href: href}, function(event) {
      // Don't override original link behaviour
      if ($(event.target).parents('a').length == 0) {
        document.location.href = href;
      };
    });
  });
};

// Autogrow
function addAutogrowBehaviour() {
  $(".autogrow").elastic();
}

// Add tooltips for overview
function addTooltipBehaviour() {
  $(".tooltip-title[title]").each(function() {
    if ( $(this).attr('title') != '' ) {
      $(this).tooltip({
        position: 'top center',
        predelay: 500,
        effect: 'fade'
      });
    }
  });
};

// Add tooltips for overview
function addOverviewTooltipBehaviour() {
  $('.overview-list li a[title]').tooltip({
    position: 'center right',
    predelay: 500,
    effect: 'fade'
  });
};

// Add icon action tooltips
function addIconTooltipBehaviour() {
  $('a.icon-tooltip[title]').tooltip({
    tipClass: 'icon-tooltip-popup',
    effect: 'fade',
    fadeOutSpeed: 100
  });
};
// Javascript Highlighter
// Fixed version of comment in
// http://stackoverflow.com/questions/1650389/prototype-js-highlight-words-dom-traversing-correctly-and-efficiently
// TODO: Check with Simon Hürlimann if this function is still in use and rewrite it for jQuery.
//Element.addMethods({
//  highlight: function(element, term, className) {
//    function innerHighlight(element, term, className) {
//      className = className || 'highlight';
//      term = (term || '').toUpperCase();
//
//      var skip = 0;
//      if ($(element).nodeType == 3) {
//        var pos = element.data.toUpperCase().indexOf(term);
//        if (pos >= 0) {
//          var middlebit = element.splitText(pos),
//              endbit = middlebit.splitText(term.length),
//              middleclone = middlebit.cloneNode(true),
//              spannode = document.createElement('span');
//
//          spannode.className = className;
//          spannode.appendChild(middleclone);
//          middlebit.parentNode.replaceChild(spannode, middlebit);
//          skip = 1;
//        }
//      }
//      else if (element.nodeType == 1 && element.childNodes && !/(script|style)/i.test(element.tagName)) {
//        for (var i = 0; i < element.childNodes.length; ++i)
//          i += innerHighlight(element.childNodes[i], term, className);
//      }
//      return skip;
//    }
//    innerHighlight(element, term, className);
//    return element;
//  },
//  removeHighlight: function(element, term, className) {
//    className = className || 'highlight';
//    $(element).select("span."+className).each(function(e) {
//      e.parentNode.replaceChild(e.firstChild, e);
//    });
//    return element;
//  }
//});

// Loads functions after DOM is ready
$(document).ready(function() {
  addAutofocusBehaviour();
  addDatePickerBehaviour();
  addSortableBehaviour();
  addLinkifyContainersBehaviour();
  addTooltipBehaviour();
  addOverviewTooltipBehaviour();
  addIconTooltipBehaviour();
});
