function include(url){document.write('<script type="text/javascript" src="'+url+'"></script>')}

//------ base included scripts -------//
    include('js/jquery.mousewheel.min.js');
    include('js/jquery.easing.1.3.js');
//------------------------------------//
    include('js/spin.min.js');
    include('js/jquery.touchSwipe.min.js');
    include('js/galleryPrototype5.js');
    if(!FJSCore.mobile){
        include('js/tmMultimediaGallery.js');
    }

    if(FJSCore.mobile){
        //------ photoswipe scripts -------//
        include('js/klass.min.js');
        include('js/code.photoswipe.jquery-3.0.5.js'); 
    }

    var
        isSplash = true
    ,   viewState = 0
    ,   currMenuItem = 0
    ,   parsedArray = []
    ,   alignArray = []
    ,   linkArray = []
    ,   newMinHeight = 0
    ,   defaultMinHeight = 0
    ,   menuDelay = 0
    ,   contentDelay = 0
    ,   primaryDelay = 0

    ,   $fullGallery
    ,   currentIndex = 0
    ,   win = $(window)
    ,   doc = $(document)
    ,   previousState = currentState = ''
    ,   msie = (navigator.appVersion.indexOf("MSIE")!==-1)
    ,   f_scr = 0
    ;

function spinnerInit(){    
    var opts = {
        lines: 11,
        length: 10,
        width: 5,
        radius: 14, 
        corners: 1,
        color: '#fff',
        speed: 1.3,
        trail: 5
    },
    spinner = new Spinner(opts).spin($('#webSiteLoader')[0]);
}
function initPluginsPages(){
    (!FJSCore.mobile && previousState && (FJSCore.state != previousState))&&($('.history-back').attr('href','./'+previousState));
}

function toggleFullScreen() {
   if (!document.fullscreenElement &&    // alternative standard method
    !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
    $('.fullscr-btn').find('.ic1').css({'display':'none'});
    $('.fullscr-btn').find('.ic2').css({'display':'block'});
    setTimeout(function(){
            f_scr = 1;
    }, 300);

     if (document.documentElement.requestFullscreen) {
       document.documentElement.requestFullscreen();
     } else if (document.documentElement.mozRequestFullScreen) {
       document.documentElement.mozRequestFullScreen();
     } else if (document.documentElement.webkitRequestFullscreen) {
       document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
     }
   } else {
    $('.fullscr-btn').find('.ic1').css({'display':'block'});
    $('.fullscr-btn').find('.ic2').css({'display':'none'});
    f_scr = 0;
      if (document.cancelFullScreen) {
         document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
         document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
   }
}


function initFullGallery(){

    $fullGallery = $("#galleryHolder"); 
    $fullGallery.tmMultimediaGallery({
        container: '.galleryContainer',
        resizableContainer: true,
        animationSpeed: '1.2',
        autoPlayState: false,
        paginationDisplay: true,
        controlDisplay: true,
        autoPlayTime: 12,
        alignIMG: 'center',
        mobile: FJSCore.tablet,
        imageHolder: '#imageHolder', // imageHolder selector
        pagination: '#inner', // pagination selector
        outerPagination: false, // outer pagination
        description: '#galleryDescription', // description selector
        next: '#nextButton', // next button selector
        prev: '#prevButton', // prev button selector
        spinner: '#imgSpinner', // prev button selector
        startIndex: currentIndex,
        onShowActions: function(){
            // $('body').addClass('galleryOpen');
        },
        onHideActions: function(){
            // $('body').removeClass('galleryOpen')
        }
    })

    win.trigger('scrollEnable', 'false');
   

    $('.closeIconGallery').on('click', function(){
        $('#gallery-full').removeClass('openFull');
        $fullGallery && $fullGallery.trigger('hideGallery');
       // $('body').removeClass('galleryOpen');

       setTimeout(function(){
            $('body').removeClass('galleryOpen');
        }, 900);

        win.trigger('scrollEnable', 'true');

        if (document.cancelFullScreen) {
             document.cancelFullScreen();
          } else if (document.mozCancelFullScreen) {
             document.mozCancelFullScreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }

    });

    spinnerInit();

    $('.splash a').on('click', function(){
        return false;
    });

    $('.fullscr-btn').on('click', function(){
        toggleFullScreen();
    });

    if(msie==true){

        setTimeout(function(){ $('.fullscr-btn').css({'display':'none'}); }, 600)
    }
}

$(document).on('changeLocation',function (e){
    previousState = currentState;
    currentState = history.state;
})

$(function(){

    $("#year").text((new Date).getFullYear());

    previousState = currentState = history.state;

    if(FJSCore.mobile){
        //$('body').css({"min-height":"inherit"});

        //$('#mobile-navigation > option').eq(0).remove();
        //$('h1 > a').attr({"href":"mobilefolioPage.html"});
        $('#mobile-navigation > option').eq(3).attr({"value":"./mobilefolioPage.html"});
        $('#mobile-footer > .copyright').eq(1).css({'display':'none'});

    }

   // defaultMinHeight = $('body').css('min-height');

     $('#mainNav>ul>li>a').each(function(){
        var $this = $(this),
            txt = $this.find(".name").text();
        $this.find(".plane1").html(txt);
    })
    

    var opts1 = {
        lines: 11, 
        length: 0, 
        width: 12, 
        radius: 24, 
        corners: 1, 
        rotate: 0, 
        direction: 1, 
        color: '#fff', 
        speed: 1.6, 
        trail: 60, 
        shadow: false, 
        hwaccel: false, 
        className: 'spinner', 
        zIndex: 2e9, 
        top: 'auto', 
        left: 'auto' 
    };
    var opts2 = {
        lines: 9, 
        length: 0, 
        width: 14, 
        radius: 20, 
        corners: 1, 
        rotate: 0, 
        direction: 1, 
        color: '#fff', 
        speed: 1.6, 
        trail: 60, 
        shadow: true, 
        hwaccel: false, 
        className: 'spinner', 
        zIndex: 2e9, 
        top: 'auto', 
        left: 'auto' 
    };
    
    webSiteSpinner = new Spinner(opts1).spin($('#webSiteLoader > span')[0]);
    ajaxSpinner = new Spinner(opts2).spin($('#ajax-overlay > div')[0]);

    $('#content_pages') 
        .on('show','>*',function(e,d){
            
            switch (viewState){
                case 0:
                   /* showhideSplash('hide');
                    contentDelay = 1000;*/
                break;
                case 1:
                    showhideGallery('hide');
                    contentDelay = 1000;
                break;
                case 2:
                    contentDelay = 0;
                break;
            }

            initFullGallery();

            initPluginsPages();

            viewState = 2;
            $.when(d.elements)
                .then(function(){
                    d.curr.addClass('_active');
                    d.curr.css({display:'block', left: -$(window).width()})

                    setTimeout(function(){ $(window).trigger('resize'); }, 200)
                    
                    d.curr.stop().delay(contentDelay)
                        .animate({
                            left: 0
                        }, 1000, "easeOutExpo", function(){
                            //$(window).trigger('resize');
                        })
                })          
        })
        .on('hide','>*',function(e,d){ 
        $(this).removeClass('_active');  
            $(this)
                .stop()
                .animate({
                    left: $(window).width()
                }, 800, "easeInCubic", function(){
                    $(this).css({display:'none'});
                })
        })
        ///////////////////////////   category_pages   /////////////////////////////////////////
        $('#category_pages')
            .on('show','>*',function(e,d){
                viewState = 1;
                /*showhideSplash('hide');*/
                setTimeout(function(){
                    showhideGallery('show');
                }, 500);
                
                $.when(d.elements)
                    .then(function(){
                        parsedArray = [];
                        alignArray = [];
                        linkArray = [];

                        $('ul > li',d.curr).each(
                            function(){
                                parsedArray.push($(this).attr('data-preview'));
                                alignArray.push($(this).attr('data-align'));
                                linkArray.push($(this).attr('data-link'));
                            }
                        )
                        $('#galleryPrototype5').trigger('reBuild', {'name':$("[data-categoty]", d.curr).attr('data-categoty'), 'urlArray':parsedArray, 'alignArray':alignArray, 'linkArray':linkArray});
                    })          
            })
            .on('hide','>*',function(e,d){})

            $(FJSCore).on('changeState',function(){
                if(FJSCore.state==""){
                    if(viewState==1){
                        showhideGallery('hide');
                    }
                    viewState = 0;
                    /*setTimeout(function(){
                        showhideSplash('show');
                    } , 500);*/
                }
            }
        )

        FJSCore.modules.responsiveContainer({
            elementsSelector: '#content_pages > div'
        ,   activePageSelector: '._active'
        ,   affectSelectors: 'footer'
        //,   affectSelectors: 'header, footer'
        });

        

        ////////////////////////////////////////////////////////////////////////
        $(document)
            .on('show','#mobile-content>*',function(e,d){
                $('.closeBtn').attr({"href":"./aboutPage.html"});                   

                var phSwipe = $(".photoSwipe1>li>a");
                phSwipe.length && phSwipe.photoSwipe({jQueryMobileDialogHash: false});
                phSwipe.on("click",function(){
                    return false;
                })

                setTimeout(function(){ $(window).trigger('resize'); }, 600);

            })              
            .on('hide','#mobile-content>*',function(e,d){}) 

        $(window).on('resize', onResize);	

        $(".currYear").text((new Date).getFullYear());
})
/*---------------------- end ready -------------------------------*/

        function showhideGallery(state){
            switch(state){
                case 'show':
                    
                    $('.galleryHolder').css({display:'block', left:-$(window).width(), 'z-index':3}).animate({left:0}, 800, "easeOutExpo");
                    $(window).trigger('resize');
                    currentIndex = 0;
                break;
                case 'hide':
                    $('.galleryHolder').animate({left: $(window).width()}, 500, "easeInCubic", function(){ $(this).css({display:'none', 'z-index':1}); });
                break;
            }   
        }

/*---------------------- events ----------------------------------*/
function onResize(e){

    if(!FJSCore.mobile){
        switch(viewState){
            case 0:
               // $('body').trigger('updateDeltaHeight', $('.splashHolder').height().toString());
            break;
            case 1:
                $('body').trigger('updateDeltaHeight', $('.galleryHolder').height().toString());
            break;
            case 2:
                $('body').trigger('updateDeltaHeight', '0');
            break;
        }

        if(f_scr == 1){
            $('.fullscr-btn').find('.ic1').css({'display':'block'});
            $('.fullscr-btn').find('.ic2').css({'display':'none'});
        }

    }
}

$(window).load(function(){  
    $("#webSiteLoader").fadeOut(500, 0, function(){
        $("#webSiteLoader").remove();
    });
    


    function primaryShow(){
        primaryDelay = 900;
        $('header h1').css({top:-400}).stop().delay(primaryDelay).animate({top:0}, 800, "easeOutExpo");

        setTimeout(function(){
            $('#mainNav').addClass('showed');
        }, primaryDelay+=100);


        primaryDelay1=200;
        $('#mainNav ul li').each(
            function(index){
                $(this).css({top:-1200}).stop().delay(primaryDelay1+(index*100)).animate({top:0}, 1200, "easeOutCubic"); 
            }
        )

        $('footer .followList').css({left: $(window).width()}).stop().delay(primaryDelay+=200).animate({left: 0}, 800, "easeOutExpo");
        $('footer .copyright').css({left: $(window).width()}).stop().delay(primaryDelay+=200).animate({left: 0}, 800, "easeOutExpo");
    }
    
    if(!FJSCore.mobile){
        primaryShow();

        $("#galleryPrototype5").galleryPrototype5({});

        $('#mainHolder .closeItem').html('back to gallery');
        $('#mainHolder .closeItem').on("click", function(){
            $('header h1 a').click();
        })

    }else{
        //----- mobile scripts ------//
        $('#mobile-header>*').wrapAll('<div class="container"></div>');
        $('#mobile-footer>*').wrapAll('<div class="container"></div>');
    }
});


