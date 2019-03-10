$(document).ready(function () {
  headerSearch();
  signIn();
  tooltips();
  nav();
  scrolltop();
  navDropdowns();
  lazy();
  floating();
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