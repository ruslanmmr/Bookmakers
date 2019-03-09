$(document).ready(function () {
  headerSearch();
  signIn();
  tooltips();
  nav();
  scrolltop();
  navDropdowns();
});
window.addEventListener('load',
  function () {
    cookies();
  }, false);
$(window).resize(function () {
  innerWidth = $('body').innerWidth();
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
    formBlock = $('.search-block__form');

  $(document).on('click', function (e) {
    if (buttonSearchOpen.is(e.target)) {
      searchBlock.addClass('search-block__container_visible').fadeIn(300);
    } else if (searchBlock.hasClass('search-block__container_visible') && !formBlock.is(e.target) &&
      formBlock.has(e.target).length === 0 || buttonSearchClose.is(e.target)) {
      searchBlock.removeClass('search-block__container_visible').fadeOut(300);
    }
  });
}

function signIn() {
  var buttonSignIn = $('.sign-in__button'),
    blockSignIn = $('.sign-in'),
    containerSignIn = $('.sign-in__container');

  buttonSignIn.on('click, mouseenter', function () {
    if (blockSignIn.hasClass('sign-in_active')) {} else {
      blockSignIn.addClass('sign-in_active');
      state();
    }
  })
  blockSignIn.on('mouseleave', function () {
    blockSignIn.removeClass('sign-in_active');
    state();
  })
  $(document).on('touchstart', function (e) {
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
      desktopDropdown = $('.header .nav__dropdown');

  dropdownButton.on('click', function(){
    $(this).toggleClass('nav__link_active');
    $(this).siblings('.nav__dropdown').toggleClass('nav__dropdown_active');
    if($(this).hasClass('nav__link_mobile')) {
      $(this).siblings('.nav__dropdown').slideToggle(300);
    } else {
      $(this).siblings('.nav__dropdown').fadeToggle(300);
    }
  })

  desktopDropdown.on('mouseleave', function(){
    dropdownButton.removeClass('nav__link_active');
    desktopDropdown.fadeOut(300).removeClass('nav__dropdown_active');
  })
}