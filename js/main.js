$(function() {
    var swiper = new Swiper('.swiper-container__home-header', {
        loop: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        speed: 300
    });

    var swiper = new Swiper('.swiper-container-custom', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        initialSlide: 1,
        slidesPerView: 3,
        centeredSlides: true,
        spaceBetween: 30,
        grabCursor: true,
        breakpoints: {
            // when window width is <= 768px
            768: {
              slidesPerView: 1
            }
        }
    });

    // Remove click delay with fastclick
    FastClick.attach(document.body);

    //add and remove fixed class from header when scroll
    $(window).scroll(function() {    
        var scroll = $(window).scrollTop();
    
        if (scroll >= 225) {
            $(".header").addClass("fixed");
        } else {
            $(".header").removeClass("fixed");
        }
    });

    //product popup
    $('.product-item-wrapper').each(function(){
        $(this).magnificPopup({
            delegate: 'a', // child items selector, by clicking on it popup will open
            type: 'image',
            gallery: {
                enabled: true
            },
            mainClass: 'mfp-with-zoom', // this class is for CSS animation below
            zoom: {
            enabled: true, // By default it's false, so don't forget to enable it
        
            duration: 300, // duration of the effect, in milliseconds
            easing: 'ease-in-out', // CSS transition easing function
        
            // The "opener" function should return the element from which popup will be zoomed in
            // and to which popup will be scaled down
            // By defailt it looks for an image tag:
            opener: function(openerElement) {
                // openerElement is the element on which popup was initialized, in this case its <a> tag
                // you don't need to add "opener" option if this code matches your needs, it's defailt one.
                return openerElement.is('img') ? openerElement : openerElement.find('img');
            }
            }
        });
    })

    //show beer info in beer-all.html
    $(".product-text span").click(function(){
        $(this).hide();
        $(this).parent().next().slideToggle();
    });
    //hide it
    $(".more-info .hide-beer-info").click(function(){
        $(this).parent().slideToggle();
        $(this).parent().siblings(".product-text").children("span").show();
    });

    // Modernizer functions
    $(window).on('load resize', function(){
        order();
    });


    var _headerInfo = $('.header-info');
    var _navigationBox = $('.nav-wrapper');
     function order(){
        var isMobile = Modernizr.mq('(max-width: 768px)');
        if(isMobile){
            //move header info from top to side menu
            _headerInfo.detach();
            _navigationBox.append(_headerInfo);
            //////////////////////
        }else{
            $('.home-header').prepend(_headerInfo);
        }
     }

     // Open side menu
     $('.menu-icon').click(function(){
        // _navigationBox.toggle();
        _navigationBox.css({'right':'-300px'});
        _navigationBox.toggle();
        _navigationBox.animate({'right':'0'},400);
     })

     var _closeMobileMenu = function(){
        _navigationBox.animate(
            {'right':'-300px'},
            400,
            function(){
                $(this).css({'display':'none', 'right':'0px'});
            }
        );
     }

    // close side menu if user click outside of menu container
     $(document).click(function(e){
        if (!_navigationBox.is(e.target) && !$('.menu-icon').is(e.target) && _navigationBox.has(e.target).length === 0 && $(window).width() < 768){
            _closeMobileMenu();
        };
     })
     // or close icon
     $('.close-icon').click(function(){
        _closeMobileMenu();
     })
});