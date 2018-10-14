//контекстное меню с аватаром пользователя для ссылок на пользователя
function int_user_link_icm() {
  //попапа с аватаром при наведении на линк пользователя
  //базовые опции контекстного меню
  var int_user_link_icm_options = {
    wrapper_class: 'int-user-link-wrapper',
    request_url: Drupal.settings['basePath'] + 'int_user_get_avatar',
    request_data: null,
    //close_event: 'click',
    show_under_mouse: true,
    request_if_empty: true,
    close_all: false,
    after_open: function(element_id, wrapper_id, content_id) {
        $('#' + content_id + ' .int-avatar').removeClass('int-avatar');
      }
  };
  $('.name-with-avatar').each(function(index, Element){
    var $this = $(this);
    //ожидаем id линка с микротаймом формата int-user-link-1302508499.6493-1
    int_user_link_icm_options.request_data = 'uid=' + $this.attr('id').substring(30);
    if($this.attr('preset'))
      int_user_link_icm_options.request_data+= '&preset='+$this.attr('preset');
    $this.intContextMenu(int_user_link_icm_options);
  });
}
//пересборка страницы при включенном выводе devel
function rebuild_devel_output()
{
  if($(".devel-querylog").length || $(".dev-query").length || $(".dev-memory-usage").length)
  {
    var devel_output_control = $('<div>', {"id": 'devel-output-control'});
    var devel_output_button = $('<span>', {"id": 'devel-output-button'});
    var devel_output_button_2 = $('<span>', {"id": 'devel-output-button-2'});
    var devel_output_wrapper = $('<div>', {"id": 'devel-output-wrapper'});
    var devel_output_wrapper_wrapper = $('<div>', {"id": 'devel-output-wrapper-wrapper'});
    devel_output_button.html('Devel query LOG (open)');
    devel_output_control.append(devel_output_button);
    devel_output_wrapper_wrapper.append(devel_output_button_2);
    devel_output_wrapper_wrapper.append(devel_output_wrapper);
    devel_output_control.append(devel_output_wrapper_wrapper);
    $('#development-menu').prepend(devel_output_control);
    devel_output_wrapper.append($(".dev-query"));
    devel_output_wrapper.append($(".devel-querylog"));
    devel_output_wrapper.append($(".dev-memory-usage"));
    devel_output_wrapper.append($(".dev-timer"));
    devel_output_button.bind('click', open_hide_SQLwindow);
    devel_output_button_2.bind('click', open_hide_SQLwindow);
  }
}
function open_hide_SQLwindow(event)
{
  var $this = $('#devel-output-button');
  if($this.hasClass('opened'))
  {
    $this.removeClass('opened');
    $this.html('Devel query LOG (open)');
    $('#devel-output-wrapper-wrapper').hide();
  }
  else
  {
    $this.addClass('opened');
    $this.html('Devel query LOG (close)');
    $('#devel-output-wrapper-wrapper').show();
    sizes = getPageSize();
    $('#devel-output-wrapper').css('width', sizes[2]-100);
    $('#devel-output-wrapper').css('height', sizes[3]-100);     
    forceCenterScreen($('#devel-output-wrapper'))
    $('#devel-output-wrapper').height($('#devel-output-wrapper-wrapper').height()-20);
  }  
  event.preventDefault();
  return false;
}

$(document).ready(function() {
  int_user_link_icm();
  rebuild_devel_output();
});