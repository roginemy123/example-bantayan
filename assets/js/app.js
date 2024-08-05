$(document).ready(function(){
    let loader = $(".loader")
    loader.addClass("d-none");
    // $("article nav ul li a").click(function(){
        // let navbarItems = $("article nav ul li a");
        // let pages = $(".pages")
        // let target = $(this).attr("data-target")
        // navbarItems.filter(".active").removeClass("active");
        // $(this).addClass("active");
        // pages.filter(".active").removeClass("active").addClass("d-none");
        // $(target).removeClass("d-none").addClass("active");
    // });

    $(".rooms .content").click(function(){
        let value = $(this).attr("data-id");
        loader.removeClass("d-none");

        setTimeout(() => {
            window.location.href = "view-room.html?view=" + value;
            loader.addClass("d-none");
        }, 2000);
    })

    $(".eat .content").click(function(){
        let value = $(this).attr("data-id");
        loader.removeClass("d-none");
        setTimeout(() => {
            window.location.href = "view-place.html?view=" + value;
            loader.addClass("d-none");
        }, 2000);
    })

    $(".img-list").click(function(){
        let maxImgContainer = $(".max-image");
        $(".loader").removeClass("d-none")
        setTimeout(() => {
            $(".loader").addClass("d-none")
            if (maxImgContainer.hasClass("d-none")) {
                maxImgContainer.removeClass("d-none")
                $('.max-image img').attr("src", $(this).attr("src"))
            }else{
                maxImgContainer.addClass("d-none")
            }
        }, 1000);
    })

    $(".max-image img").click(function(){
        $(".max-image").addClass("d-none")
    })

});
