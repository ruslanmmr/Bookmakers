$(document).ready(function () {
  scaleBlock();
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