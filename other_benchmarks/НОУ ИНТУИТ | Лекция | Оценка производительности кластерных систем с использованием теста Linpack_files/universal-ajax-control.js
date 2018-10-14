function createObjectFromString(function_text)
{
    var function_object = undefined;
    if(typeof function_text == "string" && function_text.length > 0)
    {
        if (window.execScript)
        {
            window.execScript('function_object = ' + '(' + function_text + ')','');
            function_object = window.function_object;
        }
        else
            function_object = eval('(' + function_text + ')');
    }
    return function_object;
}
////Обработчик
//control_type - тип действия ('command' - выполнение команды (с заменой блока HTML),
//                             'js_command' - выполнение команды (с передачей ответа в процедуру JS),
//                             'dialog' - открытие диалога,
//                             'messagebox' - вывод окна сообщений,
//                             'simple' - вызов указанной функции success)
//validate_callback - функция проверяющая возможность выполнять действие
//request_url - URL callback_а выполняющего необходимые действия на серверной стороне
//request_data_source - источник данных для пересылки callback_у ('attr' - из атрибута в виде текста,
//                                                                'form' - из формы)
//source_form_id - id формы источника данных для пересылки
//request_data - данные для пересылки
//destination_block_id - id блока в который вставлять ответ callback_а
//reload_monitoring_block_id - id блока, для которго выполняется проверка на прпоизошедшие изменния для перезагрузки страницы
//reload_page - проводить ли проверку обновления данных для перезагрузки страницы (true, false)
//reload_url - путь к странице загружаемой при перезагрузке
//dialog_title - заголовок окна
//dialog_text - текст окна
//dialog_buttons - определение кнопок диалога
//dialog_attr - атрибуты диалога
//dialog_min_size - заставляет диалог сжиматься по контенту
//success_callback - функция вызываемая если запрос успешно выполнен
//no_check_plain => FALSE - проверять ли переданный текст метки check_plain. По умолчанию проверяем! См. theme_ajax_command_anchor
//$attributes - массив для передачи данных в вызываемый callback
$(document).ready(function() {
    $(document).on('click', ".ajax-command-button,.ajax-command-anchor", function(event) {
        DispatchUniversalAJAXObject(this);

        event.preventDefault();
        return false;
    });
})

function UpdateMathJax(){
    if(window.MathJax != undefined){
        MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    }
}

function DispatchUniversalAJAXObject(object) {
    //Params
    var element = $(object);
    if(element.hasClass('disabled-button'))
        return;
    var reload_url = element.attr('reload_url');
    var request_url = element.attr('request_url');
    var dialog_title = element.attr('dialog_title');
    var control_type = element.attr('control_type');
    var destination_block_id = element.attr('destination_block_id');
    var request_data_source = element.attr('request_data_source');
    var reload_page = createObjectFromString(element.attr('reload_page'));
    var dialog_buttons = createObjectFromString(element.attr('dialog_buttons'));
    var reload_monitoring_block_id = element.attr('reload_monitoring_block_id');
    var validate_callback = createObjectFromString(element.attr('validate_callback'));
    var success_callback = createObjectFromString(element.attr('success_callback'));
    //Data
    var request_data = '';
    var source_form_id = null;
    var validate_result = true;
    if(validate_callback)
        validate_result = validate_callback();
    var dialog_min_size = undefined;
    switch(request_data_source)
    {
        case 'attr':
            request_data = element.attr('request_data');
            break;
        case 'form':
            source_form_id = element.attr('source_form_id');
            if(typeof source_form_id == "string" && source_form_id.length > 0)
                request_data = $('#'+source_form_id).serialize();
            break;
    }
    if(validate_result)
    {
        //Action
        switch(control_type)
        {
            case 'simple':
                if(success_callback)
                    success_callback();
                
                UpdateMathJax();
                
                break;
            case 'command':
                stratOverlay();
                $.post(request_url,
                    request_data,
                    function(data)
                    {
                        if(data.status)
                        {
                            var check_block = false;
                            if(typeof destination_block_id == "string" && destination_block_id.length > 0)
                            {
                                $('#'+destination_block_id).html(data.data);
                                if(typeof data.block_id2 == "string" && data.block_id2.length > 0)
                                {
                                    $('#'+data.block_id2).html(data.data2);
                                }
                                if(reload_page && typeof reload_monitoring_block_id == "string" && reload_monitoring_block_id.length > 0)
                                {
                                    $('#'+reload_monitoring_block_id).attr('reload_page','true');
                                    check_block = true;
                                }
                            }
                            if(success_callback)
                                success_callback();
                
                            UpdateMathJax();
                
                            closeOverlay();
                            if(reload_page && !check_block)
                            {
                                if(typeof reload_url == "string" && reload_url.length > 0)
                                {
                                    window.location.href = reload_url;
                                }
                                else
                                {
                                    window.location.reload(true);
                                }
                            }
                        }
                    },
                    "json");
                break;
            case 'js_command':
                stratOverlay();
                $.post(request_url,
                    request_data,
                    function(data)
                    {
                        if(data.status)
                        {
                            var check_block = false;
                            if(reload_page && typeof reload_monitoring_block_id == "string" && reload_monitoring_block_id.length > 0)
                            {
                                $('#'+reload_monitoring_block_id).attr('reload_page','true');
                                check_block = true;
                            }
                            if(success_callback)
                            {
                                if(typeof data.data2 == "string" && data.data2.length > 0)
                                {
                                    success_callback(data.data, data.data2);
                                }
                                else
                                {  
                                    success_callback(data.data);
                                }
                            }
                
                            UpdateMathJax();
                
                            closeOverlay();
                            if(reload_page && !check_block)
                            {
                                if(typeof reload_url == "string" && reload_url.length > 0)
                                {
                                    window.location.href = reload_url;
                                }
                                else
                                {
                                    window.location.reload(true);
                                }
                            }
                        }
                    },
                    "json");
                break;
            case 'dialog':
                var attr = undefined;
                dialog_min_size = element.attr('dialog_min_size');
                    
                    var dialog_attr = createObjectFromString(element.attr('dialog_attr'));
                    if(dialog_attr){
                        attr = dialog_attr;
                    } else if(dialog_min_size == undefined){
                        attr = {
                            fullscreen: true
                        };
                    }
                    
                var params = {
                    'reload': reload_page,
                    'buttons_list': dialog_buttons,
                    'success': success_callback,
                    'attr': attr
                };
                ShowDialog(dialog_title,request_url,destination_block_id,request_data,params);
                break;
            case 'messagebox':
                var dialog_text = element.attr('dialog_text');
                var max_size = false;
                dialog_min_size = element.attr('dialog_min_size');
                if(dialog_min_size != undefined)
                    max_size = true;
                if(dialog_buttons)
                    MessageBox(dialog_title, dialog_text, reload_page, dialog_buttons, destination_block_id, max_size);
                else
                    MessageBox(dialog_title, dialog_text, reload_page, null, null, max_size);
                break;
        }
    }
}
//Затемнение при работе команд
function stratOverlay()
{
    var overlay = $('<div class="ui-overlay" style="position: absolute; top: 0pt; left: 0pt; display: inline-block; overflow: hidden;"><div class="ui-widget-overlay" style="top: 0pt; left: 0pt; width: 9999px; height: 99999px; z-index: 99999;"></div></div>').hide().appendTo($('body'));
    setOverlayDimensionsToCurrentDocumentDimensions();
    $(overlay).show();
    $(window).resize(function(){
        setOverlayDimensionsToCurrentDocumentDimensions();
    });  
}
//Снятие затемнение
function closeOverlay()
{
    var overlay = $('.ui-overlay');
    overlay.remove();
}
//
function setOverlayDimensionsToCurrentDocumentDimensions() {
    var overlay = $('.ui-overlay');
    overlay.width($(document).width());
    overlay.height($(document).height());
}
