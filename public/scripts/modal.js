$(document).ready(() => {
    const modal = $('#myModal');
    const openButton = $('#myBtn');
    const closeButton = $('.close');
    const formButtons = $('.form-button');

    openButton.on('click', () => {
        modal.addClass('modal-show');
        $('body').css('overflow', 'hidden');
    });

    closeButton.on('click', () => {
        modal.removeClass('modal-show');
        $('body').css('overflow', 'auto');
    });

    formButtons.on('click', (e) => {
        e.preventDefault();
        formButtons.toggleClass('form-button-active');
    });
});