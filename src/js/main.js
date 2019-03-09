$(document).ready(function () {
  sliderOffers();
});

//offers-slider
function sliderOffers() {
  var slider = $('.hot-offers-slider'),
      slide = $('.hot-offers-slide'),
      closeButton = $('.tooltip-block__close'),
      tooltip = $('.tooltip_offers'),
      tooltipBlock = $('.tooltip-block'),
      toolLink = $('.hot-offers-slide__link');

      $(document).on('click', function (e) { 
        if (!slide.is(e.target) && !tooltipBlock.is(e.target) && slide.has(e.target).length === 0 && tooltipBlock.has(e.target).length === 0) { 
          slide.removeClass('hot-offers-slide_active');
          slide.removeClass('hot-offers-slide_tooltipsed');
        }
      });
      
      slide.on('click', function(e){
        slide.removeClass('hot-offers-slide_active');
        $(this).addClass('hot-offers-slide_active');
        if(!toolLink.is(e.target)) {
          slide.removeClass('hot-offers-slide_tooltipsed');
          $(this).addClass('hot-offers-slide_active');
        }
      });

      slide.on('mouseenter', function(){
        $(this).addClass('hot-offers-slide_active');
      });
  
      slide.on('mouseleave', function(){
        if($(this).hasClass('hot-offers-slide_tooltipsed')) {}
        else {
          $(this).removeClass('hot-offers-slide_active');
        }
      });
  toolLink.on('click', function(){
    slide.removeClass('hot-offers-slide_tooltipsed');
    $(this).parents('.hot-offers-slide').addClass('hot-offers-slide_tooltipsed');
  })

  closeButton.click(function(event) {
    event.preventDefault();
    tooltip.tooltipster('close');
  });
  $('body').on('click', '.tooltip_offers:not(.tooltipstered)', function(){
    $(this)
        .tooltipster({
          animation: 'fade',
          delay: 200,
          trigger: 'click',
          side:  ['right', 'top'],
          interactive: true,
          contentCloning: true
        })
        .tooltipster('open');
  });
  slider.on('init', function(){
    
  });
  slider.on('beforeChange', function(){
    tooltip.tooltipster('close');
  });
  slider.on('swipe', function(){
    tooltip.tooltipster('close');
  });
  slider.slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    //autoplay: true,
    autoplaySpeed: 3000,
    dots: false,
    arrows: false,
    speed: 800,
    touchThreshold: 10,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
}