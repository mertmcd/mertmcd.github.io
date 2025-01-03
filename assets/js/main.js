/**
* Template Name: Personal - v2.1.0
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
!(function ($) {
  "use strict";

  // Nav Menu
  $(document).on('click', '.nav-menu a, .mobile-nav a', function (e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var hash = this.hash;
      var target = $(hash);
      if (target.length) {
        e.preventDefault();

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if (hash == '#header') {
          $('#header').removeClass('header-top');
          $("section").removeClass('section-show');
          return;
        }

        if (!$('#header').hasClass('header-top')) {
          $('#header').addClass('header-top');
          setTimeout(function () {
            $("section").removeClass('section-show');
            $(hash).addClass('section-show');
          }, 350);
        } else {
          $("section").removeClass('section-show');
          $(hash).addClass('section-show');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }

        return false;

      }
    }
  });

  // Activate/show sections on load with hash links
  if (window.location.hash) {
    var initial_nav = window.location.hash;
    if ($(initial_nav).length) {
      $('#header').addClass('header-top');
      $('.nav-menu .active, .mobile-nav .active').removeClass('active');
      $('.nav-menu, .mobile-nav').find('a[href="' + initial_nav + '"]').parent('li').addClass('active');
      setTimeout(function () {
        $("section").removeClass('section-show');
        $(initial_nav).addClass('section-show');
      }, 350);
    }
  }

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function (e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).click(function (e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Skills section
  $('.skills-content').waypoint(function () {
    $('.progress .progress-bar').each(function () {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      900: {
        items: 3
      }
    }
  });

  // Porfolio isotope and filter
  $(window).on('load', function () {
    

    // email JS init
    emailjs.init("ND9W1vRjSmlAuOcea");

    document.getElementById('contactForm').addEventListener('submit', function (event) {
      event.preventDefault();

      var formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
      };

      document.querySelector('.loading').style.display = 'block';

      document.querySelector('.sent-message').style.display = 'none';
      document.querySelector('.error-message').style.display = 'none';

      emailjs.send('service_bsl6lao', 'template_ys318bk', formData)
        .then(function (response) {
          document.querySelector('.sent-message').style.display = 'block';
          document.querySelector('.loading').style.display = 'none';
        }, function (error) {
          document.querySelector('.error-message').style.display = 'block';
          document.querySelector('.loading').style.display = 'none';
        });
    });


    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    // Select all the coursework toggle buttons
    const toggleButtons = document.querySelectorAll('.coursework-btn');
    const experienceButtons = document.querySelectorAll('.experience-btn');

    toggleButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        // Toggle the parent div's active class to show/hide the coursework
        const parentDiv = button.closest('.coursework-toggle');
        parentDiv.classList.toggle('active');

        // Toggle the button text
        if (parentDiv.classList.contains('active')) {
          button.textContent = 'Hide Coursework';
        } else {
          button.textContent = 'Show Coursework';
        }
      });
    });

    experienceButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        // Toggle the parent div's active class to show/hide the coursework
        const parentDiv = button.closest('.experience-toggle');
        parentDiv.classList.toggle('active');

        // Toggle the button text
        if (parentDiv.classList.contains('active')) {
          button.textContent = 'Hide Experience';
        } else {
          button.textContent = 'Show Experience';
        }
      });
    });

    $('#portfolio-flters li').on('click', function () {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
    });

    const themeToggle = document.querySelector("#theme-toggle");
    const backgroundImg = document.getElementById('backgroundImage');

    const savedTheme = localStorage.getItem("theme") || "light";

    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
      themeToggle.checked = true;
      backgroundImg.src = "assets/img/background/bgdark.jpg";
    } else {
      backgroundImg.src = "assets/img/background/bgwhite.jpg";
    }

    themeToggle.addEventListener("change", () => {
      if (themeToggle.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
        backgroundImg.src = "assets/img/background/bgdark.jpg";
      } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
        backgroundImg.src = "assets/img/background/bgwhite.jpg";
      }
    });

  });

  // Initiate venobox (lightbox feature used in portofilo)
  $(document).ready(function () {
    $('.venobox').venobox();
  });

})(jQuery);