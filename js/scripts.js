let animateDuration = 1000;
let animateEasing = "easeInOutExpo";


jQuery(function($) {
    "use strict";
    
    let maxNavHeight = $("#navBar").outerHeight();
    let minNavHeight = getMinNavHeight();

    shiftHeader(maxNavHeight, minNavHeight);
    
    $(window).resize(function() {
        shiftHeader(maxNavHeight, minNavHeight);
    });

    navBarShrink();    

    $(window).scroll(navBarShrink);    

    $("a.scroll").click(function(e) {
        e.preventDefault();
        let target = $(this.hash);
        scrollTo(minNavHeight, target);
    });
    
    $(".navbar-collapse a").click(function() {
        $('.navbar-collapse').collapse('hide');
    });

       
    $('body').scrollspy({
        target: '#navBar',
        offset: maxNavHeight
    });
 
    
    let startPageX;    
    let pressed;
    $("#carousel").on("mousedown", ".carousel-item", function(e) { 
        pressed = true;      
        startPageX = e.pageX;
        return false; 
    });

    $("#carousel").on("mouseup", ".carousel-item", function(e) {
        pressed = false;          
    });

    $("#carousel").on("mousemove", ".carousel-item", function(e) {
        let moveDir = startPageX - e.pageX;   
        
        if (pressed) {
            if (moveDir > 10) {
                $('.carousel').carousel("next");
            }        
            if(moveDir < -10) {
                $('.carousel').carousel("prev");
            }
        }
    });    
});

function getMinNavHeight() {
    let navBarClone = $("#navBar").clone().attr("id", "navBarClone").css("visibility", "hidden");
    navBarClone.appendTo("body"); 
    let minHeight = navBarClone.outerHeight();
    navBarClone.remove();
    return minHeight;
}

function shiftHeader(maxNavHeight, minNavHeight) {    
    if(window.matchMedia('(min-width: 1200px)').matches){
        $(".wrap").css("padding-top", maxNavHeight); 
    } else {
        $(".wrap").css("padding-top", minNavHeight); 
    }     
}

function scrollTo(minNavHeight, target) {
       
    if(target.attr("id") == "home") {
        $('html, body').animate({
            scrollTop: 0
        }, animateDuration, animateEasing);        
    } else {
        $('html, body').animate({
            scrollTop: (target.offset().top - minNavHeight)
        }, animateDuration, animateEasing);        
    }    
}

function navBarShrink() {
    if ($("#navBar").offset().top > 100) {
        $("#navBar").addClass("navbar-shrink");        
    }
    else {
        $("#navBar").removeClass("navbar-shrink");
    }
}

