function validateRechangeEnterMoneyForm()
{
  var $rechange_amount = $('#rechange-enter-money-form #edit-rechange-amount');
  var rechange_amount_val = $rechange_amount.val();
  if(rechange_amount_val == '')
  {
    markFormElementAsError($rechange_amount, 'Введите');
    return false;
  }
  var val = parseFloat(rechange_amount_val);
  if(isNaN(val))
  {
    markFormElementAsError($rechange_amount, 'Не число');
    return false;
  }
  if(val != $('#rechange-enter-money-form #edit-rechange-amount').val())
  {
    markFormElementAsError($rechange_amount, 'Не число');
    return false;
  }
  if(val <= 0)
  {
    markFormElementAsError($rechange_amount, 'Не положительное');
    return false;
  }
  markFormElementAsOk($rechange_amount);
  return true;
}
function validateOrder1RechangeEnterMoneyForm()
{
  var $rechange_amount = $('#order-1-rechange-enter-money-form #edit-rechange-amount');
  var rechange_amount_val = $rechange_amount.val();
  if(rechange_amount_val == '')
  {
    markFormElementAsError($rechange_amount, 'Введите');
    return false;
  }
  var val = parseFloat(rechange_amount_val);
  if(isNaN(val))
  {
    markFormElementAsError($rechange_amount, 'Не число');
    return false;
  }
  if(val != $('#order-1-rechange-enter-money-form #edit-rechange-amount').val())
  {
    markFormElementAsError($rechange_amount, 'Не число');
    return false;
  }
  if(val <= 0)
  {
    markFormElementAsError($rechange_amount, 'Не положительное');
    return false;
  }
  var $rechange_name = $('#order-1-rechange-enter-money-form #edit-rechange-name');
  if($rechange_name.val() == '')
  {
    markFormElementAsError($rechange_name, 'Введите');
    return false;
  }
  var $rechange_address = $('#order-1-rechange-enter-money-form #edit-rechange-address');
  if($rechange_address.val() == '')
  {
    markFormElementAsError($rechange_address, 'Введите');
    return false;
  }
  markFormElementAsOk($rechange_amount);
  markFormElementAsOk($rechange_name);
  markFormElementAsOk($rechange_address);
  return true;
}
function validateOrder2RechangeEnterMoneyForm()
{
  var $rechange_amount = $('#order-2-rechange-enter-money-form #edit-rechange-amount');
  var rechange_amount_val = $rechange_amount.val();
  if(rechange_amount_val == '')
  {
    markFormElementAsError($rechange_amount, 'Введите');
    return false;
  }
  var val = parseFloat(rechange_amount_val);
  if(isNaN(val))
  {
    markFormElementAsError($rechange_amount, 'Не число');
    return false;
  }
  if(val != $('#order-2-rechange-enter-money-form #edit-rechange-amount').val())
  {
    markFormElementAsError($rechange_amount, 'Не число');
    return false;
  }
  if(val <= 0)
  {
    markFormElementAsError($rechange_amount, 'Не положительное');
    return false;
  }
  var $rechange_fullname = $('#order-2-rechange-enter-money-form #edit-rechange-fullname');
  if($rechange_fullname.val() == '')
  {
    markFormElementAsError($rechange_fullname, 'Введите');
    return false;
  }
  var $rechange_phone = $('#order-2-rechange-enter-money-form #edit-rechange-phone');
  if($rechange_phone.val() == '')
  {
    markFormElementAsError($rechange_phone, 'Введите');
    return false;
  }
  var re = /^[0-9]*$/;
  if (!re.test($rechange_phone.val()))
  {
    markFormElementAsError($rechange_phone, 'Неверный формат');
    return false;
  }    
  var $rechange_fax = $('#order-2-rechange-enter-money-form #edit-rechange-fax');
  if($rechange_fax.val() == '')
  {
    markFormElementAsError($rechange_fax, 'Введите');
    return false;
  }
  if (!re.test($rechange_fax.val()))
  {
    markFormElementAsError($rechange_fax, 'Неверный формат');
    return false;
  }     
  var $rechange_zip = $('#order-2-rechange-enter-money-form #edit-rechange-zip');
  if($rechange_zip.val() == '')
  {
    markFormElementAsError($rechange_zip, 'Введите');
    return false;
  }
  var $rechange_address = $('#order-2-rechange-enter-money-form #edit-rechange-address');
  if($rechange_address.val() == '')
  {
    markFormElementAsError($rechange_address, 'Введите');
    return false;
  }
  var $rechange_legaladdress = $('#order-2-rechange-enter-money-form #edit-rechange-legaladdress');
  if($rechange_legaladdress.val() == '')
  {
    markFormElementAsError($rechange_legaladdress, 'Введите');
    return false;
  }
  var $rechange_inn = $('#order-2-rechange-enter-money-form #edit-rechange-inn');
  if($rechange_inn.val() == '')
  {
    markFormElementAsError($rechange_inn, 'Введите');
    return false;
  }
  var $rechange_kpp = $('#order-2-rechange-enter-money-form #edit-rechange-kpp');
  if($rechange_kpp.val() == '')
  {
    markFormElementAsError($rechange_kpp, 'Введите');
    return false;
  }
  var $rechange_account = $('#order-2-rechange-enter-money-form #edit-rechange-account');
  if($rechange_account.val() == '')
  {
    markFormElementAsError($rechange_account, 'Введите');
    return false;
  }
  var $rechange_coraccount = $('#order-2-rechange-enter-money-form #edit-rechange-coraccount');
  if($rechange_coraccount.val() == '')
  {
    markFormElementAsError($rechange_coraccount, 'Введите');
    return false;
  }
  var $rechange_bank = $('#order-2-rechange-enter-money-form #edit-rechange-bank');
  if($rechange_bank.val() == '')
  {
    markFormElementAsError($rechange_bank, 'Введите');
    return false;
  }
  var $rechange_person = $('#order-2-rechange-enter-money-form #edit-rechange-person');
  if($rechange_person.val() == '')
  {
    markFormElementAsError($rechange_person, 'Введите');
    return false;
  }  
  markFormElementAsOk($rechange_amount);
  markFormElementAsOk($rechange_fullname);
  markFormElementAsOk($rechange_phone);
  markFormElementAsOk($rechange_fax);
  markFormElementAsOk($rechange_zip);
  markFormElementAsOk($rechange_address);
  markFormElementAsOk($rechange_legaladdress);
  markFormElementAsOk($rechange_inn);
  markFormElementAsOk($rechange_kpp);
  markFormElementAsOk($rechange_account);
  markFormElementAsOk($rechange_coraccount);
  markFormElementAsOk($rechange_bank);
  markFormElementAsOk($rechange_person);
  return true;
}
function validatePostalOrderRechangeEnterMoneyForm()
{
  var $rechange_amount = $('#postal-order-rechange-enter-money-form #edit-rechange-amount');
  var rechange_amount_val = $rechange_amount.val();
  if(rechange_amount_val == '')
  {
    markFormElementAsError($rechange_amount, 'Введите');
    return false;
  }
  var val = parseFloat(rechange_amount_val);
  if(isNaN(val))
  {
    markFormElementAsError($rechange_amount, 'Не число');
    return false;
  }
  if(val != $('#postal-order-rechange-enter-money-form #edit-rechange-amount').val())
  {
    markFormElementAsError($rechange_amount, 'Не число');
    return false;
  }
  if(val <= 0)
  {
    markFormElementAsError($rechange_amount, 'Не положительное');
    return false;
  }
  var $rechange_name = $('#postal-order-rechange-enter-money-form #edit-rechange-name');
  if($rechange_name.val() == '')
  {
    markFormElementAsError($rechange_name, 'Введите');
    return false;
  }
  var $rechange_address = $('#postal-order-rechange-enter-money-form #edit-rechange-address');
  if($rechange_address.val() == '')
  {
    markFormElementAsError($rechange_address, 'Введите');
    return false;
  }
  markFormElementAsOk($rechange_amount);
  markFormElementAsOk($rechange_name);
  markFormElementAsOk($rechange_address);
  return true;
}
function includeVVODCSS()
{
  $('head').append('<link type="text/css" rel="stylesheet" media="all" charset="windows-1251" href="https://vvod.ru/css.css" />');
}
function applyINTUITDesigToButton()
{
  var button = $('#rechange-dialog-block input[type=submit]');
  button.wrap('<div class="submit-button-wrapper" />');
  button.wrap('<div id="button-op" class="submit-button" />');
  button.wrap('<div class="submit-button-border-1" />');
  button.wrap('<div class="submit-button-border-2" />');
  button.wrap('<div class="submit-button-border-3" />');
}
function printOrder1()
{
  $("#payment-order-1").printElement();
}
function sendOrder1()
{
  stratOverlay();
  $.post(Drupal.settings['basePath'] + 'intuituser/person_account/send',
         $('#order-1-send-print-form').serialize(),
         function(data) {closeOverlay();},
         "json");
}
function printOrder2()
{
  $("#payment-order-2").printElement();
}
function sendOrder2()
{
  stratOverlay();
  $.post(Drupal.settings['basePath'] + 'intuituser/person_account/send',
         $('#order-2-send-print-form').serialize(),
         function(data) {closeOverlay();},
         "json");
}
function printPostalOrder()
{
  $("#postal-order").printElement();
}
function sendPostalOrder()
{
  stratOverlay();
  $.post(Drupal.settings['basePath'] + 'intuituser/person_account/send',
         $('#postal-order-send-print-form').serialize(),
         function(data) {closeOverlay();},
         "json");
}
function closeDialog()
{
  $('#rechange-dialog-block').dialog('close');
}