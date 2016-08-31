// Game object
let demo = {
	// Properties
	buttonArr: ["dog", "cat", "rabbit", "hamster", "cow"],
	
	// Methods
	init: function(data){
		for (var i = 0; i < demo.buttonArr.length; i++) {
			demo.addButton(demo.buttonArr[i]);
		}
	},

	addButton: function(item){
		$("#buttons").append("<button class='btn btn-primary btn-giphy small_margin' data-item=" + item + ">" + item + "</button>");
	},

};

$(function() {
	demo.init();

	$("#add_button").on("click", function(event){
		let btnText = $("#button_text").val().trim();

		if (btnText != "" && demo.buttonArr.indexOf(btnText) == -1) {
			demo.buttonArr.push(btnText);
			demo.addButton(btnText);
			$("#button_text").val("");
		}
	});

	$("#button_text").keypress(function(event) {
		if (event.which == 13) {
			$("#add_button").click();
		}
	});


	$(document.body).on('click', '.btn-giphy', function(event){
		$("#gifs").empty();

		$.ajax({
            url: "http://api.giphy.com/v1/gifs/search",
            method: 'GET',
            data: {
            	q: $(this).data("item"),
            	api_key: "dc6zaTOxFJmzC",
            	limit: "10"
            }
        })
        .done(function(response) {
        	console.log(response);
        	for (var i = 0; i < response.data.length; i++) {
        		let template = "<div class='large_margin'>" + 
        			"<p>Rating: " + response.data[i].rating + "<br/>" + 
        			"<img src='" + response.data[i].images.fixed_height.url + "'>" + 
        			"</div>";

        		$("#gifs").append(template)
        	}
        });
	});
});