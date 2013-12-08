// Generated by CoffeeScript 1.6.3
var search, setRelatedDOMVisibility;

$(document).on('emoji:ready', function() {
  if (location.hash.length) {
    return search($('.speedy-filter').val(location.hash.substr(1)).val());
  } else {
    return search();
  }
});

search = function(keyword) {
  var reg;
  if (keyword == null) {
    keyword = '';
  }
  $('.keyword').text(keyword);
  if (window.speedy_keyword !== keyword) {
    window.speedy_keyword = keyword;
    if (keyword.length) {
      reg = new RegExp($.trim(keyword), 'i');
      $('.result').hide();
      $('.result').each(function() {
        if (reg.test($(this).text())) {
          return $(this).show();
        }
      });
    } else {
      $('.result').show();
    }
  }
  return setRelatedDOMVisibility(keyword);
};

setRelatedDOMVisibility = function(keyword) {
  var foundSomething;
  foundSomething = !!$('.result:visible').length;
  $('.js-queue-all').toggle(!!keyword.length && foundSomething);
  return $('.no-result').toggle(!foundSomething);
};

$(document).on('search keyup', '.speedy-filter', function() {
  search($(this).val());
  return location.hash = $(this).val();
});

$(document).on('click', '.group', function() {
  return search($('.speedy-filter').val($(this).attr('href').substr(1)).val());
});

$(document).on('click', '.speedy-remover', function() {
  $('.speedy-filter').val('');
  $('.result').show();
  return search((location.hash = ''));
});

window.onhashchange = function() {
  search($('.speedy-filter').val(location.hash.substr(1)).val());
  $('[href^="#"]').removeClass('active');
  return $("[href=" + location.hash + "]").addClass('active');
};
