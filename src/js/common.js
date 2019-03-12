$(document).ready(function () {
  sliderOffers();
  headerSearch();
  signIn();
  tooltips();
  nav();
  scrolltop();
  navDropdowns();
  lazy();
  floating();
  readmore();
  sort();
});
window.addEventListener('load',
  function () {
    cookies();
  }, false);
$(window).resize(function () {
  innerWidth = $('body').innerWidth();
  floating();
});

//global variables
var innerWidth = $('body').innerWidth();

//cookies
function cookies() {
  var cookiesBlock = $('.cookies-message'),
    cookiesclose = $('.cookies-message__button');
  setTimeout(function () {
    cookiesBlock.fadeIn(300);
  }, 500)
  cookiesclose.on('click', function (event) {
    event.preventDefault();
    cookiesBlock.fadeOut(300);
  })
}
//scrolltop
function scrolltop() {
  var buttonUp = $('.up');

  function check() {
    if ($(window).scrollTop() > 100) {
      buttonUp.fadeIn();
    } else {
      buttonUp.fadeOut();
    }
  }
  check();
  $(window).scroll(function () {
    check();
  });
  buttonUp.click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 800);
  });
}
//header buttons
function headerSearch() {
  var buttonSearchOpen = $('.search-block__button'),
    buttonSearchClose = $('.search-block__close'),
    searchBlock = $('.search-block__container'),
    formBlock = $('.search-block__form'),
    flag;

  $(document).on('click touchstart touchend', function (e) {
    if (!flag) {
      flag = true;
      setTimeout(function () {
        flag = false;
      }, 300);
      if (buttonSearchOpen.is(e.target)) {
        searchBlock.addClass('search-block__container_visible').fadeIn(300);
      } else if (searchBlock.hasClass('search-block__container_visible') && !formBlock.is(e.target) &&
        formBlock.has(e.target).length === 0 || buttonSearchClose.is(e.target)) {
        searchBlock.removeClass('search-block__container_visible').fadeOut(300);
      }
    }
  });
}

function signIn() {
  var buttonSignIn = $('.sign-in__button'),
    blockSignIn = $('.sign-in'),
    containerSignIn = $('.sign-in__container'),
    flag;

  buttonSignIn.on('click mouseenter', function (event) {
    if (!flag) {
      flag = true;
      setTimeout(function () {
        flag = false;
      }, 300);
      if (event.type == 'click') {
        blockSignIn.toggleClass('sign-in_active');
        state();
      } else if (event.type == 'mouseenter') {
        blockSignIn.addClass('sign-in_active');
        state();
      }
    }
    return false;
  })

  blockSignIn.on('mouseleave', function () {
    blockSignIn.removeClass('sign-in_active');
    state();
  })

  $(document).bind('touchstart touchend', function (e) {
    if (blockSignIn.hasClass('sign-in_active') && !blockSignIn.is(e.target) &&
      blockSignIn.has(e.target).length === 0) {
      blockSignIn.removeClass('sign-in_active');
      state();
    }
  });

  function state() {
    if (blockSignIn.hasClass('sign-in_active')) {
      containerSignIn.fadeIn(300);
    } else {
      containerSignIn.fadeOut(300);
    }
  }
}
//tooltips
function tooltips() {
  var tooltip = $('.tooltip'),
    closeButton = $('.tooltip-block__close'),
    button = $('.tooltip');

  closeButton.click(function (event) {
    event.preventDefault();
    tooltip.tooltipster('close');
  });
  button.on('click', function (e) {
    e.preventDefault();
  })

  tooltip.tooltipster({
    animation: 'fade',
    delay: 200,
    trigger: 'click',
    side: ['right', 'left', 'bottom', 'top'],
    interactive: true,
    contentCloning: true
  });
}
//nav
function nav() {
  var navButton = $('.mobile-button, .mobile-nav__close'),
    nav = $('.mobile-nav'),
    overlay = $('.overlay');

  navButton.click(function (event) {
    event.preventDefault();
    nav.toggleClass('mobile-nav_active');
    navState();
  })

  function navState() {
    if (nav.hasClass('mobile-nav_active')) {
      overlay.fadeIn(300);
      scrollLock.hide($("body"));
      $('body').addClass('body_hidden').addClass('body_active')
    } else {
      overlay.fadeOut(300);
      scrollLock.show($("body"));
      $('body').removeClass('body_hidden').removeClass('body_active');
    }
  }
  $(window).resize(function () {
    if (innerWidth > 992) {
      nav.removeClass('mobile-nav_active');
      navState();
    }
  });
  overlay.on('click', function () {
    if (nav.hasClass('mobile-nav_active')) {
      nav.removeClass('mobile-nav_active');
      navState();
    }
  })
}
//nav-dropdowns
function navDropdowns() {
  var dropdownButton = $('.nav__link_dropdown'),
    desktopDropdown = $('.header .nav__dropdown'),
    container = $('.header .nav__item'),
    flag;

  dropdownButton.on('click mouseenter', function (event) {
    if (!flag) {
      flag = true;
      setTimeout(function () {
        flag = false;
      }, 300);
      if (event.type == 'click') {
        $(this).toggleClass('nav__link_active');
        $(this).siblings('.nav__dropdown').toggleClass('nav__dropdown_active');
        if ($(this).hasClass('nav__link_mobile')) {
          $(this).siblings('.nav__dropdown').slideToggle(300);
        } else {
          $(this).siblings('.nav__dropdown').fadeToggle(300);
        }
      } else if (event.type == 'mouseenter') {
        console.log('2');
        $(this).addClass('nav__link_active');
        $(this).siblings('.nav__dropdown').addClass('nav__dropdown_active');
        $(this).siblings('.nav__dropdown').fadeIn(300);
      }
    }
    return false
  })

  container.on('mouseleave', function () {
    dropdownButton.removeClass('nav__link_active');
    desktopDropdown.fadeOut(300).removeClass('nav__dropdown_active');
  })
}

//lazy
function lazy() {
  $(".lazy").Lazy({
    visibleOnly: true,
    threshold: '',
    effect: 'fadeIn',
    effectTime: '300'
  });
}
//плавающие блоки
function floating() {
  var floatingBlock = $('.floating-block');
  if ($('*').is(floatingBlock)) {
    var topPos = floatingBlock.offset().top - 15;
    $(window).scroll(function () {
      if (innerWidth > 992) {
        var top = $(document).scrollTop(),
          pip = $('.join').offset().top,
          height = floatingBlock.height();
        if (top > topPos && top < (pip - 30) - height) {
          floatingBlock.removeClass('floating-block_bottom');
          floatingBlock.addClass('floating-block_fixed').fadeIn();
        } else if (top > (pip - 30) - height) {
          floatingBlock.addClass('floating-block_bottom');
        } else {
          floatingBlock.removeClass('floating-block_fixed');
          floatingBlock.removeClass('floating-block_bottom');
        }
      } else {
        floatingBlock.removeClass('floating-block_fixed').fadeIn();
        floatingBlock.removeClass('floating-block_bottom');
      }
    });
  }
}

//offers-slider
function sliderOffers() {
  var sliderHome = $('.home .hot-offers-slider__container'),
      slider = $('.hot-offers-slider__container'),
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
  slider.on('beforeChange', function(){
    tooltip.tooltipster('close');
  });
  slider.on('swipe', function(){
    tooltip.tooltipster('close');
  });
  //Если на главной и присутствует слайдер первого типа - запускаем его. Если нет - мы не на главной и запускаем слайдер второго типа.
  if($("*").is(sliderHome)) {
    sliderHome.slick({
      slidesToShow: 4,
      slidesToScroll: 4,
      autoplay: true,
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
  } else {
    slider.slick({
      slidesToShow: 5,
      slidesToScroll: 5,
      autoplay: true,
      autoplaySpeed: 3000,
      dots: false,
      arrows: true,
      speed: 800,
      touchThreshold: 10,
      prevArrow: ('.hot-offers-slider__button_prev'),
      nextArrow: ('.hot-offers-slider__button_next'),
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
        ,
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
}
//readmore 
function readmore() {
  var button = $('.read-more-dropdown__button'),
      block = $('.read-more-dropdown__container');
  
  button.on('click', function(e) {
    e.preventDefault();
    $(this).siblings(block).slideToggle(300);
    $(this).toggleClass('read-more-dropdown__button_active');
    if($(this).hasClass('read-more-dropdown__button_active')) {
      $(this).find('span').text('Hide');
    } else {
      $(this).find('span').text('Show more');
    }
  })   
}

//sort
function sort() {
  var sortButton = $('.sort-item__button'),
      dropdown = $('.sort-item__list'),
      sortValue = $('.sort-item__link'),
      sortBlock = $('.sort-item'),
      flag;
  
      $(document).on('click touchstart touchend', function (e) {
        if (!flag) {
          flag = true;
          setTimeout(function () {
            flag = false;
          }, 300);
          if (sortButton.is(e.target)) {
            $(e.target).parent().toggleClass('sort-item_active');
            state();
          } else if (sortValue.is(e.target)) {
            $(e.target).parents('.sort-item').find('.sort-item__button span').text($(e.target).text());
            sortBlock.removeClass('sort-item_active');
            state();
          } else if (sortBlock.hasClass('sort-item_active') && !dropdown.is(e.target) &&
          dropdown.has(e.target).length === 0) {
            sortBlock.removeClass('sort-item_active');
            state();
          }
        }
      });
  
      function state() {
        sortBlock.each(function() {
          if($(this).hasClass('sort-item_active')) {
            $(this).find(dropdown).fadeIn(300);
          } else {
            $(this).find(dropdown).fadeOut(300);
          }
        })
      }
  sortValue.on('click', function(e) {
    e.preventDefault();
  })

}