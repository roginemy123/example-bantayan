$(document).ready(function(){
    let loader = $(".loader")
    $("#preloader").remove();
    // $("article nav ul li a").click(function(){
        // let navbarItems = $("article nav ul li a");
        // let pages = $(".pages")
        // let target = $(this).attr("data-target")
        // navbarItems.filter(".active").removeClass("active");
        // $(this).addClass("active");
        // pages.filter(".active").removeClass("active").addClass("d-none");
        // $(target).removeClass("d-none").addClass("active");
    // });

    $(".hero-container .card").click(function(){
        window.location.href = $(this).attr("data-url")
    })

    // $(".rooms .content").click(function(){
    //     let value = $(this).attr("data-id");
    //     window.location.href = "view-room.html?view=" + value;
    // })

    // $(".eat .content").click(function(){
    //     let value = $(this).attr("data-id");
    //     window.location.href = "view-place.html?view=" + value;
    // })
   
});
