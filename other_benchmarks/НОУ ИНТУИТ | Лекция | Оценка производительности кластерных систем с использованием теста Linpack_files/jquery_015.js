//контекстное меню
//работает только с набором из одного элемента, имеющим идентификатор
//для работы с несколькими, необходимо вызывать для каждого
(function($){
  var methods = {
    init: function( options ) {
      var settings = {
        //Идентификаторы враппера и контнета
        'wrapper_id': null,
        'content_id': null,
        //Дополнительные классы враппера и контнета
        'wrapper_class': null,
        'content_class': null,
        //Теги врапперов, используемые при автоматическом создании
        'wrapper_tag': 'div',
        'content_tag': 'div',
        //Если нужно клонировать в контент существующий элемент, указывается его идентификатор
        //'clone_id': null,
        //события, при которых происходит открытие/закрытие
        //могут быть null и тогда не происходит открытие/закрытие
        //(например, если нужно только открыть, а закрытие производится иным способом (по нажатию кнопки и т.п.))
        'open_event': 'mouseenter',
        'close_event': 'mouseleave',
        //Флаг остановки распространения события open_event
        'open_event_stop_prop': true,
        //Флаг закрытия при нажатии на кнопку Esc
        'close_on_escape': false,
        //Флаг закрытия при клике за пределами враппера
        'close_on_click': false,
        //Флаг отключения обработчиков перед подключением новых
        'unbind': true,
        //Z-index необходимо задавать в css отдельно
        //
        //html данные, помещаемые в блок контента (содержимое контекстного меню)
        'data': null,
        //адрес и передаваемые данные для коллбэка, вызываемого при открытии и возвращающего данные для контента
        //ожидается возврат json - данных
        'request_url': null,
        'request_data': null,
        //запрашивать данные, только если содержимое content пустое
        'request_if_empty': false,
        //асинхронная загрузка данных с сервера
        'async': true,
        //флаг очистки контента после закрытия
        //может использоваться при запросе данных с сервера при открытии, чтобы не сохранять всегда обновляемые данные на странице
        'clear_on_close': false,
        //флаг принудительного закрытия всех открытых меню, перед открытием нового и при закрытии текущего
        //(для избежания одновременного "зависания" нескольких открытых меню на странице)
        //поиск закрываемых меню осуществляется по автоматически присваиваемому при открытии классу int-contextmenu-content
        'close_all': true,
        //всплывать под указателем мыши или непосредственно за враппером.
        'show_under_mouse': false,
        //события меню
        'after_open': function(element_id, wrapper_id, content_id){}
      };
        
      //выход если выбран не 1 элемент или у него нет id
      if (this.length != 1 || this.attr('id') == '') {
        return this;
      }
    
      // If options exist, lets merge them
      // with our default settings
      if (options) {
        $.extend(settings, options);
      }

      // there's no need to do $(this) because
      // "this" is already a jquery object
      // $(this) would be the same as $($('#element'));
      //для использования внутри post и т.п.
      var $this = this;

      //подготовка врапперов обертки и контента
      //враппер обертки
      if (!settings.wrapper_id) {
        settings.wrapper_id = this.attr('id') + '-wrapper';
      }
      if ($('#' + settings.wrapper_id).length == 0) {
        this.wrap('<' + settings.wrapper_tag + ' id="' + settings.wrapper_id + '" class="int-contextmenu-wrapper"></' + settings.wrapper_tag + '>')
      }
      var wrapper = $('#' + settings.wrapper_id);
      if (settings.wrapper_class) {
        wrapper.addClass(settings.wrapper_class);
      }

      //враппер контента
      if (!settings.content_id) {
        settings.content_id = this.attr('id') + '-content';
      }
      if ($('#' + settings.content_id).length == 0) {
        this.after('<' + settings.content_tag + ' id="' + settings.content_id + '" style="display: none; position: absolute" class="int-contextmenu-content"></' + settings.content_tag + '>')
      }
      var content = $('#' + settings.content_id);
      //присвоение специального класса
      content.addClass('int-contextmenu-content');
      if (settings.content_class) {
        content.addClass(settings.content_class);
      }
      if (settings.data) {
        content.html(settings.data)
      }

      //отключение старых обработчиков, если надо
      if (settings.unbind) {
        if (settings.open_event != null) {
          this.unbind(settings.open_event);
        }
        if (settings.close_event != null) {
          wrapper.unbind(settings.close_event);
        }
      }
    
      //назначение обработчиков
      //открытие
      var stop_request = false; //предотвращение повторных обращений на сервер
      var stop_out = false; //выход произошел ранее чем открылось меню
      if (settings.open_event) {
        stop_request = false;
        this[settings.open_event](function(eventObject){
          //если открываем в месте нахождения мыши
          if (settings.show_under_mouse) {
            content.css('top', eventObject.pageY);
            content.css('left', eventObject.pageX);
          }
          //если запрос данных с сервера
          if (settings.request_if_empty && content.html() != '') {
          } else {
            if (settings.request_url && !stop_request) {
              stop_request = true;
              $.ajax({
                url: settings.request_url,
                async: settings.async,
                type: 'POST',
                data: settings.request_data,
                dataType: "json",
                success: function(data, textStatus, jqXHR){
                  //если событие закрытия было раньше, чем данные с сервера загрузились, ничего не открываем
                  if(!stop_out) {
                    if(data) {
                      content.html(data);
                      //закрытие всех других меню перед открытием этого (если надо)
                      if (settings.close_all) {
                        $('.int-contextmenu-content').slideUp('fast');
                      }
                      content.slideDown('fast');
                    }
                    //после открытия
                    settings.after_open($this.attr('id'), wrapper.attr('id'), content.attr('id'));
                  } else {
                    stop_out = false
                  }
                  stop_request = false;
                }
              });
            }
          }
          //если просто открываем (без запроса с сервера)
          if (!settings.request_url || (settings.request_url && settings.request_if_empty && content.html() != '')) {
            //закрытие всех других меню перед открытием этого (если надо)
            if (settings.close_all) {
              $('.int-contextmenu-content').slideUp('fast');
            }
            content.slideDown('fast');
          }
          //остановка распространения события, если надо
          if (settings.open_event_stop_prop) {
            return false;
          }
        });
      }
    
      //закрытие
      if (settings.close_event) {
        wrapper[settings.close_event](function(){
          close();
        });
      }
    
      //закрытие по Esc
      if (settings.close_on_escape) {
        $(document).keypress(function(e) {
          if (e.keyCode == 27) {
            close();
          }
        });
      }
    
    //закрытие по клику за пределами врапера
    if (settings.close_on_click) {
      $(document).click(function(e){
        
      });
    }
    
      //возврат обернутого набора для возможности дальнейшего построения цепочек JQuery
      return this;
    
      //Внутренние ф-ции
      //Закрытие
      function close() {
        //выход произошел до того, как данные с сервера загрузились
        if (stop_request)
          stop_out = true;
        content.slideUp('fast');
        //очистка при выходе, если надо
        if (settings.clear_on_close) {
          content.html('');
        }
        //закрытие всех других меню (если надо)
        if (settings.close_all) {
          $('.int-contextmenu-content').slideUp('fast');
        }
      }  
    },
    
    close: function() {
      
    }
  };
   
  $.fn.intContextMenu = function(method) {
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.intContextMenu' );
    }    
  };
})( jQuery );



