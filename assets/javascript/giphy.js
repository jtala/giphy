


//First button array.

var brands = ["nissan", "tesla", "toyota", "volkswagen", "porsche", "honda", "jeep", "datsun", "ferrari", "rolls royce"];



// For loop to create the initial buttons.
for (i=0; i< brands.length; i++){

  var b = $('<button/>').text(brands[i]);
  // giving the buttons identifiable classes.
  b.addClass("btn-gif");
  b.addClass("data-brandname");
  b.attr("data-brandname", brands[i]);
  
  // putting it on the html.
  $("#buttons").append(b);
    
};


  // on click to create gifs + rating
  $(".btn-gif").on("click",function(){
  
  // creating dynamic ajax

  var userBrand = $(this).attr("data-brandname");
  var queryURL="https://api.giphy.com/v1/gifs/search?q="+ userBrand +"&api_key=W3a5evec5YVRfHlGQDAehOlDfcfFDo7m";

  $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      
      console.log(response.data);

      // for loop to make 10 of these.
      for (i=0; i<10; i++){
        // Creating a gif div
        var gifDiv = $("<div class='gifs'>");
        // This will show the rating
        var newP = $("<p>").text("Rating: " + response.data[i].rating);
        // Making the image gif.
        var gifImage = $("<img>");
        gifImage.attr("src", response.data[i].images.original.url);
        // Putting all together.
        var totalGif=  $(gifDiv).prepend(newP, gifImage);
        // Putting it on the page.
        $(".gif_dump").prepend(totalGif);
      };
  });
});

// Creating the button that adds gifs.

  $("#add-cars").on("click",function() {

    event.preventDefault();

    // look into what was typed in the form, extract value and store.
    var newCar = $("#cars-input").val();

    // add it onto the array.
    brands.push(newCar);

    // calling function that creates buttons over again
    buttonCreator();

  });

// Making the buttons first appear.
buttonCreator();


// To Do: 1 - Add functionality to the submit button. 2-  Styling