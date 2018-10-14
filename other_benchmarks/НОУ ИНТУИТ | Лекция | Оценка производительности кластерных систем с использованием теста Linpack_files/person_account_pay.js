function validateDurationPayEnterMoneyForm()
{
  return true;
}
function validateSponsorHelpPayEnterMoneyForm(max_amount)
{
  var amount = $('#sponsor-help-pay-enter-money-form #edit-amount');
  var type = $('#sponsor-help-pay-enter-money-form #edit-type');
  if(amount.val().length == 0)
  {
    markFormElementAsError(amount, "Ведите");
    return false;
  }  
  else if(type == 15 && parseInt(amount.val()) > max_amount)
  {
    markFormElementAsError(amount, "Пополните счет");
    $('#sponsor-rechange-link').show();
    $('#sponsor-rechange-link a').bind('click', function() { window.location.reload();});
    return false;
  } else if(!(parseInt(amount.val()) > 0)){
    markFormElementAsError(amount, "Введите сумму");
    return false;
  } else if(!(type.val() > 0)){
    markFormElementAsError(type, "Выберите способ оплаты");
    return false;
  }
  $('#sponsor-rechange-link').hide();
  markFormElementAsOk(amount)
  return true;
}