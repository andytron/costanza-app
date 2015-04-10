// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
  if ($(".navbar").offset().top > 100) {
    $(".navbar-custom").addClass("top-nav-collapse");
  } else {
    $(".navbar-custom").removeClass("top-nav-collapse");
  }
});

$(window).scroll(function () {
  $('[id^="scroll-reveal"]').each(function () {
    if ($(this).offset().top > 100) {
      $(this).fadeIn();
    } else {
      $(this).fadeOut();
    }
  });
});

// jQuery for page scrolling feature
$(function() {
  $('a.page-scroll').bind('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
  });
});

// closes the responsive menu on menu item click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});
