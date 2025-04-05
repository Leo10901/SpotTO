window.addEventListener('scroll', function() {
    const nav = document.querySelector('.nav-links');
    const heroSection = document.querySelector('.hero-section');
    const heroHeight = heroSection.offsetHeight;

          
    if (window.scrollY > heroHeight - 100) {
        // Past hero section - change to black
        nav.querySelectorAll('a').forEach(link => {
            link.style.color = 'black';
        });
    } else {
        // On hero section - keep white
        nav.querySelectorAll('a').forEach(link => {
            link.style.color = 'white';
        });
    }
});