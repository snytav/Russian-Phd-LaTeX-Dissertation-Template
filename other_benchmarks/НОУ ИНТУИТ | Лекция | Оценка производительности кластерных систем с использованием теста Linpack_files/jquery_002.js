//Растягивающаяся текстовая область
//Требует elastic (или autoResize)
//Работает только с набором элементов textarea. Остальные элементы игнорируются
//!!!ВАЖНО - Если используется плагин hint его лучше подключать ПОСЛЕ подключения intElastic
(function($){
  $.fn.intElastic = function(options) {
    var settings = {
      //имя атрибута, хранящего уникальный идентификатор объекта
      //'recepient_id_attr_name': null,
      //Адрес отправки содержимого
      //Ожидается возврат объекта json {status, data} и в качестве наполнения контента используется data
      'url': null,
      //Асинхронная передача данных
      'async': false,
      //Отправлять ли на сервер всю родительскую форму или только содержимое textarea
      'send_form': true,
      //Функция, вызываемая при успешном получении данных с сервера
      'success': function(data, textStatus, jqXHR){},
      //Функция валидации, вызываемая перед отправкой данных. Если вернет false, отправка прерывается
      //Передается id textarea и id родительской формы, если send_form = true
      'validate': function(elsement_id, form_id){return true},
      //Не отправлять hint (title) элемента управления. См. плагин jquery.hint
      'no_send_hint': true,
      //Чистить ли textarea при инициализации и после success
      'clear_on_init': true,
      'clear_on_success': true,
      //Первоначальная высота элемента управления
      'init_height': -1,
      //Комбинация кнопок отправки
      'send_keyCode': 13,
      'send_shiftKey': false,
      'send_altKey': false,
      'send_ctrlKey': false
    };

    // If options exist, lets merge them
    // with our default settings
    if (options) {
      $.extend(settings, options);
    }

    //Проходим по всем элементам и возвращаем обернутый набор
    return this.each(function() {
      // Elastic only works on textareas
      if ( this.type != 'textarea' ) {
        return false;
      }

      var $textarea	=	$(this);
      //чистим textarea если надо
      if(settings.clear_on_init)
        $textarea.val('');
      //начальный размер textarea
      if (settings.init_height >= 0)
        $textarea.height(settings.init_height);
      //делаем textarea elastic (или autoResize)
      $textarea.autoResize();
      //$textarea.elastic();
      //если нажата правильная кнопка и поле заполнено
      $textarea.keypress(function(e){
        if (e.which == settings.send_keyCode &&
          (e.shiftKey == settings.send_shiftKey || e.shiftKey == undefined) &&
          (e.altKey  == settings.send_altKey || e.altKey == undefined) &&
          (e.ctrlKey == settings.send_ctrlKey || e.ctrlKey == undefined)) {
          if ($textarea.val() && settings.url.length != undefined && settings.url.length > 0 && settings.success != undefined) {
            //выход если в поле hint
            if (settings.no_send_hint && $textarea.val() == $textarea.attr('title'))
              return false;
            //вызов ф-ции валидации
            var form_id = null;
            if (settings.send_form) {
              form_id = $textarea.parents('form').attr('id');
            }
            if (!settings.validate($textarea.attr('id'), form_id))
              return false;
            var data;
            //посылаем форму родительскую или только текст
            if (settings.send_form) {
              data = $textarea.parents('form').serialize();
            } else {
              data = $textarea.val();
            }
            stratOverlay();
            $.ajax({
              url: settings.url,
              async: settings.async,
              type: 'POST',
              data: data,
              dataType: "json",
              success: function(data, textStatus, jqXHR){
                //чистим textarea если надо
                if(settings.clear_on_success)
                  $textarea.val('');
                closeOverlay();
                settings.success(data, textStatus, jqXHR);
              }
            });
            return false;
          } else {
            //предотвращаем распространение события отправки в пустом элементе textarea
            return false;
          }
        }
      });
    });
  };
})( jQuery );



