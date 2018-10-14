$(document).ready(function() {
  //возврат к пред. странице (например, для отмены редактирования)
  $('.int-cancel-button').live('click', function() {
    history.go(-1);
    return false;
  });

  //удаление чего-либо с диалогом запроса подтверждения
  $(".int-delete-button").live('click', function() {
    //intuit_common_interface
    MessageBoxDel(this);
    return false;
  });
});
