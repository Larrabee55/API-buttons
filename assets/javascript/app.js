// Array of heros
var heros = ["Iron Man", "Captain America", "Hulk", "Thor", "BlackPanther", "Dr. Strange", "Spider Man", "Hawk Eye", "Ant Man", "War Machine", "Star Lord"];
// function for displaying gifs
function displayGif() {

  var hero = $(this).attr("data-hero");
  // API link
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    hero + "&api_key=dc6zaTOxFJmzC&limit=10";
  // ajax call to GET
  $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function (response) {
      console.log(queryURL);
      // creates a variable for reslts
      var results = response.data;
      // for loop for results
      for (var i = 0; i < results.length; i++) {
        // Creating a paragraph tag with the result item's rating
        var p = $("<p class='text-white'>").text("Rating: " + results[i].rating);

        // Creating and storing an image tag
        var heroImage = $("<img>");
        // Setting the src attribute of the image to a property pulled off the result item
        heroImage.attr("src", results[i].images.fixed_height_still.url);
        // adds attr of data still as the main Url
        heroImage.attr("data-still", results[i].images.fixed_height_still.url);
        // adds a attr of data stil
        heroImage.attr("data-animate", results[i].images.fixed_height.url);
        // sets data-state attr to still
        heroImage.attr("data-state", "still");
        // give the class gif
        heroImage.addClass("gif")
        // prepends the image and rating to add-gif div
        $(".add-gifs").prepend(heroImage);
        $(".add-gifs").prepend(p);
      }
      // on click function for pausing and playing gifs
      $(".gif").on("click", function () {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    });
}


function renderButtons() {

  $(".hero-buttons").empty();
  // Looping through each result item
  for (var i = 0; i < heros.length; i++) {

    // Then dynamically generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of movie to our button
    a.addClass("hero btn btn-dark mr-2 mb-2");
    // Adding a data-attribute
    a.attr("data-hero", heros[i]);
    // Providing the initial button text
    a.text(heros[i]);
    // Adding the button to the buttons-view div
    $(".hero-buttons").append(a);
  }
}

$("#add-hero").on("click", function (event) {
  event.preventDefault();

  // This line grabs the input from the textbox
  var hero = $("#hero-input").val().trim();

  // Adding the movie from the textbox to our array
  heros.push(hero);
  console.log(heros)

  // Calling renderButtons which handles the processing of our movie array
  renderButtons()
});


$(document).on("click", ".hero", displayGif);

renderButtons()