

//first button array.

var brands = ["nissan", "tesla", "toyota", "volkswagen", "porsche", "honda", "jeep", "datsun", "ferrari", "rolls royce"];

// creates buttons dynamically
function buttonCreator() {

  // making sure no duplicates
  $("#buttons").empty();

  // for loop to create the initial buttons
  for (i=0; i< brands.length; i++){

    var b = $('<button/>').text(brands[i]);
    // giving the buttons identifiable classes
    b.addClass("btn-gif");
    b.attr("data-brandname", brands[i]);

    // putting on the page.
    $("#buttons").append(b);   
  };

};

function displayGifs() {
  
  
  $(".btn-gif").on("click",function(){

  // creating dynamic ajax
  var userBrand = $(this).attr("data-brandname");
  var queryURL="https://api.giphy.com/v1/gifs/search?q="+ userBrand +"&api_key=W3a5evec5YVRfHlGQDAehOlDfcfFDo7m";


  $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      
      console.log(response.data);

      // no duplicates
      $(".gif_dump").empty();
  
      // making 15 gifs appear
      for (i=0; i<15; i++){
        // giving it identifying classes
        var gifDiv = $("<div class='gifs'>");
        var newP = $("<p>").text("Rating: " + response.data[i].rating);
        var gifImage = $("<img>");

        // gif img source
        gifImage.attr("src", response.data[i].images.original.url);
        gifImage.attr("class", "gif");

        //source of imgs which will change depending on click.
        gifImage.attr("data-still", response.data[i].images.original_still.url);
        gifImage.attr("data-animate", response.data[i].images.original.url);
        gifImage.attr("data-state", "animate");

        // putting it on the page.
        var totalGif=  $(gifDiv).prepend(newP, gifImage);
        $(".gif_dump").prepend(totalGif);
      };

      // pause/play functionality.
      $(".gif").on("click", function() {
        var state = $(this).attr("data-state"); 
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still"); 
        }
      });
  });
});
};
// Creating the button that adds gifs.
  $("#add-cars").on("click",function(event) {
  
    event.preventDefault();

    // taking what was typed, putting into button
    var newCar = $("#cars-input").val().trim().toLowerCase();

      // making sure there are no duplicates or lowercases.
      if(jQuery.inArray(newCar, brands) != -1){
        alert("That's already on the list! Try another one.");
      }
      
      else if (jQuery.inArray(newCar, brands) === -1){
      // add it onto the array.
      brands.push(newCar);

    // calling function that creates buttons over again
    buttonCreator();
    };
  });

  //disables button if nothing is present
  $(document).ready(function(){
    $("#add-cars").attr('disabled',true);
    $('#cars-input').keyup(function(){
        if($(this).val().length !=0)
            $("#add-cars").attr('disabled', false);            
        else
            $("#add-cars").attr('disabled',true);
    })
});

  // On click event listener for all the buttons.

  $(document).on("click", ".btn-gif", displayGifs);



  // Making the buttons first appear.
  buttonCreator();
  displayGifs();