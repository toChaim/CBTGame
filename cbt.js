$( document ).ready(function() {
	console.log("document ready");

    var Prompt = function(prom, conf){
    	this.prompt = prom;
    	this.confirm = conf;
    	this.display = function(){
    		var ans = confirm(this.prompt);
    		return ans == this.confirm;
    	};
    }

    var Bout = function(prom, time, resp){
    	this.prompt = prom;
    	this.time = time;
    	this.resp = resp;
    }

	var prompts = [
		new Prompt("You are willing to feel better!", true),
		new Prompt("You are the worst person in the world.", false),
		new Prompt("You are willing to change and grow!", true),
		new Prompt("You are brave!", true),
		new Prompt("Almost everything people do are skills to be learned.", true),
		new Prompt("You never do anything right!", true),
		];
	var bouts = [];

	for(var p of prompts){
		$("#prompts").append("<li>" + p.prompt + "</li>")
	}

	$("#plybtn").click(function(){
		console.log("plybtn click");
		for(var i = 0; i < 5; i++){
			var prom = prompts[Math.floor(Math.random() * prompts.length)];
			var result = prom.display();

			if(result){
				console.log("got it right");
				$("#score").html("Yes");
			}else{
				console.log("got it right");
				$("#score").html("No");
			}

		}
	});

});