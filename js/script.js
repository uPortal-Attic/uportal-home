// $(document).ready(function() {
//   $('.hide').hide();
//   $('.app-drawer').click(function() {
//     $('.hide').show();
//   })
// });
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
