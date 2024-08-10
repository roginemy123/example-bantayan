$(document).ready(function () {
  let prices = [
    [1000, 2000],
    [2500, 4001],
    [4001, 10000],
  ];

  let budgets = [
    [500, 2500],
    [1501, 3000],
    [3000, 5000],
  ];

  let persons = [
    [2, 3],
    [4, 7],
    [8, 10000],
  ];

  let params = new window.URLSearchParams(window.location.search);
  let id = params.get("view");
  $.ajax({
    url: "./assets/json/rooms.json",
    method: "GET",
    success: function (response) {
      // Filter to find the specific room by ID
      const search = response.filter(function (resp) {
        return resp.id == id;
      });

      if (search.length > 0) {
        const result = search[0];
        const imgFolder = "assets/img/";

        // Update room details
        $("#name").text(result.name);
        $("#description").text(result.description);
        $("#address").text(result.address);
        $("#phone").text(result.phone);
        $("#mobile").text(result.mobile);

        // Append images to the preview container
        result.images.forEach(function (image) {
          $("#preview-img").append(
            `<div class='col-lg-4'><img src='${
              imgFolder + image
            }' class="w-100 h-100 img-list" /></div>`
          );
        });

        // Set the Google Map source
        $("#googleMap").attr("src", result.googleMap);

        // Image click event to display the large image
        $(".img-list").click(function () {
          let maxImgContainer = $(".max-image");
          if (maxImgContainer.hasClass("d-none")) {
            maxImgContainer.removeClass("d-none");
            $(".max-image img").attr("src", $(this).attr("src"));
          } else {
            maxImgContainer.addClass("d-none");
          }
        });
      }

      // Populate the room list if the room list exists
      if (response.length > 0) {
        $("#no-record").addClass("d-none");
        response.forEach(function (room) {
          $("#room-list").append(
            `
                    <div class="col-sm-12 col-md-6 col-lg-4 content" data-id="${room.id}"> 
                        <div class="card position-relative">
                            <img src="assets/img/${room.frontImg}" alt="img" class="w-100">
                            <div class="content-img-bottom p-3 w-100">
                                <div>
                                    <h5 class="text-light">${room.name}</h5>
                                    <p class="text-light mb-0">${room.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
          );
        });

        // Click event to redirect to the detailed view
        $("#room-list .content").click(function () {
          let value = $(this).attr("data-id");
          window.location.href = "view-room.html?view=" + value;
        });

        $("#count").text(response.length);
      } else {
        $("#no-record").removeClass("d-none");
      }
    },
    error: function (xhr, status, error) {
      console.error("AJAX request failed:", status, error);
    },
  });

  $("#filter-type a").click(function () {
    let value = $(this).attr("data-type");

    let filterAnchor = $("#filter-type a");
    filterAnchor.filter(".active").removeClass("active");
    $(this).addClass("active");

    // Remove existing content elements
    if ($("#room-list .content").length) {
      $("#room-list .content").remove();
    }

    $.ajax({
      url: "./assets/json/rooms.json",
      method: "GET",
      success: function (response) {
        let matchingRooms = response.filter(function (room) {
          return room.type == value;
        });

        if (matchingRooms.length > 0) {
          $("#no-record").addClass("d-none");
          matchingRooms.forEach(function (room) {
            $("#room-list").append(`
                        <div class="col-sm-12 col-md-6 col-lg-4 content" data-id="${room.id}"> 
                            <div class="card position-relative">
                                <img src="assets/img/${room.frontImg}" alt="img" class="w-100">
                                <div class="content-img-bottom p-3 w-100">
                                    <div>
                                        <h5 class="text-light">${room.name}</h5>
                                        <p class="text-light mb-0">${room.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `);
          });

          // Add click event to the newly created elements
          $("#room-list .content").click(function () {
            let roomId = $(this).attr("data-id");
            window.location.href = "view-room.html?view=" + roomId;
          });

          
        } else {
          $("#no-record").removeClass("d-none");
        }

        $("#count").text(matchingRooms.length);
      },
      error: function (xhr, status, error) {
        console.error("AJAX request failed:", status, error);
      },
    });
  });

  $("#filter-price").change(function () {
    let price = prices[$(this).val()];

    // Remove existing content elements
    if ($("#room-list .content").length) {
      $("#room-list .content").remove();
    }

    $.ajax({
      url: "./assets/json/rooms.json",
      method: "GET",
      success: function (response) {
        let matchingRooms = response.filter(function (room) {
          return room.price >= price[0] && room.price <= price[1];
        });

        if (matchingRooms.length > 0) {
          $("#no-record").addClass("d-none");
          matchingRooms.forEach(function (room) {
            $("#room-list").append(`
                        <div class="col-sm-12 col-md-6 col-lg-4 content" data-id="${room.id}"> 
                            <div class="card position-relative">
                                <img src="assets/img/${room.frontImg}" alt="img" class="w-100">
                                <div class="content-img-bottom p-3 w-100">
                                    <div>
                                        <h5 class="text-light">${room.name}</h5>
                                        <p class="text-light mb-0">${room.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `);
          });

          // Add click event to the newly created elements
          $("#room-list .content").click(function () {
            let roomId = $(this).attr("data-id");
            window.location.href = "view-room.html?view=" + roomId;
          });
        } else {
          $("#no-record").removeClass("d-none");
        }

        $("#count").text(matchingRooms.length);
      },
      error: function (xhr, status, error) {
        console.error("AJAX request failed:", status, error);
      },
    });
  });

  $("#filter-budget").change(function () {
    let price = budgets[$(this).val()];

    // Remove existing content elements
    if ($("#room-list .content").length) {
      $("#room-list .content").remove();
    }

    $.ajax({
      url: "./assets/json/rooms.json",
      method: "GET",
      success: function (response) {
        let matchingRooms = response.filter(function (room) {
          return room.price >= price[0] && room.price <= price[1];
        });

        if (matchingRooms.length > 0) {
          $("#no-record").addClass("d-none");
          matchingRooms.forEach(function (room) {
            $("#room-list").append(`
                        <div class="col-sm-12 col-md-6 col-lg-4 content" data-id="${room.id}"> 
                            <div class="card position-relative">
                                <img src="assets/img/${room.frontImg}" alt="img" class="w-100">
                                <div class="content-img-bottom p-3 w-100">
                                    <div>
                                        <h5 class="text-light">${room.name}</h5>
                                        <p class="text-light mb-0">${room.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `);
          });

          // Add click event to the newly created elements
          $("#room-list .content").click(function () {
            let roomId = $(this).attr("data-id");
            window.location.href = "view-room.html?view=" + roomId;
          });
        } else {
          $("#no-record").removeClass("d-none");
        }

        $("#count").text(matchingRooms.length);
      },
      error: function (xhr, status, error) {
        console.error("AJAX request failed:", status, error);
      },
    });
  });

  $("#filter-person").change(function () {
    let person = persons[$(this).val()];

    // Remove existing content elements
    if ($("#room-list .content").length) {
      $("#room-list .content").remove();
    }

    $.ajax({
      url: "./assets/json/rooms.json",
      method: "GET",
      success: function (response) {
        let matchingRooms = response.filter(function (room) {
          return room.person >= person[0] && room.person <= person[1];
        });

        if (matchingRooms.length > 0) {
          $("#no-record").addClass("d-none");
          matchingRooms.forEach(function (room) {
            $("#room-list").append(`
                        <div class="col-sm-12 col-md-6 col-lg-4 content" data-id="${room.id}"> 
                            <div class="card position-relative">
                                <img src="assets/img/${room.frontImg}" alt="img" class="w-100">
                                <div class="content-img-bottom p-3 w-100">
                                    <div>
                                        <h5 class="text-light">${room.name}</h5>
                                        <p class="text-light mb-0">${room.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `);
          });

          // Add click event to the newly created elements
          $("#room-list .content").click(function () {
            let roomId = $(this).attr("data-id");
            window.location.href = "view-room.html?view=" + roomId;
          });

          $("#count").text(matchingRooms.length);
        } else {
          $("#no-record").removeClass("d-none");
        }

        $("#count").text(matchingRooms.length);
      },
      error: function (xhr, status, error) {
        console.error("AJAX request failed:", status, error);
      },
    });
  });
  
  $("#search").keyup(function () {
    let value = $(this).val();

    // Remove existing content elements
    
    if ($(this).val() != '') {
       if ($("#room-list .content").length) {
        $("#room-list .content").remove();
      }

      $.ajax({
        url: "./assets/json/rooms.json",
        method: "GET",
        success: function (response) {
          let matchingRooms = response.filter(function (room) {
            return room.name.toLowerCase().includes(value.toLowerCase());
          });

          if (matchingRooms.length > 0) {
            $("#no-record").addClass("d-none");
            matchingRooms.forEach(function (room) {
              $("#room-list").append(`
                          <div class="col-sm-12 col-md-6 col-lg-4 content" data-id="${room.id}"> 
                              <div class="card position-relative">
                                  <img src="assets/img/${room.frontImg}" alt="img" class="w-100">
                                  <div class="content-img-bottom p-3 w-100">
                                      <div>
                                          <h5 class="text-light">${room.name}</h5>
                                          <p class="text-light mb-0">${room.address}</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      `);
            });

            // Add click event to the newly created elements
            $("#room-list .content").click(function () {
              let roomId = $(this).attr("data-id");
              window.location.href = "view-room.html?view=" + roomId;
            });

            $("#count").text(matchingRooms.length);
          } else {
            $("#no-record").removeClass("d-none");
          }

          $("#count").text(matchingRooms.length);
        },
        error: function (xhr, status, error) {
          console.error("AJAX request failed:", status, error);
        },
      });
    }else{
      if ($("#room-list .content").length) {
        $("#room-list .content").remove();
      }

      $.ajax({
        url: "./assets/json/rooms.json",
        method: "GET",
        success: function (response) {

          if (response.length > 0) {
            $("#no-record").addClass("d-none");
            response.forEach(function (room) {
              $("#room-list").append(`
                          <div class="col-sm-12 col-md-6 col-lg-4 content" data-id="${room.id}"> 
                              <div class="card position-relative">
                                  <img src="assets/img/${room.frontImg}" alt="img" class="w-100">
                                  <div class="content-img-bottom p-3 w-100">
                                      <div>
                                          <h5 class="text-light">${room.name}</h5>
                                          <p class="text-light mb-0">${room.address}</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      `);
            });

            // Add click event to the newly created elements
            $("#room-list .content").click(function () {
              let roomId = $(this).attr("data-id");
              window.location.href = "view-room.html?view=" + roomId;
            });

            $("#count").text(response.length);
          } else {
            $("#no-record").removeClass("d-none");
          }

          $("#count").text(response.length);
        },
        error: function (xhr, status, error) {
          console.error("AJAX request failed:", status, error);
        },
      });
    }

  });

  $(".max-image img").click(function () {
    $(".max-image").addClass("d-none");
  });
});
