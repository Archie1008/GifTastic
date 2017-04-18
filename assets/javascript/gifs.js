var topics = ["Muay Thai" , "MMA" , "Boxing" , "Karate" , "Kung Fu" , "Kickboxing" , "Judo"];

//create html layout
//make var topics which is gonna be an array
//make a buttons from an array strings when page loading
//when clicking on the button with a topic make an AJAX request to Giphy API
//make the requested gifs appear in a "topics" div container
//make the ratings of the gifs appear in the same container
//create a button that will push input into an array and create new buttons with it
//make gifs static when on their upload

//bells and whistles 

    for ( var i = 0 ; i<topics.length ; i++) {
        var gifButton = $("<button class='btn btn-default btn-md'>");
        $("#topicsButtons").prepend(gifButton);
        $(gifButton).prepend(topics[i]);
        $(gifButton).attr("value",topics[i]);
        // $(gifButton).attr("id","item-" + topics.indexOf(topics[i]));
    }

    $(".go-button").on("click", function(e){
        var newTopic = $(".form-control").val();
        console.log(newTopic);
        if (newTopic.length > 0) {
            topics.push(newTopic);
            var gifButton = $("<button class='btn btn-default btn-md'>");
            $("#topicsButtons").prepend(gifButton);
            $(gifButton).prepend(newTopic);
            $(gifButton).attr("value", newTopic);
            $(".form-control").val("");
        }
    });

    // $(".btn-md").on("click" , function()???? не работает
$(document).on("click", ".btn-md", function(e) {
        
        var martialArt = $(this).attr("value");

        console.log("Id = "+e.target.id);
        console.log("Value = "+e.target.value);
        console.log(martialArt);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + martialArt + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
            console.log(response.data);
            console.log(queryURL);
            
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='gifDiv'>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var imageTag = $("<img>");
                $(imageTag).attr("id" , i);
                imageTag.attr("src", results[i].images.fixed_height_still.url);
                gifDiv.prepend(p);
                gifDiv.prepend(imageTag);
                $("#topics").prepend(gifDiv);
            }

            $("img").on("click", function(){
                var imgId = $(this).attr("id");
                var imgSrc = $(this).attr("src");   
                console.log(imgSrc);        //why if I'm console.log it it just give me url but when I compare it to response.path it act like imgSrc is equals response.path
                if( imgSrc === results[imgId].images.fixed_height_still.url) {
                    $(this).attr("src", results[imgId].images.fixed_height.url);
                }

                else {
                    $(this).attr("src", results[imgId].images.fixed_height_still.url);
                }
            });
        });
    });




//why if I'm creating var gifButton on a global scope and use it in for loop to create more buttons it creates only one button and puts all the strings from an array in a one button?
//can I simply switch http protocol to https on everywebsite?