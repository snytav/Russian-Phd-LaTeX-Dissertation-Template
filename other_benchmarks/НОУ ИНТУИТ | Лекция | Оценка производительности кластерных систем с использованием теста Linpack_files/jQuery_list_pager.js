//Обработка пейджера
$(document).ready(function() {
  //Установка ссылкам пейджера обработчика
  $(".pager-container .pager a")
  .live('click', function(event){
    var request_url = $(this).attr('request_url');
    var block_name = $(this).attr('block_name');
    var block_data = $(this).attr('block_data');
    stratOverlay();
    $.post(request_url,
           block_data,
           function(data)
           {
             $('#'+block_name).html(data.data);
             closeOverlay();
           },
           "json");
    event.preventDefault();
    return false;
  });
})