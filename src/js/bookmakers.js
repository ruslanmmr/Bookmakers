$(document).ready(function () {
  filterPos();
  filter();
});
$(window).resize(function () {
  filterPos();
});
var checkbox = $('.filter-block__checkbox'),
      label = $('.filter-block__label'),
      buttonDropdown = $('.filter-block__dropdown-button'),
      dropdownBlock = $('.filter-block__dropdown-container'),
      filterBlock = $('.filter'),
      filterContainer = $('.filter__container'),
      flag,
      filterToggle = $('.filter__toggle'),
      close = $('.filter-block__close'),
      zIndex = 1;

//filter
function filter() {
  label.on('click', function() {
    if($(this).children().is(':checked')) {
      $(this).addClass('filter-block__label_checked');
    } else {
      $(this).removeClass('filter-block__label_checked');
    }
  })
  buttonDropdown.on('click', function(e) {
    e.preventDefault();
  })
  close.on('click', function(e) {
    e.preventDefault();
  })
  $(document).on('click touchstart touchend', function (e) {
    if (!flag) {
      flag = true;
      setTimeout(function () {
        flag = false;
      }, 300);
      if( buttonDropdown.is(e.target)) {
        $('.filter-block__dropdown-container').removeClass('filter-block__dropdown-container_visible');
        $(e.target).siblings('.filter-block__dropdown-container').addClass('filter-block__dropdown-container_visible');
        zIndex++;
        state();
      }
      else if (dropdownBlock.hasClass('filter-block__dropdown-container_visible') && !dropdownBlock.is(e.target) &&
      dropdownBlock.has(e.target).length === 0 || close.is(e.target)) {
        console.log('click')
        $('.filter-block__dropdown-container').removeClass('filter-block__dropdown-container_visible');
        state();
      }
    }
  });
  filterToggle.on('click', function(e) {
    e.preventDefault();
    filterContainer.toggleClass('filter__container_visible');
    if(filterContainer.hasClass('filter__container_visible')) {
      filterToggle.text('Hide Filters');
      filterContainer.slideDown(300);
    } else {
      filterToggle.text('Show Filters');
      filterContainer.slideUp(300);
    }
  })
  function state() {
    $('.filter-block__dropdown-container').each(function() {
      if($(this).hasClass('filter-block__dropdown-container_visible')) {
        $(this).fadeIn(300);
        $(this).parent().css('z-index', zIndex)
        $(this).find('.filter-block__dropdown-content').niceScroll({
          cursorcolor: '#00247D',
          background:"#E0E8FF",
          cursorwidth: '2px',
          cursorborder: '0',
          cursorborderradius: '2px',
          bouncescroll: false,
          autohidemode: false,
        });
      } else {
        $(this).fadeOut(300);
        setTimeout(function() {
          $(this).parent().css('z-index', '1');
        }, 100)
      }
    })
  }
}
//filterpos
function filterPos() {
  if(innerWidth < 993) {
    filterBlock.prependTo('.catalogue');
    filterContainer.hide();
    filterContainer.removeClass('filter__container_visible')
    filterToggle.text('Show Filters');
  } else {
    filterBlock.prependTo('.aside__container');
    filterContainer.show();
  }
}