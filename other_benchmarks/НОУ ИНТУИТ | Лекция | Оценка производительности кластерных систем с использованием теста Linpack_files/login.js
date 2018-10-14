//0 - окно закрыто; 1  - окно открыто;
var popupStatus = 0;
// 0 - вызов формы впервые; 1 - форма уже вызывалась;
var start = 0;

// Определяет позицию элемента, необходима для получения координат ссылки "Вход", относительно которой будет позиционироваться всплывающее окно
function absPosition(obj) {
	var x = y = 0;
	while(obj) {
		x += obj.offsetLeft;
		y += obj.offsetTop;
		obj = obj.offsetParent;
	}
	return {x:x, y:y};
}

// Показываем окно
function loadPopup(){
	if(popupStatus==0){ // Открываем окно только если оно закрыто
		$('body').append('<div id="userLoginModalPopup"></div><div id="backgroundPopup"></div>'); // Добавляем к странице див, являющийся основой для нашего окошка
		if(start==0){ // если окно ещё ни разу не показывалась,
			document.getElementById('userLoginModalOpen').setAttribute('href', '#'); // меняем адрес ссылки "Вход",
			//.clone()
      $('#user-login-form').appendTo('#userLoginModalPopup'); // и копируем в него содержимое user-login-form из нашего block-user-0.tpl.php
			start = 1; // выставляем флаг что окно сформировано
		}
		// высота окна браузера
		var windowHeight = document.documentElement.clientHeight;
		// Определяем положение ссылки "Вход" на странице
		var ourRef = document.getElementById("userLoginModalOpen"); // Ссылке "Вход" должен быть присвоен id="userLoginModalOpen"
		var ourRefX = absPosition(ourRef).x;
		var ourRefY = absPosition(ourRef).y;

		// размещаем окно под ссылкой "Вход"
		$("#userLoginModalPopup").css({
			"position": "absolute",
			"top": ourRefY + 20,
			"left": ourRefX
		});

		// только для MS IE 6
		$("#backgroundPopup").css({
			"height": windowHeight
		});

		// можем установить прозначность фона
		$("#backgroundPopup").css({
			"opacity": "0.0" // в моем случае без прозрачности. Можете эксперементировать со значениями от 0.0 до 1.0
		});

		// Показываем форму с эффектом ВыезжалкО
		$("#backgroundPopup").fadeIn("slow"); // показали фон под формой
		$("#userLoginModalPopup").fadeIn("slow"); // показали саму форму
		popupStatus = 1; // выставляем флаг, что окно открыто
                
                $('#user-login-form input:first').focus();
	}
}

// Скрываем окно
function disablePopup(){
	// Закрываем окно только если оно открыто
	if(popupStatus==1){
		$("#backgroundPopup").fadeOut("slow");  // спрятали фон под формой
		$("#userLoginModalPopup").fadeOut("slow"); // спрятали саму форму
		popupStatus = 0; // выставляем флаг, что окно закрыто
	}
}

// Обработчики событий
$(document).ready(function(){
	// ОТКРЫТИЕ ОКНА
	// Событие - щелчек по ссылке "Вход"
	$("#userLoginModalOpen").click(function(){
		// вызываем функцию открытия окна
		loadPopup();
	});

	// ЗАКРЫТИЕ ОКНА
	// Событие - щелчок за пределами окна
	$("#backgroundPopup").live('click',function(){
		// вызываем функцию закрытия окна
		disablePopup();
	});

	// Событие - нажата клавиша Escape
	$('#user-login-form, #user-login-form *').keypress(function(e){
		if(e.keyCode==27 && popupStatus==1) {
			// вызываем функцию закрытия окна
			disablePopup();
		}
		if(e.keyCode==13 && popupStatus==1) {
			// вызываем функцию закрытия окна
			$("#user-login-form").submit();
		}
	});
});