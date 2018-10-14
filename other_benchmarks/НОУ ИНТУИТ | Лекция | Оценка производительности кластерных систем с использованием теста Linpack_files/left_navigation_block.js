//Обработчик
$(document).ready(function () {
    $("#left-navigation .collapse-button")
            .on('click', function (event) {
                var block = $(this).attr('name');
                var $element = $('#left-navigation #collapsible-item-' + block);
                if ($element.css('display') == 'block')
                {
                    $element.hide();
                    $(this).removeClass('orange');
                }
                else
                {
                    $("#left-navigation .submenu").not('.non-collapsible-submenu').hide();
                    $("#left-navigation .collapse-button").removeClass('orange');
                    $("#left-navigation .submenu").not('.non-collapsible-submenu').find('li').removeClass('orange');
                    $element.show();
                    $(this).addClass('orange');
                }
                event.preventDefault();
                //return false;//Если раскоментарить, все блоки внутри данного блока не будут получать сообщения (автоматом вызывается event.stopPropagation())
            })
            .hover(function () {
                $(this).addClass('yellow');
            }, function () {
                $(this).removeClass('yellow');
            });
    $("#left-navigation .submenu li")
            .hover(function () {
                $(this).addClass('yellow');
            }, function () {
                $(this).removeClass('yellow');
            });
    $("#left-navigation .lecture-navigation-wrapper li a").each(function (index, element) {
        $element = $(element);
        $text = $element.html();
        if ($text.length > 18)
        {
            $element.attr('title', $text);
            $element.html($text.substr(0, 18) + '...');
        }
    })
            .hover(function () {
                $(this).addClass('orange');
            }, function () {
                $(this).removeClass('orange');
            });
    $("#left-navigation .lecture-navigation-wrapper .lecture-title").on('click', function (event) {
        var $switch = $(this);
        var $element = $switch.parent().children('.navigation-wrapper');
        var $all_outher_switches = $("#left-navigation .lecture-navigation-wrapper .lecture-title").not($switch);
        var $all_outher_elements = $("#left-navigation .lecture-navigation-wrapper .navigation-wrapper").not($element);
        if ($element.css('display') == 'none')
        {
            $all_outher_switches.addClass('notselected');
            $switch.removeClass('notselected');
            $all_outher_elements.hide();
            $element.show();
        }
        else
        {
            $switch.addClass('notselected');
            $element.hide();
        }
        //event.preventDefault();
        //return false;
    })

    var pr = undefined;
    var prblock = undefined;

    var fRemove = function (me) {
        if (pr !== undefined) {
            pr.abort();
            pr = undefined;
        }

        if (prblock !== undefined) {
            prblock.remove();
            prblock = undefined;
        }
    };

    $('.send-menu').mouseenter(function () {
        var me = $(this);
        var a = me.find('a:first');

        fRemove(me);

        pr = $.post(a.attr('href'), {}, function (data) {
            prblock = $(data.data).appendTo(me);
        }, 'json');
    });

    $('.send-menu').mouseleave(function () {
        var me = $(this);

        fRemove(me);
    });
})