$(document).ready(function() {
    $('sup').tooltip({
        delay: 0, 
        showURL: false, 
        bodyHandler: function() { 
            return $(this).children(".footnote-tooltip").html(); 
        } 
    });
    var keyword_content = getUrlVars()["keyword_content"];
    if(keyword_content != undefined)
    {
        keyword_content = decodeURIComponent(keyword_content);
        $('.keyword:contains('+keyword_content+')').css('background-color','#FF6600');
    } 
  
    $('.youtube-link .video-switcher-youtube').bind('click', function(){
        $(this).hide();
      
        var parent = $(this).parent('.youtube-link');

        parent.nextAll('.videopleer').hide();
      
        parent.children('.video-switcher-intuit').show();
        parent.nextAll('.youtube-frame').show();
    });
  
    $('.youtube-link .video-switcher-intuit').bind('click', function(){
        $(this).hide();
      
        var parent = $(this).parent('.youtube-link');
      
        parent.nextAll('.youtube-frame').hide();
      
        parent.children('.video-switcher-youtube').show();
        parent.nextAll('.videopleer').show();
    });
});
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

