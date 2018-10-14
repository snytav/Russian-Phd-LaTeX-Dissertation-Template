function inintializeShareThoughtsForm()
{
  $('#share-thoughts-form textarea')
  .intElastic({
    url: Drupal.settings["basePath"] + 'intuit_social_event_line/json/share_thoughts_save',
    init_height: 40,
    success: function(data, textStatus, jqXHR){
      if(data.status) {
      }
    }
  })
  .hint();
   $("#share-thoughts-dialog").css("overflow", "visible").parent().css("overflow", "visible");
}
function closeShareFormWindow()
{
  var $p = $('<p />', { className: 'block-messag', text: 'Комментарий опубликован на Вашей странице' });
  $('div#share-thoughts-dialog.ui-dialog-content').empty();
  $('div#share-thoughts-dialog.ui-dialog-content').append($p);
  $('div#.ui-dialog-buttonpane.ui-widget-content').empty();
  $('div#share-thoughts-dialog.ui-dialog-content').oneTime("2s", function() {
                                                                               $(this).dialog('close');
                                                                            });
}