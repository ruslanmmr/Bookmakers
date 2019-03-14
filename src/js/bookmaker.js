$(document).ready(function () {
  scaleBlock();
  Scroll();
  rate();
});

//шкала
function scaleBlock() {
  var scale = $('.col-percentage__scale'),
  val1, val2, val3;
  
  scale.each(function() {
    val1 = $(this).attr('data-val');
    val2 = parseFloat(val1).toFixed(1);
    val3 = `translateX(-${100 - val2}%)`;
    $(this).css('transform', val3).append('<span>' + val2 + '</span>');
  })
}
//якорные ссылки
function Scroll() {
  var scrollLink = $('.scroll-link');
  scrollLink.click(function (event) {
    var id = $(this).attr('href'),
      top = $(id).offset().top - 10;

    event.preventDefault();

    $('body,html').animate({
      scrollTop: top
    }, 400);

  })
}
//rate
function rate() {
  var star = $('.feedback-form .feedback__rating-item'),
      starsCount = $('.feedback__rating-item_active').length,
      starsCountLatest = $('.feedback__rating-item_active').length,
      rating,
      ratingValue,
      ratingInput = $('.feedback-form-rating__input'),
      valueInd = $('.feedback-form-rating__value'),
      ratingValueLatest = '0.0';
  
  var cStars = function(nowPos) {
    star.removeClass('feedback__rating-item_active');
    for (var i = 0; nowPos + 1 > i; i++) {
      star.eq(i).toggleClass('feedback__rating-item_active');
      starsCount = $('.feedback__rating-item_active').length;
      rating = starsCount * 0.5;
      ratingValue = parseFloat(rating).toFixed(1);
      valueInd.text(ratingValue);
      if(ratingValue > 0) {
        valueInd.addClass('feedback-form-rating__value_active')
      }
    }
  }
  
  // При наведении
  star.on('mouseenter', function() {
    cStars($(this).index());
  });
  
  // При клике
  star.click(function() {
    cStars($(this).index());
    ratingInput.val(ratingValue);
    ratingValue
    starsCountLatest = starsCount;
    ratingValueLatest = ratingValue;
  });

  star.on('mouseleave', function() {
    cStars(+starsCountLatest - 1);
    valueInd.text(ratingValueLatest);
    if(ratingValueLatest <= 0) {
      valueInd.removeClass('feedback-form-rating__value_active');
    }
  });

}