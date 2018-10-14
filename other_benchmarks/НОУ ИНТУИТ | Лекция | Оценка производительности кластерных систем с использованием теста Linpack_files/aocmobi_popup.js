// Показываем окно
function aocmobi_loadPopup(event){
  var loadcss = true;
  //проверка, загружен ли css
  $('HEAD').children('LINK').each(function(){
    if (String(this.href).indexOf('int_aocmobi.css') > -1) {
      loadcss = false;
      return;
    }
  });
  //грузим css, если надо
  if (loadcss) {
    $("head").append("<link>");
    css = $("head").children(":last");
    css.attr({
      rel: 'stylesheet',
      type: 'text/css',
      href: Drupal.settings['basePath'] + 'sites/all/modules/int_aocmobi/int_aocmobi.css'
    });
  }
  //загружаем попап
  $.get(Drupal.settings['basePath'] + 'int_aocmobi/aocmobi', function(data){
    $('div.aocmobi').append(data);
    // размещаем окно
    var popup = $("#always-on-mobi");
    popup.css({
      'display': 'none',
      'z-index': 3
    });
    popup.slideDown("fast"); // показали окно
    fix_AOCMOBI_VISIBILITY(popup);
  });
}

function fix_AOCMOBI_VISIBILITY(popup)
{
  var docViewTop = $(window).scrollTop();
  var docViewLeft = $(window).scrollLeft();
  var docViewBottom = docViewTop + $(window).height();
  var docViewRight = docViewLeft + $(window).width();

  var popupTop = $(popup).offset().top;
  var popupLeft = $(popup).offset().left;
  var popupBottom = popupTop + $(popup).height();
  var popupRight = popupLeft + $(popup).width();

  if(popupBottom > docViewBottom)
    $(popup).css('top',-(popupBottom-docViewBottom));

  if(popupRight > docViewRight)
    $(popup).css('left',-(popupRight-docViewRight));
}

// Скрываем окно
function aocmobi_disablePopup(){
  // Закрываем окно только если оно открыто
  if($('#always-on-mobi').length > 0){
    $("#always-on-mobi").slideUp("fast", function(){
      $("#always-on-mobi").remove()
      }); // спрятали окно
  }
}

function aocmobi_check_disablePopup(event){
  /*var el = $("#always-on-communication");
  var offset = el.offset()
  if (event.pageX >= offset.left && event.pageX <= offset.left + el.width()
    && event.pageY >= offset.top && event.pageY <= offset.top + el.height()) {
    return;
  }*/
  aocmobi_disablePopup();
}

// Обработчики событий
$(document).ready(function(){
  //Блокирование клика на линке aoc
  $('.main-menu-aocmobi').click(function(){
    return false;
  });
  //Открытие/закрытие окна
  $('div.aocmobi').mouseenter(
    function(event){
      if($('#always-on-mobi').length == 0){ // Открываем окно только если оно закрыто
        aocmobi_loadPopup(event);
      }
    });
  $('div.aocmobi').mouseleave(
    function(event){
      if($('#always-on-mobi').length > 0) {
        aocmobi_check_disablePopup(event);
      }
    });

  // ЗАКРЫТИЕ ОКНА
  $(document).click(function(event){
    aocmobi_check_disablePopup(event);
  });

  // Событие - нажата клавиша Escape
  $(document).keypress(function(e){
    if(e.keyCode == 27 && $('#always-on-mobi').length > 0) {
      aocmobi_disablePopup();
    }
  });
});