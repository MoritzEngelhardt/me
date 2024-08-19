document.addEventListener('DOMContentLoaded', function() {
    // Navigation Active Link
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    function setActiveLink() {
        let index = sections.length;

        while (--index && window.scrollY + 100 < sections[index].offsetTop) {}

        navLinks.forEach((link) => link.classList.remove('active'));
        navLinks[index].classList.add('active');
    }

    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // Initialize the active link on page load

    // Intersection Observer for Animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-to-animate').forEach(section => {
      observer.observe(section);
    });

    // Mobile Navigation Toggle
    document.getElementById('mobile-nav-button').addEventListener('click', function() {
        const mobileNav = document.getElementById('mobile-nav');
        mobileNav.classList.toggle('open');
    });


    // Smooth Scrolling for Anchor Links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent the default anchor click behavior

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const duration = 1000; // Set the duration for scrolling (e.g., 1000ms)
                smoothScroll(targetElement, duration);
            }
        });
    });
});

function smoothScroll(target, duration) {
    const start = window.scrollY;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startTime = performance.now();

    function scroll() {
        const currentTime = performance.now();
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1); // Ensure the progress does not exceed 1
        const easing = easeInOutQuad(progress);
        window.scrollTo(0, start + (targetPosition-100 - start) * easing);

        if (progress < 1) {
            requestAnimationFrame(scroll);
        }
    }

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    requestAnimationFrame(scroll);
}