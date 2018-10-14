function inintializePrivacyControl(object, form_item)
{
  if(object && form_item)
  {
    //starting value
    var init_val = form_item.val();
    object.children('.button')
    .children('.common-content-border')
    .children('.common-content-border-content-wrapper')
    .children('.common-content-border-content')
    .children('.item-list')
    .children('ul')
    .children('#privacy_'+init_val)
    .addClass('selected');
    //hover light
    object.children('.button')
    .children('.common-content-border')
    .children('.common-content-border-content-wrapper')
    .children('.common-content-border-content')
    .children('.item-list')
    .children('ul')
    .children('li')
    .hover(function() {
      $(this).addClass('yellow');
    }, function() {
      $(this).removeClass('yellow');
    })
    .click(function(){
      $(this).parent().children('li').removeClass('selected');
      $(this).addClass('selected');
      temp = $(this).attr('id').split('_');
      form_item.val(temp[1]);
    });
    //slide list
    object.hover(function() {
                    // Stop the timer.
                    clearTimeout(this.sfTimer);
                    // Display child lists.
                    $('> .button', this).children('.common-content-border').css({display: 'block'})
                 }, function() {
                    // Start the timer.
                    var uls = $('> .button', this).children('.common-content-border');
                    this.sfTimer = setTimeout(function() {
                        uls.css({display: 'none'});
                    }, 300);
                 });
  }
  return object;
}