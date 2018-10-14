//Обработчик 
$(document).ready(function() {
  var rightPannel_blocks = new Array('#right-social-network-pannel');
  var rightPannel_memory = new Array();
  //Получение сохраненного состояния
  var rightPannel_memory_string = $.cookie("rightPannel_memory");
  if(rightPannel_memory_string == null)
  {
    for(i = 0; i < rightPannel_blocks.length; i = i+1)
    {
      rightPannel_memory[i] = '1';
    }
    $.cookie("rightPannel_memory", rightPannel_memory.toString(), {
      expires: 30,
      path: "/",
      main: Drupal.settings.basePath
    });
  }
  else
  {
    rightPannel_memory = rightPannel_memory_string.split(',');
  }
  //Установка начального положения
  for(i = 0; i < rightPannel_blocks.length; i = i+1)
  {
    if(rightPannel_memory[i] == '1')
    {
      if(i == 0)
      {
        $(rightPannel_blocks[i]).show().width(256);
        $("#right-social-network-pannel-button a").hide();
      }
      else
        $(rightPannel_blocks[i]+' .container').show();
        $(rightPannel_blocks[i]+" .control-button").attr("id","id_"+i);
    }
    else
    {
      if(i == 0)
      {
        $(rightPannel_blocks[i]).hide().width(0);
        $("#right-social-network-pannel-button a").show();
      }
      else
        $(rightPannel_blocks[i]+' .container').hide();
        $(rightPannel_blocks[i]+" .control-button").attr("id","id_"+i);
    }
  }
  //Функции открытия и закрытия панели
  function openPannel()
  {
      $('#right-social-network-pannel').animate({width: "256px"},
                                                {
                                                  duration: 500,
                                                  step: function(currentWidth) {
                                                    $('#block-intuit_social-right_pannel').width(currentWidth+18);
                                                  },
                                                  complete: function() {
                                                    $('#right-social-network-pannel').show();
                                                    $('#block-intuit_social-right_pannel').width(256);
                                                  }
                                                });
      $("#right-social-network-pannel-button a").hide();
      rightPannel_memory[0] = '1';
  }
  function closePannel()
  {
      $('#right-social-network-pannel').animate({width: "0px"},
                                                {
                                                  duration: 500,
                                                  step: function(currentWidth) {
                                                    $('#block-intuit_social-right_pannel').width(currentWidth+18);
                                                  },
                                                  complete: function() {
                                                    $('#right-social-network-pannel').hide();
                                                    $('#block-intuit_social-right_pannel').width(0);
                                                  }
                                                });
      $("#right-social-network-pannel-button a").show();
      rightPannel_memory[0] = '0';
  }
  function saveState()
  {
      $.cookie("rightPannel_memory",
               rightPannel_memory.toString(),
               {expires: 30, path: "/", main: Drupal.settings.basePath});
  }
  //Установка обработчиков кнопок
  //Кнопка закрыть панель на панели
  $("#right-pannel-block-control a").click(function(event){
    if(rightPannel_memory[0] == '1')
    {
      closePannel();
      saveState();
    }
    event.preventDefault();
    return false;
  });
  //Кнопка открыть панель на странице
  $("#right-social-network-pannel-button a").click(function(event){
    if(rightPannel_memory[0] == '0')
    {
      openPannel();
      saveState();
    }
    event.preventDefault();
    return false;
  });
  //Кнопки управления состоянием блоков
  for(i = 1; i < rightPannel_blocks.length; i = i+1)
  {
    $(rightPannel_blocks[i]+" .control-button").click(function(event){
        tag_id = this.id;
        if(tag_id.length > 3)
        {
          id = tag_id.substring(3,tag_id.length);
          if(rightPannel_memory[id] == '0')
          {
            $(rightPannel_blocks[id]+' .container').show();
            rightPannel_memory[id] = '1';
          }
          else if(rightPannel_memory[id] == '1')
          {
            $(rightPannel_blocks[id]+' .container').hide();
            rightPannel_memory[id] = '0';
          }
          saveState();
          event.preventDefault();
          return false;
        }
    });
  }
})