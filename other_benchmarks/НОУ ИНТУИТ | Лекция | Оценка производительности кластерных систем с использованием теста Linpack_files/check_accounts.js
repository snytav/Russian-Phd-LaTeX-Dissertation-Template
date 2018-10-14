(function ($) {
/**
 * Checks to see if the person accounts should be automatically checked.
 */
Drupal.behaviors.personAccountCheck = function(context) {
  if (Drupal.settings.person_account.runNext || false) {
    $('body:not(.person-account-check-processed)', context).addClass('person-account-check-processed').each(function() {
      if (Math.round(new Date().getTime() / 1000.0) >= Drupal.settings.person_account.runNext) {
        $.get(Drupal.settings.person_account.basePath + '/check_accounts');
      }
    });
  }
};

})(jQuery);
