// Показываем окно
function aoc_loadPopup(event){
  var loadcss = true;
  //проверка, загружен ли css
  $('HEAD').children('LINK').each(function(){
    if (String(this.href).indexOf('int_aoc.css') > -1) {
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
      href: Drupal.settings['basePath'] + 'sites/all/modules/int_aoc/int_aoc.css'
    });
  }
  //загружаем попап
  $.get(Drupal.settings['basePath'] + 'int_aoc/aoc', function(data){
    $('div.aoc').append(data);
    // размещаем окно
    var popup = $("#always-on-communication");
    popup.css({
      'display': 'none',
      'z-index': 3
    });
    popup.slideDown("fast"); // показали окно
    fix_AOC_VISIBILITY(popup);
  });
}

function fix_AOC_VISIBILITY(popup)
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
function aoc_disablePopup(){
  // Закрываем окно только если оно открыто
  if($('#always-on-communication').length > 0){
    $("#always-on-communication").slideUp("fast", function(){
      $("#always-on-communication").remove()
      }); // спрятали окно
  }
}

function aoc_check_disablePopup(event){
  /*var el = $("#always-on-communication");
  var offset = el.offset()
  if (event.pageX >= offset.left && event.pageX <= offset.left + el.width()
    && event.pageY >= offset.top && event.pageY <= offset.top + el.height()) {
    return;
  }*/
  aoc_disablePopup();
}

// Обработчики событий
$(document).ready(function(){
  //Блокирование клика на линке aoc
  $('.main-menu-aoc').click(function(){
    return false;
  });
  //Открытие/закрытие окна
  $('div.aoc img').mouseenter(
    function(event){
      if($('#always-on-communication').length == 0){ // Открываем окно только если оно закрыто
        aoc_loadPopup(event);
      }
    });
  $('div.aoc').mouseleave(
    function(event){
      if($('#always-on-communication').length > 0) {
        aoc_check_disablePopup(event);
      }
    });

  // ЗАКРЫТИЕ ОКНА
  $(document).click(function(event){
    aoc_check_disablePopup(event);
  });

  // Событие - нажата клавиша Escape
  $(document).keypress(function(e){
    if(e.keyCode == 27 && $('#always-on-communication').length > 0) {
      aoc_disablePopup();
    }
  });
});