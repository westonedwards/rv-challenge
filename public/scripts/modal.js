$(document).ready(() => {
    const staticFilteredData = $('#filtered-data');
    const modal = staticFilteredData.find('.myModal');
    const openButton = '.myBtn';
    const closeButton = '.close';
    const formButtons = '.form-button';

    staticFilteredData.on('click', openButton, function() {
        $(this).parent().parent().parent().find('.myModal').addClass('modal-show');
        $('body').css('overflow', 'hidden');
        $('body').css('position','fixed');
    });

    staticFilteredData.on('click', closeButton, function() {
        $(this).parent().parent().removeClass('modal-show');
        $('body').css('overflow', 'auto');
        $('body').css('position','relative');
    });

    staticFilteredData.on('click', formButtons, (e) => {
        e.preventDefault();
        $(formButtons).toggleClass('form-button-active');
    });
});