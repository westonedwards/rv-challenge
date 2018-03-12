$(document).ready(() => {
    $('.filter-results-arrow').on('click', function() {
        $(this).toggleClass('filter-border-bottom-none');
        $('.filter-results').toggleClass('filter-border-bottom-none');
        $('.input-items').slideToggle('fast');
    });
});