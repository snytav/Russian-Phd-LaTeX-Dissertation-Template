/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - http://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function ($, Drupal, window, document) {

  var placeholderSearchText = 'Search';

  $(document).ready(function() {
    $('#block-search-form input#edit-search-block-form--2')
      .val(placeholderSearchText)
      .focus(function() {
        if ($(this).val() == placeholderSearchText) {
          $(this).val('');
          $(this).css('color', 'black');
        }
      })
      .blur(function() {
        if ($(this).val() == '') {
          $(this).val(placeholderSearchText);
          $(this).css('color', 'inherit');
        }
      });
  });

})(jQuery, Drupal, this, this.document);
;
