$(document).ready(() => {
    const navMenuButton = $('.mobile-menu-image');
    const mobileMenu = $('.nav-items');

    navMenuButton.on('click', () => {
        mobileMenu.slideToggle();
    });
});