// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
  if ($(".navbar").offset().top > 100) {
      $(".navbar-fixed-top").addClass("top-nav-collapse");
  } else {
      $(".navbar-fixed-top").removeClass("top-nav-collapse");
  }

  if ($(".content-section").offset().top > 100) {
    $(".content-section").addClass("sticky");
  } else {
    $(".content-section").removeClass("sticky");
  }

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

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

// Sticky
// $(function() {
//   var stickyNavTop = $('.content-section').offset().top - 150;
//
//   var stickyNav = function() {
//     var scrollTop = $(window).scrollTop();
//
//     if (scrollTop >= stickyNavTop) {
//       $('.content-section').addClass('sticky');
//     } else {
//       $('.content-section').removeClass('sticky');
//     }
//   };
//
//   stickyNav();
//
//   $(window).scroll(function() {
//       stickyNav();
//   });
// });
