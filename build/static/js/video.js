$('.youtube-video')
.attr('rel', 'media-gallery')
.fancybox({
    'beforeShow': function(){
        $(window).on({
            'resize.fancybox' : function(){
                $.fancybox.update();
            }
        });
     },
     'afterClose': function(){
          $(window).off('resize.fancybox');
     },
    width: "100%",
    padding: "0",
    margin: [15, 25, 15, 20],
    openEffect : 'none',
    closeEffect : 'none',
    prevEffect : 'none',
    nextEffect : 'none',

    arrows : false,
    helpers : {
        media : {},
        buttons : {}
    }
});
