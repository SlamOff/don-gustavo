$(document).ready(function() {
	// remove placeholder after click
	$('input, textarea').focus(function(){
		$(this).data('placeholder', $(this).attr('placeholder'))
		$(this).attr('placeholder', '');
	});
	$('input, textarea').blur(function(){
		$(this).attr('placeholder', $(this).data('placeholder'));
	});

	function getScroll() {
		return window.pageYOffset || document.documentElement.scrollTop;
	}

	function changeLogoSize() {
		if(getScroll() > 0) {
			$('.logo').addClass('scrolled');
		}
		else {
			$('.logo').removeClass('scrolled');
		}
	}

	// Fixed Header
	$(window).on('scroll', function(){
		changeLogoSize()
	});
	$(window).on('load', function(){
		changeLogoSize();
		setCardPrice();
	});

	// Burger
	$('.phone_icon').on('click', function(){
		var phone = $('.phone_menu');
		if(phone.is(':visible')){
			phone.fadeOut();
		}
		else {
			phone.fadeIn();
		}
	});

	$('.burger').on('click', function(){
		$('body').addClass('fixed');
		$('.mobile_menu_overlay').fadeIn();
	});

	$('.close').on('click', function(){
		$('body').removeClass('fixed');
		$('.mobile_menu_overlay').fadeOut();
	});

	// Price Calc
	function getAddsTotalPrice(){
		return +$('.product_card--adds_price span').text();
	}

	function getProductTotalPrice(){
		return +$('#product_total_price').text();
	}

	function setProductTotalPrice(value) {
		$('#product_total_price').text(+getProductTotalPrice() + value);
	}

	function getArraySum(array){
		var sum = 0;
		for(var i = 0; i < array.length; i++){
			sum += array[i];
		}
		return sum;
	}

	function setCardPrice() {
		var prices = $('.card_total--table_column span.row_price');
		var arr = [];
		prices.each(function() {
			arr.push(+this.textContent);
		});
		//console.log(getArraySum(arr));
		$('#total_price').text(getArraySum(arr));
		$('#totalPrice').text(getArraySum(arr));
	}
	
	function setRowPrice($this, sign){
		var currentPrice = +$this.closest('.card_total--table_item').find('.card_total--table_column span.row_price').text();
		var itemPrice = +$this.closest('.card_total--table_item').find('.card_total--table_column span.item_price').text();
		$this.closest('.card_total--table_item').find('.card_total--table_column span.row_price').text(currentPrice + sign * itemPrice);
	}

	function setCardTotalPrice(value) {
		// var prices = +$('.card_total--table_column span.row_price').text();
		// //console.log(prices);
		// var $this = $('.card_total--table_footer h5 span');
		// $this.text(+$this.text() + value);
	}

	// Product Size Selection
	$('.size_btn').on('click', function(e) {
		e.preventDefault();
		var $this = $(this);
		var sizes = $this.closest('.product_item').data().weight;
		if(sizes.length > 1){
			var weightNode = $this.parent().siblings('.product_item--weight').find('span.weight');
			$this.siblings('span').removeClass('active');
			$this.addClass('active');
			if($this.hasClass('second_size')){
				weightNode.text(sizes[1]);
			}
			else {
				weightNode.text(sizes[0]);
			}
		}
		
	});
	
	$('.product_card--size_btn').on('click', function(){
		var $this = $(this);
		var prices = $this.parent().data().price;
		var diff = prices[1] - prices[0];
		var quantity = $('.product_card--quantity .quantity input').val();
		
		if($this.hasClass('active')){
			return false;
		}
		else {
			$('.product_card--size_btn').removeClass('active');
			$this.addClass('active');
			//$('.product_card--quantity .quantity input').val(1);
			$('#size').val($this.find('.product_size').text());
			$('#weight').val($this.find('.product_weight').text());

			if($this.data().size == 'small'){
				setProductTotalPrice(-diff * quantity);
			}
			else {
				setProductTotalPrice(diff * quantity);
			}
		}

		
	});

	// Additives
	$('.additives_item').on('click', function(){
		var $this = $(this);
		var quantity = +$('.quantity input').val();

		var sumContainer = $('.product_card--adds_price span');
		var currentSum = +sumContainer.text();
		var sum = +$this.data().price;
		var id = $this.data().id;
		var added = 'added';
		var label = $this.find('.label_added');
		if($this.hasClass('added')){
			var localSum = currentSum - sum * quantity;
			console.log(localSum);
			$('.product_card--added_item')[id].classList.remove('shown');
			$this.removeClass(added);
			sumContainer.text(localSum);
			setProductTotalPrice(-sum * quantity);
		}
		else {
			var localSum = currentSum + sum * quantity;
			console.log(localSum);
			$('.product_card--added_item')[id].classList.add('shown');
			$this.addClass(added);
			label.addClass('visible');
			sumContainer.text(localSum);
			setProductTotalPrice(sum * quantity);
			setTimeout(function(){
				label.removeClass('visible');
			}, 2000);
		}
	});

	// Product Card remove additives
	$('.product_card--added_item i').on('click', function(){
		var quantity = +$('.quantity input').val();
		var addsContainer = $('.product_card--adds_price span');
		var addsCurrentPrice = +addsContainer.text();
		var item = $(this).parent();
		var id = item.data().id;
		var currentPrice = +$('.additives_item')[id].dataset.price;
		item.removeClass('shown');
		$('.additives_item')[id].classList.remove('added');
		addsContainer.text(addsCurrentPrice - currentPrice * quantity);
		setProductTotalPrice(-currentPrice * quantity);
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
		input.val(current);
		
		if($(e.target).hasClass('btn_plus_product_card')) {
			$this.siblings('.btn_minus').removeClass('disabled');
			var prices = $('.product_card--size').data().price;
			var addsPrices = [];
			//var currentAdsPrice = +$('.product_card--adds_price span').text();
			$('.additives_item.added').each(function(i, e){
				addsPrices.push(+e.dataset.price);
			});
			
			if($('.product_card--size_btn.active').data().size == 'small'){
				setProductTotalPrice(prices[0] + getAddsTotalPrice());
			}
			else {
				setProductTotalPrice(prices[1] + getAddsTotalPrice());
			}
			$('.product_card--adds_price span').text(getArraySum(addsPrices) * current);
		}
		if($(e.target).hasClass('btn_plus_card')) {
			setRowPrice($(this), 1);
			setCardPrice();
		}
	});

	

	$('.btn_minus').on('click', function(e) {
		var $this = $(this);
		var input = $this.siblings('input');
		var current = +input.val() - 1;
		var addsPrices = [];

		if(current >= 1) {
			input.val(current);
			if($(e.target).hasClass('btn_minus_product_card')) {
				var prices = $('.product_card--size').data().price;
				//var currentAdsPrice = +$('.product_card--adds_price span').text();
				$('.additives_item.added').each(function(i, e){
					addsPrices.push(+e.dataset.price);
				});
				$('.product_card--adds_price span').text(getArraySum(addsPrices) * current);
				if($('.product_card--size_btn.active').data().size == 'small'){
					setProductTotalPrice(-(prices[0] + getAddsTotalPrice()));
				}
				else {
					setProductTotalPrice(-(prices[1] + getAddsTotalPrice()));
				}
			}
		}
		if(current == 1) {
			$this.siblings('input').val(1);
		}
		if(current == 1 && $(e.target).hasClass('btn_minus_product_card')){
			$(this).addClass('disabled');
		}
		if(current < 1) {
			$this.parent().siblings('.btn_main_product').removeClass('invisible');
			$this.closest('.product_item').find('.added_to_cart').removeClass('visible');
		}

		if($(e.target).hasClass('btn_minus_card')) {
			if(current < 1) {
				$this.closest('.card_total--table_item').remove();
			}
			setRowPrice($this, -1);
			setCardPrice();
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

		$.ajax({
			type: form.attr('method'),
			url: form.attr('action'),
			data: form.serialize()
		  }).done(function(serverData) {
			$('.additives_item').removeClass('added');
			form.trigger('reset');
			$('.product_card--adds_price span').text(0);
			$('#product_total_price').text($('.product_card--size').data().price[0]);
			$('.product_card--size_btn').removeClass('active');
			$('.product_card--size_btn')[0].classList.add('active');
			console.log(serverData);
			window.location.href = "/thanks.html";
		  }).fail(function() {
			console.error('Data sending failed');
		  });
	});


	// Card
	$('.card_total .delete').on('click', function(){
		$(this).closest('.card_total--table_item').remove();
		setCardPrice();
	});

	// Card Form Radio Input
	$('.card_form .radio_input').on('change', function(){
		var $this = $(this);
		var subinput = $this.siblings('.subinput');
		$this.closest('.row').find('.radio_input').removeClass('checked');
		$this.addClass('checked');

		if(!$this.hasClass('subradio')){
			if($this.hasClass('checked')){
				$this.closest('.row').find('.subinput').slideUp();
				subinput.slideDown();
			}
		}
		else {
			$this.closest('.row').find('.radio_main').addClass('checked');
		}
	});

	$('.card_total')

	// Card Ajax
	function submitForm(form){
		var form = $(form);
		$('#totalPrice').val($('#product_total_price').text());
		var adds = [];
		$('.product_card--added_item.shown span').each(function(index, el){
			adds.push(el.textContent);
		});
		$('#additivesInput').val(adds);
		
		$('#totalSum').val($('#totalPrice').text() + 'грн');
		console.log(form.serialize());
		//console.log(isFormValid().errorList);
		$.ajax({
			type: form.attr('method'),
			url: form.attr('action'),
			data: form.serialize()
			}).done(function(serverData) {
			$('.additives_item').removeClass('added');
			form.trigger('reset');
			$('.product_card--adds_price span').text(0);
			$('#product_total_price').text($('.product_card--size').data().price[0]);
			$('.product_card--size_btn').removeClass('active');
			$('.product_card--size_btn')[0].classList.add('active');
			console.log(serverData);
			window.location.href = "/thanks.html";
			}).fail(function() {
			console.error('Data sending failed');
		});
	}

	// Validation
	var locationURL = window.location.search;
	if ( locationURL == "?p=179&lang=ua" ) {
		var validationName = "Обов'язково для заповнення";
		var validationNameMax = "Від 2 до 16 літер";
		var validationPhone = "Введіть вірний номер";
		var validationEmail = "Введіть вірний E-mail";
		var validationRadio = "Выберите вариант";
	}
	else {
		var validationName = "Обязательно для заполнения";
		var validationNameMax = "От 2 до 16 букв";
		var validationPhone = "Введите корректный номер";
		var validationEmail = "Введите корректный E-mail";
		var validationRadio = "Выберите вариант";
	}

	$('#cardForm').validate({
		submitHandler: function(form, e) {
			submitForm(form);
		}, 
		rules: {
			name: {
				required: true,
				minlength: 2,
				maxlength: 16
			},
			phone: {
				required: true
			},
			delivery: {
				required: true
			},
			payment: {
				required: true
			},
			street: {
				required: true
			},
			house: {
				required: true
			},
			entrance: {
				required: true
			},
			apartment: {
				required: true
			},
			selfdelivery: {
				required: true
			}
		},
		messages: {
			name: {
				required: validationName,
				minlength: validationNameMax,
				maxlength: validationNameMax
			},
			phone: {
				required: validationPhone
			},
			delivery: {
				required: validationRadio
			},
			payment: {
				required: validationRadio
			},
			street: {
				required: validationName
			},
			house: {
				required: validationName
			},
			entrance: {
				required: validationName
			},
			apartment: {
				required: validationName
			},
			selfdelivery: {
				required: validationRadio
			},
		}
	});

	// scroll to ID
	$('.scroll').click( function(){
	var scrollEl = $(this).attr('href');
		if ($(scrollEl).length != 0) {
			$('html, body').animate({ scrollTop: $(scrollEl).offset().top }, 800);
		}
		return false;
	});

	// mask
	jQuery(function($){
		$('#phone').mask('+38(099) 999-9999');
	});

	// slick carousel
	$('.main_slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		nextArrow: '.next',
		prevArrow: '.prev',
		autoplay: true,
		pauseOnHover: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					dots: true
				}
			}
		]
	});

	$('.often_slider').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		nextArrow: '.next',
		prevArrow: '.prev',
		autoplay: true,
		pauseOnHover: true,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					arrows: false,
					dots: true
				}
			},
			{
				breakpoint: 580,
				settings: {
					slidesToShow: 1,
					arrows: false,
					dots: true
				}
			}
		]
	});

	$('.review_slider').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		nextArrow: '.next',
		prevArrow: '.prev',
		autoplay: true,
		pauseOnHover: true,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 580,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
});