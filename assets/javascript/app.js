var topics = ["Hamster", "Horse", "Cat", "Pug"];

$(document).ready(function() {
    for(var i = 0; i < topics.length; i++) {
        addButton(topics[i]);
    }

    $("#button-section").on("click", ".action-button", buttonSectionClickEvent);
    $("#new-subject-btn").on("click", addNewSubjectClickEvent);
    $("#media-section").on("click", ".gif", mediaSectionClickEvent);
});

function mediaSectionClickEvent() {
    if($(this).attr("data-playing") === "true") {
        $(this).attr("src", $(this).attr("data-src-still"));
        $(this).attr("data-playing", "false");
    } else {
        $(this).attr("src", $(this).attr("data-src-animate"));
        $(this).attr("data-playing", "true");
    }
}

function addButton(text) {
    var btn = $("<button>");
    btn.addClass("action-button btn btn-secondary");
    btn.attr("data-search-term", text);
    btn.text(text);

    var col = $('<div class="col">').append(btn);
    $("#button-row").append(col);
}

function addNewSubjectClickEvent(event) {
    event.preventDefault();
    var subject = $("#new-subject-input").val().trim();
    if(subject.length > 0) {
        addButton(subject);
        $("#new-subject-input").val("");
    }
}

function buttonSectionClickEvent() {
    var searchTerm = $(this).attr("data-search-term");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&q=" + $(this).attr("data-search-term");
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        $("#media-section").empty();
        var data = response.data;
        for(var i = 0; i < data.length; i++) {
            var imageUrl = data[i].images.original.url;
            var imageUrlStill = data[i].images.original_still.url;
            var img = getImgHtml(imageUrlStill, imageUrl);
            var card = htmlCard(img, "Rating: " + data[i].rating);
            $("#media-section").append(card);
        }
    }); 
}

function getImgHtml(srcStill, srcAnimate) {
    var img = $("<img>");
    img.attr("src", srcStill);
    img.addClass("gif");
    img.attr("data-src-still", srcStill);
    img.attr("data-src-animate", srcAnimate);
    img.attr("data-playing", "false");
    return img.prop('outerHTML');
}

function randN(multiplier, plus) {
    return Math.floor(Math.random() * multiplier) + plus;
}

function htmlCard(image, ratingText) {
    return '<div class="card">'
            + image
                + '<div class="card-body">'
                    + '<div class="text-center">'
                        + '<h4>' + ratingText + '</h4>'
                    + '</div>'
                + '</div>'
            + '</div>';
}

