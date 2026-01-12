// File: `assets/js/lightbox-custom.js`
document.addEventListener('DOMContentLoaded', () => {
    if (typeof GLightbox === 'undefined') {
        console.warn('GLightbox not found. Ensure assets/vendor/glightbox/js/glightbox.min.js is loaded before this file.');
        return;
    }

    const lightbox = GLightbox({
        selector: '.lightbox',
        closeOnOutsideClick: true,
        touchNavigation: true,
        loop: false
    });

    let observer = null;

    lightbox.on('open', () => {
        const container = document.querySelector('.glightbox-container');
        if (!container) return;

        // Attach click handlers to any current images
        const attachClickHandlers = () => {
            document.querySelectorAll('.glightbox-container .gslide img').forEach(img => {
                if (!img.dataset.closeClick) {
                    img.addEventListener('click', () => lightbox.close());
                    img.dataset.closeClick = '1';
                }
            });
        };

        attachClickHandlers();

        observer = new MutationObserver(() => {
            attachClickHandlers();
        });

        observer.observe(container, { childList: true, subtree: true });
    });

    lightbox.on('close', () => {
        if (observer) {
            observer.disconnect();
            observer = null;
        }
    });
});
