'use strict'

// Document ready
$(document).ready(function(){

  // SVG Fallback
  if(!Modernizr.svg) {
    $("img[src*='svg']").attr("src", function() {
      return $(this).attr("src").replace(".svg", ".png");
    });
  };

  // Magnific popup gallery
  $('.gallery').each(function() {
    $(this).magnificPopup({
      delegate: '.gallery-item',
      type: 'image',
      gallery:{
        enabled:true
      },
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function(openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  });

  // Magnific popup one image
  $('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    mainClass: 'mfp-img-mobile',
    image: {
    	verticalFit: true
    }
  });

  // Magnific popup video
  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });

  // Ol list number
  $('ol.list li').each(function(){
    $(this).prepend('<span class="before">' + ($(this).index() + 1) + '</span>');
  });

  // Required form check
  $('.button-check-required').on('click', function(e){
    e.preventDefault();
    $('.form-check-required').each(function(){
      $(this).toggleClass('has-error');
    })
  });

  // Popup
  $('.popup-link').magnificPopup({
    type:'inline',
    midClick: true,
    closeMarkup: '<button title="%title%" type="button" class="mfp-close popup__close"><i class="ion-close-circled"></i></button>'
  });

  $('.popup-link--ajax').magnificPopup({
    type:'ajax',
    midClick: true,
    closeMarkup: '<button title="%title%" type="button" class="mfp-close popup__close"><i class="ion-close-circled"></i></button>'
  });

  // Magnific popup alternative button close - close popup block
  $(document).on('click', '.popup__close', function (e) {
		e.preventDefault();
		$.magnificPopup.close();
	});

  // Autopark selected checkbox
  $('.autopark__select__checkbox').each(function(){
    $(this).on('click', function(){
      $('.autopark__select__checkbox').removeClass('selected');
      $(this).addClass('selected');
    })
  });

  $('.autopark__select__filter').on('click', function(e){
    e.preventDefault();
    $(this).toggleClass('active');
    $('#autopark__select__bottom').toggleClass('active');
  })

  $('.autopark__select__desctop__body li').each(function(){
    $(this).on('click', function(){
      $('.autopark__select__desctop__body li').removeClass('active');
      $(this).addClass('active');
    })
  });

  // order-row
  $('.order-row__button').on('click', function(e){
    e.preventDefault();
    $('#order-row__bottom').toggleClass('active');
    $(this).toggleClass('active');

    if ($(this).find('em').html() == 'Раскрыть фильтр') {
      $(this).find('em').html('Свернуть фильтр')
    } else {
      $(this).find('em').html('Раскрыть фильтр')
    }
  })

  // Styler
  $('select.styler').styler();

  // Main owl carousel
  $('#order-carousel__body').owlCarousel({
    autoplayTimeout: 4000,
    // autoplay: true,
    nav: true,
    dots: false,
    navText: [],
    responsive: {
      0: {
        items: 1,
        center: true,
        loop: true
      },
      1200: {
        items: 3,
        autoWidth: true,
        merge: true,
        center: true,
        loop: true,
        mouseDrag: false,
        touchDrag: false,
        dots: false,
        smartSpeed: 150,
        animateOut: 'slideOutDown',
        animateIn: 'flipInX',
      }
    }
  })

  // Chrome Smooth Scroll
  try {
    $.browserSelector();
    if($("html").hasClass("chrome")) {
        $.smoothScroll();
    }
  } catch(err) {

  };

  // Datepicker
  $('#input-datepicker').data('datepicker')

  // simpleForm version 2015-09-23 14:30 GMT +2
  simpleForm('form.form-callback');
});

$(window).on('load', function() {
  // $(".loader_inner").fadeOut();
  $(".loader").delay(400).fadeOut("slow");
});

/*
version 2015-09-23 14:30 GMT +2
*/
function simpleForm(form, callback) {
  $(document).on('submit', form, function(e){
    e.preventDefault();

    var formData = {};

    var hasFile = false;

    if ($(this).find('[type=file]').length < 1) {
      formData = $(this).serialize();
    }
    else {
      formData = new FormData();
      $(this).find('[name]').each(function(){

        switch($(this).prop('type')) {

          case 'file':
            if ($(this)[0]['files'].length > 0) {
              formData.append($(this).prop('name'), $(this)[0]['files'][0]);
              hasFile = true;
            }
            break;

          case 'radio':
          case 'checkbox':
            if (!$(this).prop('checked')) {
              break;
            }
            formData.append($(this).prop('name'), $(this).val().toString());
            break;

          default:
            formData.append($(this).prop('name'), $(this).val().toString());
            break;
        }
      });
    }

    $.ajax({
      url: $(this).prop('action'),
      data: formData,
      type: 'POST',
      contentType : hasFile ? 'multipart/form-data' : 'application/x-www-form-urlencoded',
      cache       : false,
      processData : false,
      success: function(response) {
        $(form).removeClass('ajax-waiting');
        $(form).html($(response).find(form).html());

        if (typeof callback === 'function') {
          callback(response);
        }
      }
    });

    $(form).addClass('ajax-waiting');

    return false;
  });
}
