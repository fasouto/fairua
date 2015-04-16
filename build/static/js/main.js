$(document).ready(function() {
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

    $(".links").fancybox({
        maxWidth    : 900,
        maxHeight   : 900,
        fitToView   : false,
        width       : '90%',
        height      : '100%',
        autoSize    : false,
        closeClick  : false,
        openEffect  : 'fade',
        closeEffect : 'fade'
    });

    // Helper to push content to bottom
    $('.pull-down').each(function() {
        $(this).css('margin-top', $(this).parent().height()-$(this).height())
    });

    // $("#leaflet-control-layers-group-1 span.leaflet-control-layers-group-name").prepend('<input id="profesionaisChk" type="checkbox" checked="">');

    // $("#profesionaisChk").on("click", function () {
    //     $('#leaflet-control-layers-group-1:input:checkbox').not(this).prop('checked', this.checked);
    // });

});