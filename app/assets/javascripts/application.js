// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs

//= require jquery
//= require bootstrap-sprockets

//= require_tree .

// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
  if ($(".navbar").offset().top > 100) {
    $(".navbar-custom").addClass("top-nav-collapse");
  } else {
    $(".navbar-custom").removeClass("top-nav-collapse");
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

// closes the responsive menu on menu item click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});
