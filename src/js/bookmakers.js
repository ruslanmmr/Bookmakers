$(document).ready(function () {
  filter();
});

//filter
function filter() {
  var checkbox = $('.filter-block__checkbox'),
      label = $('.filter-block__label');

  label.on('click', function() {
    if($(this).children().is(':checked')) {
      $(this).addClass('filter-block__label_checked');
    } else {
      $(this).removeClass('filter-block__label_checked');
    }
  })
}