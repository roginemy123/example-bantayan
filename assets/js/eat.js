$(document).ready(function(){
    $(window).on('load', function(){
        let params = new window.URLSearchParams(window.location.search);
        let id = params.get("view");
        $.ajax({
            url: "./assets/json/eat.json",
            method: "GET",
            success: function(response){
                const search = response.filter(function(resp){
                    return resp.id == id;  
                });

                const result = search[0];
                const imgFolder = "assets/img/";
                let count = [];

                $("#name").text(result.name);
                $("#description").text(result.description);
                for (let i = 0; i < result.images.length; i++) {
                    $("#preview-img").append(`<div class='col-lg-4'><img src='${imgFolder + result.images[i]}' class="w-100 h-100 img-list" /></div>`)[i]
                    // $("#preview-img img").eq([i]).attr("src", imgFolder + result.images[i])
                    count = [i + 1];
                }
                $("#googleMap").attr("src", result.googleMap)
                
                if (count == result.images.length) {
                    $(".img-list").click(function(){
                        let maxImgContainer = $(".max-image");
                        if (maxImgContainer.hasClass("d-none")) {
                            maxImgContainer.removeClass("d-none")
                            $('.max-image img').attr("src", $(this).attr("src"))
                        }else{
                            maxImgContainer.addClass("d-none")
                        }
                    })
                }

            }
        })

    });

    $(".max-image img").click(function(){
        $(".max-image").addClass("d-none")
    })

})