$(document).ready(function() {
    $(".card-link").click(function() {
        $(".rounded").attr("src", $(this).parent().siblings().attr("Src"));
        $(".product_name").text($(this).siblings("h2").text());
        $(".product_desc").text($(this).siblings("div").find("p:nth(0)").text());
        $(".product_price").text($(this).siblings("div").find("p:nth(1)").text());
    });
    $(window).resize(function() {
        if ($(window).width() < 600) {
            $(".modal-content").css("transform", "scaleX(1)");
        } else {
            $(".modal-content").css("transform", "scaleX(1.4)");
        }
    });
});