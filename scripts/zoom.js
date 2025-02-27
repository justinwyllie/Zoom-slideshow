jQuery(window).on('load', function() {

    var $ = window.jQuery;
    var timer;
    var i = 0;
    var runSlideShow = true;
    var slides = $(".fp-slideshow-item");
    var slidesCount = slides.length;

    $(".fp-slideshow").click(function() {
        
        runSlideShow = !runSlideShow;
        if (runSlideShow == false)
        {
            console.log("timer", timer);
            clearInterval(timer);
        }
        else
        {
            slides.removeClass("active");
            i = 0;
            slideShow();
        }
        
    })

    function slideShow()
    {
        
      
        slides.eq(i).addClass("active");

        timer = setInterval(function() {
            slides.eq(i).removeClass("active");
            
            if (i > (slidesCount - 2))
            {
                i = 0;
            }
            else
            {
                i++;
            }
            slides.eq(i).addClass("active");
            
        }, 3000)

    }
    
    slideShow();


});