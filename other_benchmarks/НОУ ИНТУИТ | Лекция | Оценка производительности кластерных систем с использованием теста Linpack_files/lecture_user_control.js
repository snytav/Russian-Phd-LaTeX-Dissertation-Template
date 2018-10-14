$(document).ready(function() {
  $('.lecture-user-control .font-size-control .less').bind('click', function() {
    var size = parseInt($('.eoi').css('font-size'));
    var line_height = parseInt($('.eoi p').css('line-height'));
    if(size > 6)
    { 
      stratOverlay();
      size = size - 1;
      line_height = line_height - 1;
      $.post(Drupal.settings["basePath"] + 'int_studies/json/person_lesson_settings',
      {'font_size':size,'line_height':line_height},
             function(data)
             {
               if(data.status)
               {      
                 $('.eoi').css('font-size', size+'px');
                 $('.eoi p, .eoi ol, .eoi ul').css('line-height', line_height+'px');
               }
               closeOverlay();                 
             },
             "json");  
    }  
  });
  $('.lecture-user-control .font-size-control .normal').bind('click', function() {
      stratOverlay();
      size = 12;
      line_height = 16;
      $.post(Drupal.settings["basePath"] + 'int_studies/json/person_lesson_settings',
      {'font_size':size,'line_height':line_height},
             function(data)
             {
               if(data.status)
               {      
                 $('.eoi').css('font-size', size+'px');
                 $('.eoi p, .eoi ol, .eoi ul').css('line-height', line_height+'px');
               }
               closeOverlay();                 
             },
             "json");     
  });
  $('.lecture-user-control .font-size-control .more').bind('click', function() {
    var size = parseInt($('.eoi').css('font-size'));
    var line_height = parseInt($('.eoi p').css('line-height'));
    if(size < 20)
    {  
      stratOverlay();
      size = size + 1;
      line_height = line_height + 1;
      $.post(Drupal.settings["basePath"] + 'int_studies/json/person_lesson_settings',
      {'font_size':size,'line_height':line_height},
             function(data)
             {
               if(data.status)
               {      
                 $('.eoi').css('font-size', size+'px');
                 $('.eoi p, .eoi ol, .eoi ul').css('line-height', line_height+'px');
               }
               closeOverlay();                 
             },
             "json");       
    }
  });
});