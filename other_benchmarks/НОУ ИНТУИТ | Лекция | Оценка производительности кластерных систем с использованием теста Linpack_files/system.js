/*
 * Библиотека общесистемных ф-ций JS и JQ
 */

/*
 * Проверяет существование селектора на странице и выводит сообщение об ошибке в случае отсутствия.
 * @param string selector Полный селектор (включая #, . и т.п.).
 * @return int Количество объектов в данном селекторе.
 */
function CheckSelectorExistsErrorMsg(selector) {
  var length = $(selector).length;
  if (length == 0) {
    alert('Селектор ' + selector + ' не найден на странице');
  }
  return length;
}