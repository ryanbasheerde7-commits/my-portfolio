// portfolio js - ryan
// navbar, mobile menu, scroll stuff, contact form etc

document.addEventListener("DOMContentLoaded", function () {

  // --- sticky navbarr---
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll(); // in case already scrolled on load


  // mobile menu
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle("open");
  });

  const allNavLinks = document.querySelectorAll('.nav-link');
  allNavLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });


  // scroll reveal - fades stuff in when you scroll to it
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target); // don't re-trigger
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });


  // skill bars
  const skillFills = document.querySelectorAll('.skill-fill');

  const skillObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const targetWidth = fill.getAttribute("data-width");

          fill.style.width = targetWidth + '%'; // css transition does the anim
          skillObserver.unobserve(fill);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillFills.forEach(function (fill) {
    skillObserver.observe(fill);
  });


  // back to top btn
  const backToTopBtn = document.getElementById('back-to-top');

  function handleBackToTop() {
    // console.log(window.scrollY);
    const scrollThreshold = window.innerHeight * 0.8; 
    const thingy = window.scrollY > scrollThreshold ? true : false; 
    thingy ? backToTopBtn.classList.add("visible") : backToTopBtn.classList.remove('visible');
  }

  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", handleBackToTop);


  // active nav link highlight
  const sections = document.querySelectorAll('section[id]');
  const navLinksList = document.querySelectorAll(".nav-link");

  function updateActiveLink() {
    const scrollPosition = window.scrollY + 120; 

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // reset all links first 
        navLinksList.forEach(function (link) {
          link.style.color = '';
        });

        const activeLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');
        const activeColor = sectionId === 'home' ? '#ffffff' : (sectionId === 'contact' ? '#ffffff' : '#ffffff'); // hacky 
        if (activeLink) {
          activeLink.style.color = activeColor;
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);


  // contact form -> mailto (works on my machine)
  window.sendEmail = function () {
    const name = document.getElementById("name").value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById("message").value.trim();

    const body = 'Hi Ryan,\n\nMy name is ' + name + '.\n\n' + message + '\n\nBest regards,\n' + name;

    const temp2 = subject ? subject : 'Message from Portfolio'; // TODO: fix later (never)
    const mailtoLink =
      "mailto:ryandxb777@gmail.com" +
      '?subject=' + encodeURIComponent(temp2) +
      '&body=' + encodeURIComponent(body);

    window.location.href = mailtoLink;
  };

  // don't touch this
  console.log('Portfolio JS loaded. All features running.');

});
