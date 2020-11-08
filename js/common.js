// if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
//   $('.viewport').attr('content', 'width=1300');
// }

$(document).ready(function() {
	// remove placeholder after click
	$('input, textarea').focus(function(){
		$(this).data('placeholder', $(this).attr('placeholder'))
		$(this).attr('placeholder', '');
	});
	$('input, textarea').blur(function(){
		$(this).attr('placeholder', $(this).data('placeholder'));
	});

	function getAddsTotalPrice(){
		return +$('.product_card--adds_price span').text();
	}

	function getProductTotalPrice(){
		return +$('#product_total_price').text();
	}

	function setProductTotalPrice(value) {
		//console.log(value);
		$('#product_total_price').text(+getProductTotalPrice() + value);
	}

	// Product Size Selection
	$('.product_card--size_btn').on('click', function(){
		var $this = $(this);
		var prices = $this.parent().data().price;
		var totalPriceContainer = $('#product_total_price');
		//var currentSum = +totalPriceContainer.text();
		//var diff = prices[1] - prices[0];
		
		if($this.hasClass('active')){
			return false;
		}
		else {
			$('.product_card--size_btn').removeClass('active');
			$this.addClass('active');
			$('.product_card--quantity .quantity input').val(1);
			//setProductTotalPrice(1);
			//totalPriceContainer.text(1);

			$('#size').val($this.find('.product_size').text());
			$('#weight').val($this.find('.product_weight').text());

			$('.product_card--added_item').removeClass('shown');
			$('.additives_item').removeClass('added');
			$('.product_card--adds_price span').text(0);

			if($this.data().size == 'small'){
				totalPriceContainer.text(prices[0]);
			}
			else {
				totalPriceContainer.text(prices[1]);
			}
		}

		
	});

	// Additives
	$('.additives_item').on('click', function(){
		var $this = $(this);
		var sumContainer = $('.product_card--adds_price span');
		//var currentTotalPrice = +totalPriceContainer.text();
		var currentSum = +sumContainer.text();
		var sum = +$this.data().price;
		var id = $this.data().id;
		//console.log(id);
		
		var added = 'added';
		var label = $this.find('.label_added');
		if($this.hasClass('added')){
			console.log('Убрали добавку');
			//console.log(currentSum);
			//console.log(sum);
			//console.log(getAddsTotalPrice());
			var localSum = currentSum - sum;
			$('.product_card--added_item')[id].classList.remove('shown');
			$this.removeClass(added);
			sumContainer.text(localSum);
			console.log(-sum);

			setProductTotalPrice(-sum);
		}
		else {
			console.log('Добавили добавку');
			var localSum = currentSum + sum;
			$('.product_card--added_item')[id].classList.add('shown');
			$this.addClass(added);
			label.addClass('visible');
			sumContainer.text(localSum);
			//console.log(getProductTotalPrice());
			console.log(getAddsTotalPrice());
			setProductTotalPrice(sum);
			setTimeout(function(){
				label.removeClass('visible');
			}, 2000);
		}
	});

	// Product Card remove additives
	$('.product_card--added_item i').on('click', function(){
		var item = $(this).parent();
		var id = item.data().id
		item.removeClass('shown');
		$('.additives_item')[id].classList.remove('added');
	});

	// Custom Select
	$('.product_card--promo_dropdown').on('click', function(e){
		var $this = $(this);
		var title = $this.find(('.product_card--promo_value'));
		var list = $(this).find('.product_card--promo_list');
		function slideUpFunc() {
			$this.find('.product_card--promo_list').slideUp(500, function(){
				$this.removeClass('opened');
			});
		}
		if (e.target.classList.contains('product_card--promo_value') || e.target.classList.contains('arrow')) {
			if(list.is(':visible')){
				slideUpFunc();
			}
			else {
				$this.addClass('opened');
				$this.find('.product_card--promo_list').slideDown(500);
			}
		}
		else {
			var value = e.target.textContent;
			title.text(value);
			$('#promo').val(value);
			slideUpFunc();
		}
	});

	// Product item add to cart
	$('.btn_plus').on('click', function(e) {
		var input = $(this).siblings('input');
		var current = +input.val() + 1;
		var $this = $(this);
		//console.log(current);
		input.val(current);
		//console.log(current);
		$this.siblings('.btn_minus').removeClass('disabled');
		if($(e.target).hasClass('btn_plus_product_card')) {
			var prices = $('.product_card--size').data().price;
			if($('.product_card--size_btn.active').data().size == 'small'){
				setProductTotalPrice(prices[0] + getAddsTotalPrice());
			}
			else {
				setProductTotalPrice(prices[1] + getAddsTotalPrice());
			}
		}
	});

	$('.btn_minus').on('click', function(e) {
		var input = $(this).siblings('input');
		var current = +input.val() - 1;
		if(current >= 1) {
			input.val(current);
			if($(e.target).hasClass('btn_minus_product_card')) {
				var prices = $('.product_card--size').data().price;
				if($('.product_card--size_btn.active').data().size == 'small'){
					setProductTotalPrice(-(prices[0] + getAddsTotalPrice()));
				}
				else {
					setProductTotalPrice(-(prices[1] + getAddsTotalPrice()));
				}
			}
		}
		if(current == 1) {
			console.log(current);
			$(this).addClass('disabled');
			$(this).siblings('input').val(1);
		}
	});
	$('.btn_main_product').on('click', function() {
		var $this = $(this);
		$this.addClass('invisible');
		$this.closest('.product_item').find('.added_to_cart').addClass('visible');
	});

	$('#productForm').on('submit', function(e){
		e.preventDefault();
		var form = $(this);
		$('#totalPrice').val($('#product_total_price').text());
		var adds = [];
		$('.product_card--added_item.shown span').each(function(index, el){
			adds.push(el.textContent);
		});
		$('#additivesInput').val(adds);
		///////////////////////////////////////
		// $('.additives_item').removeClass('added');
		// form.trigger("reset");
		// $('.product_card--adds_price span').text(0);
		// $('#product_total_price').text($('.product_card--size').data().price[0]);
		
		// $('.product_card--size_btn').removeClass('active');
		// $('.product_card--size_btn')[0].classList.add('active');
		//window.location.href = "/thanks.html";
		////////////////////////////////////////
		$.ajax({
			type: form.attr('method'),
			url: form.attr('action'),
			data: form.serialize()
		  }).done(function(serverData) { // в случае успеха
			$('.additives_item').removeClass('added'); // я очищаю все добавки
			form.trigger('reset'); // резетну форму
			$('.product_card--adds_price span').text(0);
			$('#product_total_price').text($('.product_card--size').data().price[0]);
			$('.product_card--size_btn').removeClass('active');
			$('.product_card--size_btn')[0].classList.add('active');
			console.log(serverData); // твой ответ от сервера. Передай мне его тоже в json
									 // тут по ходу будут данные для корзины (общая сумма, айди товара и прочая хуйня)
									 // и тут же я буду делать редирект на страницу благодарности что-то типа такого:
									 window.location.href = "/thanks.html";
									 // но мне надо знать на каком языке мы находимся, чтоб переправлять на нужную страницу благодарности
		  }).fail(function() {
			console.error('Data sending failed');
		  });
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



	
	// scroll to ID
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