var up = up || {};

$(document).ready(function() {
    $('.app-drawer').toggle(
        function() {
            $('.arrow-box').slideDown("fast");
        },
        function() {
            $('.arrow').slideUp("fast");
        }
    );
    
});
