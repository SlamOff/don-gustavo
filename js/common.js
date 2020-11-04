// if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
//   $('.viewport').attr('content', 'width=1300');
// }

$(document).ready(function() {
	// remove placeholder after click
	$('input, textarea').focus(function(){
		$(this).data('placeholder',$(this).attr('placeholder'))
		$(this).attr('placeholder','');
	});
	$('input, textarea').blur(function(){
		$(this).attr('placeholder', $(this).data('placeholder'));
	});

	// Product item add to cart
	$('.btn_plus').on('click', function() {
		var input = $(this).siblings('input');
		var current = +input.val();
		var $this = $(this);
		$this.siblings('input').val(current + 1);
		$this.siblings('.btn_minus').removeClass('disabled');
	});

	$('.btn_minus').on('click', function() {
		var input = $(this).siblings('input');
		var current = +input.val();
		if(current > 2) {
			$(this).siblings('input').val(current - 1);
		}
		else {
			$(this).addClass('disabled');
			$(this).siblings('input').val(1);
		}
	});
	$('.btn_main_product').on('click', function() {
		var $this = $(this);
		$this.addClass('invisible');
		$this.closest('.product_item').find('.added_to_cart').addClass('visible');
	});


	

// 	function updater(d, h, m, s) {
// 	  // День сброса - 5 августа 2017 года (и далее каждые три дня)
// 	  var baseTime = new Date(2017, 07, 8);
// 	  // Период сброса — 3 дня
// 	  var period = 2*24*60*60*1000;

// 	  function update() {
// 	    var cur = new Date();
// 	    // сколько осталось миллисекунд
// 	    var diff = period - (cur - baseTime) % period;
// 	    // сколько миллисекунд до конца секунды
// 	    var millis = diff % 1000;
// 	    diff = Math.floor(diff/1000);
// 	    // сколько секунд до конца минуты
// 	    var sec = diff % 60;
// 	    if(sec < 10) sec = "0"+sec;
// 	    diff = Math.floor(diff/60);
// 	    // сколько минут до конца часа
// 	    var min = diff % 60;
// 	    if(min < 10) min = "0"+min;
// 	    diff = Math.floor(diff/60);
// 	    // сколько часов до конца дня
// 	    var hours = diff % 24;
// 	    if(hours < 10) hours = "0"+hours;
// 	    var days = Math.floor(diff / 24);
// 	    d.innerHTML = days;
// 	    h.innerHTML = hours;
// 	    m.innerHTML = min;
// 	    s.innerHTML = sec;
	  
// 	    // следующий раз вызываем себя, когда закончится текущая секунда
// 	    setTimeout(update, millis);
// 	  }
// 	  setTimeout(update, 0);
// 	}
// 	updater(document.getElementById("days"),
// document.getElementById("hours"), document.getElementById("minutes"),
// document.getElementById("seconds"));



	

	$('.scroll').click( function(){
	var scrollEl = $(this).attr('href');
		if ($(scrollEl).length != 0) {
			$('html, body').animate({ scrollTop: $(scrollEl).offset().top }, 800);
		}
		return false;
	});


	//popup
	$('.popup').magnificPopup({
		type: 'inline'
	});
	
	// photo magnific gallery
	$('.photo_popup').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true
		}
	});

	//mask
	jQuery(function($){
		$('.phone').mask('+38(099) 999-9999');
	});

	//slick carousel
	$('.main_slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		nextArrow: '.next',
		prevArrow: '.prev',
		//autoplay: true
		// focusOnSelect: true,
		// appendDots: '.review .nav_slider',
		// customPaging: function(slider, i) {
		// 	return '<div class="dot"></div>';
		// },
		// responsive: [
		// 	{
		// 	breakpoint: 992,
		// 	settings: {
		// 		slidesToShow: 3
		// 	}
		// 	}
		// ]
	});

	/*
	//video player + button
	$('#mainVideo').click(function(){
		if (this.paused) {
			this.play();
			$('#videoButton').fadeOut('fast');
		} else {
			$('#videoButton').fadeIn('fast');
			this.pause();
		}
	});
	$('#videoButton').on('click', function(event) {
		event.preventDefault();
		$('#videoButton').fadeOut('fast');
		$('#mainVideo').get(0).play();
	});
	*/

	/*
	//validation
		var locationURL = window.location.search;
	if ( locationURL == "?p=179&lang=ua" ) {
		var validationName = "Обов'язково для заповнення";
		var validationNameMax = "Від 2 до 16 літер";
		var validationPhone = "Введіть вірний номер";
		var validationEmail = "Введіть вірний E-mail";
	}
	else {
		var validationName = "Обязательно для заполнения";
		var validationNameMax = "От 2 до 16 букв";
		var validationPhone = "Введите корректный номер";
		var validationEmail = "Введите корректный E-mail";
	}


	$('#topForm').validate({
		rules: {
			name: {
				required: true,
				minlength: 2,
				maxlength: 16
			},
			email: {
				required: true,
				email: true
			},
			phone: {
				required: true
			}
		},
		messages: {
			name: {
				required: validationName,
				minlength: validationNameMax,
				maxlength: validationNameMax
			},
			email: {
				required: validationName,
				email: validationEmail
			},
			phone: {
				required: validationPhone
			}
		}
	});

	*/


});
/*
// preloader
$(window).load(function(){
	$('.preloader_inner').fadeOut();
	$('.preloader').delay(100).fadeOut('fast');
});
*/