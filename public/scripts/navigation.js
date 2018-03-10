$(document).ready(() => {
    const navMenuButton = $('.mobile-menu-image');
    const mobileMenu = $('.nav-items-mobile');

    navMenuButton.on('click', () => {
        mobileMenu.slideToggle('fast');
    });
});