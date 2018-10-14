//Добавляем диалогу функции создания и удаления кнопок "налету"
$.extend($.ui.dialog.prototype, {
    'addbutton': function(buttonName, func, position) {
        var buttons = this.element.dialog('option', 'buttons');
        var buttons_length = buttons.length;
        if(buttons instanceof Array)
        {
            if(typeof position == 'undefined')
            {  
                buttons[buttons.length] = {
                    'text': buttonName,
                    'click': func
                };
            }
            else if(position < buttons_length)
            {  
                var temp_button = undefined;
                var temp_button_2 = undefined;
                for(var i = position; i < buttons_length+1; i++)
                {
                    if(i == position)
                    {  
                        temp_button = buttons[i];
                        buttons[i] = {
                            'text': buttonName,
                            'click': func
                        };
                    }
                    else     
                    {  
                        temp_button_2 = buttons[i];
                        buttons[i] = temp_button;
                        temp_button = temp_button_2;
                    }
                }
            }  
        }
        else
            buttons[buttonName] = func;
        this.element.dialog('option', 'buttons', buttons);
        IntWrapDialogButtons($(this.element));
    }
});
$.extend($.ui.dialog.prototype, {
    'removebutton': function(buttonName) {
        var buttons = this.element.dialog('option', 'buttons');
        if(buttons instanceof Array)
            buttons.splice(Number(buttonName),1);
        else
            delete buttons[buttonName];
        this.element.dialog('option', 'buttons', buttons);
        IntWrapDialogButtons($(this.element));
    }
});
$.extend($.ui.dialog.prototype, {
    'removeallbuttons': function() {
        this.element.dialog('option', 'buttons', {});
    }
});
//
function setDialogTitle(title)
{
    $('.ui-dialog-title').html(title);
}
//Переопределение кнопок диалогов
function IntWrapDialogButtons(dlg) {
    var center = null;
    var cancel_buttons = dlg.parent().find('.ui-button.cancel-button');
    if (!cancel_buttons.hasClass("command-button")) 
    {
        cancel_buttons.addClass("command-button");
        center = cancel_buttons.find('span');
        center.addClass("button-center");
        center.wrap('<div class="grey-button-border-1" />');
        center.wrap('<div class="grey-button-border-2" />');
        center.wrap('<div class="grey-button-border-3" />');
    }  
    var buttons = dlg.parent().find('.ui-button:not(.cancel-button)');
    if (!buttons.hasClass("command-button")) 
    {
        buttons.addClass("command-button");
        center = buttons.find('span');
        center.addClass("button-center");
        center.wrap('<div class="command-button-border-1" />');
        center.wrap('<div class="command-button-border-2" />');
        center.wrap('<div class="command-button-border-3" />');
    }
}

//Отображение информационного диалога c кнопкой Ок
function MessageBoxOk(dialog_title, dialog_text, reload, max_size) {
    var title = dialog_title;
    if (title == undefined || title == null) {
        title = Drupal.t('Message');
    }
    var buttons = {
        'Ok': function() {
            $(this).dialog('close');
        }
    };
    MessageBox(title, dialog_text, reload, buttons, null, max_size);
}

//Отображение диалога удаления чего-нибудь
//передается объект this с атрибутами:
//request_url, dialog_title, dialog_text
function MessageBoxDel(object) {
    var ref = $(object).attr('request_url');
    var buttons =
    {
        'Отмена': function() {
            $(this).dialog('close');
        },
        'Удалить': function() {
            $.post(ref, function(){
                window.location.reload();
            });
            $(this).dialog('close');
        }
    };
    //intuit_common_interface
    MessageBox($(object).attr('dialog_title'), $(object).attr('dialog_text'), null, buttons);
}

//Отображение диалога c вопросом и кнопками
function MessageBox(title, text, reload, buttons_list, destination_block_id, max_size) {
    if (reload == undefined || reload == null) {
        reload = false;
    }
    var id = '';
    if (destination_block_id != undefined && destination_block_id != null) {
        id = ' id="' + destination_block_id + '"';
    }
    var width = 'auto';
    var height = 'auto';  
    if (max_size == true) {
        var sizes = getPageSize();
        width = sizes[2]-100;
        height = sizes[3]-100;  
    }
    var $dialog = $('<div' + id + '></div>')
    .dialog({
        title: title,
        resizable: false,
        draggable: true,
        modal: true,
        width: width,
        height: height, 
        buttons: buttons_list,
        close: function() {
            if(reload)
                window.location = window.location.href;
            $(this).remove();
        },
        open: function(event, ui) {
            IntWrapDialogButtons($(this))
        }
    });
    $dialog.html(text);
    forceCenterScreen($dialog);
}
//Отображение диалога
//success - выполняется после загрузки данных в диалог
function ShowDialog(title, url, block, data, params/* reload, buttons_list, success*/)
{ 
    var reload = false;
    if (params['success'] != undefined) {
        reload = params['reload'];
    }
    //запрос содержимого диалога с сервера
    $.post(url,
        data,
        function(data)
        {
            $('#'+block).html(data.data);
            $('#'+block+' form').submit(false);
            if(typeof data.block_id2 == "string" && data.block_id2.length > 0)
            {
                $('#'+data.block_id2).html(data.data2);
            }
            if($('#'+block).hasClass('min-size-dialog'))
            {
                forceMinSize($dialog);
            }
            //если надо, вызываем коллбэк после загрузки данных
            if (params['success'] != undefined) {
                params['success']();
            }
            forceCenterScreen($dialog);

            //скрываем throbber
            RemoveDialogThrobber();
        },
        "json");

    var options = {//autoOpen: false,
        title: title,
        resizable: false,
        draggable: true,
        modal: true,
        close: function() {
            if(reload)
            {
                var reload_page = $('#'+block).attr('reload_page');
                if(typeof reload_page != "string" || reload_page.length == 0)
                    reload_page = false;
                reload_page = eval(reload_page);
                if(reload_page)
                    window.location.reload();
            }
            $(this).remove();
        },
        open: function(event, ui) {
            IntWrapDialogButtons($(this));
        }
    };
    var min_size_class = ' class="min-size-dialog"';
    if(params['attr'] != undefined)
    {
        if(params['attr']['fullscreen'] != undefined)
        {
            var sizes = getPageSize();
            options.width = sizes[2]-100;
            options.height = sizes[3]-100;
            min_size_class = '';
        }
        else if(params['attr']['width'] != undefined || params['attr']['height'] != undefined)
        {
            sizes = getPageSize();
            if(params['attr']['width'] != undefined && (params['attr']['width'] < sizes[2] || params['attr']['width'] == "auto"))
            {
                options.width = params['attr']['width'];
                min_size_class = '';
            }
            if(params['attr']['height'] != undefined && (params['attr']['height'] < sizes[3] || params['attr']['height'] == "auto"))
            {
                options.height = params['attr']['height'];
                min_size_class = '';
            }
        }
    }
    if(params['buttons_list'] != undefined)
    {
        options.buttons = params['buttons_list'];
    }
    var $dialog = $('<div id="'+block+'"'+min_size_class+'></div>')
    .html('<p class="block-message">'+Drupal.t('Processing your request...')+'</p>')//Подождите, запрос обрабатывается...
    //<div class="ahah-progress ahah-progress-throbber"><div class="throbber">&nbsp;</div></div>
    .dialog(options);
    $('.ui-helper-clearfix').after('<div class="ui-helper-clearfix-after">.</div>');
    //показываем throbber на время получения содержимого диалога с сервера
    //скрываем после получения данных - см. выше (запрос содержимого диалога с сервера)
    AddDialogThrobber();
    forceCenterScreen($dialog);
}
//вычисление минимальных размеров для диалога
function forceMinSize($dialog)
{
    var dialog_parent = $dialog.parent();
    var dialog_title = dialog_parent.children('.ui-dialog-titlebar.ui-widget-header');
    var max_width = $dialog.outerWidth();
    var max_height = $dialog.outerHeight();
    if(dialog_parent.length > 0)
    {
        var childs = $dialog.find('*');
        if(childs.length > 0)
        {
            max_width = $dialog.outerWidth();
            childs.each(function(index, value) {
                var element = $(value);
                var width = element.outerWidth();
                if(width > max_width)
                    max_width = width;
            });
        }
        var childs1 = dialog_title.find('*');
        if(childs1.length > 0)
        {
            childs1.each(function(index, value) {
                var element = $(value);
                var width = element.outerWidth();
                if(width > max_width)
                    max_width = width;
            });
        }
        //width
        max_width += 30;
        if(max_width > $(window).width())
            max_width = $(window).width() - 60;
        dialog_parent.css('width', max_width);
        //height
        if(childs.length > 0)
        {
            max_height = 0;
            childs.each(function(index, value) {
                var element = $(value);
                var height = element.outerHeight();
                if(height > max_height)
                    max_height = height;
            });
        }
        max_height+=10;
        if(max_height > $(window).height())
        {
            max_height = $(window).height() - 60;
            dialog_parent.css('height', max_height);
            $dialog.css('height', max_height - 105);
        }
        else
            $dialog.css('height', max_height);
        forceCenterScreen($dialog);
    }
}
//
function forceCenterScreen($dialog)
{
    var dialog_parent = $dialog.parent();
    var max_width = $dialog.outerWidth();
    var max_height = $dialog.outerHeight();
    //top
    delta = dialog_parent.children('.ui-dialog-buttonpane').outerHeight() + dialog_parent.children('.ui-dialog-titlebar').outerHeight();
    var top = ($(window).height() - max_height - delta)/2;
    if(top < 0)
        top = 30;
    dialog_parent.css('top', top + $(window).scrollTop());  
    //left
    var left = ($(window).width() - max_width)/2;
    if(left < 0)
        left = 30;
    dialog_parent.css('left', left + $(window).scrollLeft());
}
//отображение и скрытие throbber для диалога
function AddDialogThrobber(id) {
    var selector = '.ui-dialog-buttonpane';
    if (id != undefined) {
        selector = id + ' ' + selector;
    }
    $(selector).append('<div class="dialog-throbber ahah-progress ahah-progress-throbber"><div class="throbber">&nbsp;</div></div>');
}
//
function RemoveDialogThrobber(id) {
    var selector = '.dialog-throbber';
    if (id != undefined) {
        selector = id + ' ' + selector;
    }
    $(selector).remove();
}
//
function  getPageSize()
{
    var xScroll, yScroll;
    if (window.innerHeight && window.scrollMaxY)
    {
        xScroll = document.body.scrollWidth;
        yScroll = window.innerHeight + window.scrollMaxY;
    }
    else if (document.body.scrollHeight > document.body.offsetHeight)
    { // all but Explorer Mac
        xScroll = document.body.scrollWidth;
        yScroll = document.body.scrollHeight;
    }
    else if (document.documentElement && document.documentElement.scrollHeight > document.documentElement.offsetHeight)
    { // Explorer 6 strict mode
        xScroll = document.documentElement.scrollWidth;
        yScroll = document.documentElement.scrollHeight;
    }
    else
    { // Explorer Mac...would also work in Mozilla and Safari
        xScroll = document.body.offsetWidth;
        yScroll = document.body.offsetHeight;
    }

    var windowWidth, windowHeight;
    if (self.innerHeight)
    { // all except Explorer
        windowWidth = self.innerWidth;
        windowHeight = self.innerHeight;
    }
    else if (document.documentElement && document.documentElement.clientHeight)
    { // Explorer 6 Strict Mode
        windowWidth = document.documentElement.clientWidth;
        windowHeight = document.documentElement.clientHeight;
    } 
    else if (document.body)
    { // other Explorers
        windowWidth = document.body.clientWidth;
        windowHeight = document.body.clientHeight;
    }
    // for small pages with total height less then height of the viewport
    if(yScroll < windowHeight)
    {
        pageHeight = windowHeight;
    }
    else
    {
        pageHeight = yScroll;
    }
    // for small pages with total width less then width of the viewport
    if(xScroll < windowWidth)
    {
        pageWidth = windowWidth;
    }
    else
    {
        pageWidth = xScroll;
    }
    return [pageWidth,pageHeight,windowWidth,windowHeight];
}
//
function validForm(formID, messages) 
{
    /**
    * @description Если в форме инпутов больше, чем 0, то валидируем ее
    */
    var error = false;
    $('#'+formID).each( function() {
        var id = "#" + $(this).attr('id');
        if ($(id + " input").length > 0) {
            if(!Validate(id, messages))
                error = true;
        } else {
            return false;
        }
    });
    return !error;
}
/**
  * @argument {$} form Форма для валидации
  */
function Validate(form, messages) 
{
    /**
    * @type int
    * @description Количество ошибок
    * @default 0
    */
    var errorAmount = 0;
    $(form + " .required").each(function() 
    {
        var element = $(this);
        var length = $.trim(element.attr('value'));

        if (!length || element.attr('value') == element.attr('title')) {
            var message = 'Поле обязательно для заполнения!';
            if(messages != undefined)
            {
                if(typeof(messages)=='string')
                {
                    message = messages;
                }
                else
                {
                    if(messages[element_id])
                        message = messages[element_id];
                    else
                        message = 'Поле обязательно для заполнения!';
                }
            }
            markFormElementAsError(element, message)
            errorAmount++;
        }
        else {
            markFormElementAsOk(element)
        }
    });

    if(errorAmount == 0)
        return true;
    return false;
}
//
function markFormElementAsError(element, message)
{
    if(element)
    {
        var element_id = element.attr('id');
        element.addClass('error');
        if($('#'+element_id+'-message').length == 0)
        {
            var tip = $('<div>', {
                "class": 'messages error-message'
            });
            var tip_wrapper = $('<div>', {
                id: element_id+'-message',
                "class": 'error-message-wrapper'
            });
            tip_wrapper.insertAfter('#'+element_id)
            .append(tip)
            .bind('mouseenter', function() {
                var $this = $(this);
                $this.remove();
            });
            tip.css('width', element.outerWidth()-10)
            .css('height', element.outerHeight())
            .html(message);
        }
    }
}
//
function markFormElementAsOk(element)
{
    if(element)
    {
        var element_id = element.attr('id');
        element.removeClass('error');
        $('#'+element_id+'-message').remove();
    }
}
//изменение класса .description для ошибочных элементов после получения ответа в Int_Dialog_Submit
function intDialogSetError(form_id) {
    $('#' + form_id + ' INPUT[class*=error]').parent().next('.description').each(function(index, element){
        var el = $(element);
        el.html('<span class="error">' + el.html() + '</span>');
    });
}
//перезагрузка содержимого попапа (например, попап-формы)
function intDialogFormReload(url, form_id) {
    $.post(
        Drupal.settings['basePath'] + url,
        null,
        function(data) {
            $('#' + form_id).parent().html(data.data);
            RemoveDialogThrobber();
        },
        "json"
        );
}
//отправка (сабмит) диалога с формой по стандартному или по заданному адресу
//form_id - идентификатор формы (без #, с тире)
//url - адрес отправки формы на валидацию и сохранение (без базовой части пути - не надо пропускать через url!)
function intDialogSubmit(form_id, url, reload_page) {
    if(validForm(form_id)){
        var options = {
            url: Drupal.settings['basePath'] + url,
            complete: function(response) {
                var data = eval('('+response.responseText+')');
                //если ошибка снова выводим форму с ошибками
                //если все хорошо, выводим полученные данные вместо формы (например, некий завершающий скрипт) и закрываем диалог
                var parent = $('#' + form_id).parent();
                parent.html(data.data);
                if (data.status == 'error') {
                    intDialogSetError(form_id);
                    RemoveDialogThrobber();
                } else {
                    if(reload_page > 0){
                        window.location.href=window.location.href;
                    }
                    
                    parent.dialog('close');
                }
            }
        };
        AddDialogThrobber();
    
        $('#' + form_id + ' input[type=text].blur, #' + form_id + ' textarea.blur').each(function(){
            var $input = $(this),
            title = $input.attr('title'),
            blurClass = 'blur';
            if ($input.val() === title && $input.hasClass(blurClass)) {
                $input.val('').removeClass(blurClass);
            }
        });
        $('#' + form_id).ajaxSubmit(options);
    }
}
