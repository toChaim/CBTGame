$(document).ready(function(){
	console.log("document ready");

	$.getJSON( "data.js", function( data ) {
		var items = [];
		$.each( data, function( key, val ) {
			items.push( "<li id='" + key + "'>" + val + "</li>" );
		});

		$( "<ul/>", {
			"class": "my-new-list",
			html: items.join( "" )
			}).appendTo( "body" );
	});
});