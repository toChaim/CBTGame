$( document ).ready(function() {
	console.log("document ready");

    var Prompt = function(prom, conf, logs = []){
    	this.prompt = prom;
    	this.confirm = conf;
    	this.display = function(){
    		var ans = confirm(this.prompt);
    		if(ans == this.confirm){
    			console.log("got it right");
    			$("#score").html(parseInt($("#score").html())+1);
    		}else{
    			console.log("got it wrong");
    			$("#score").html(parseInt($("#score").html())-1);
    		}
    	};
    	this.logics = logs;
    }

    var Bout = function(prom, time, resp){
    	this.prompt = prom;
    	this.time = time;
    	this.resp = resp;
    }

    var Logic = function(log, des){
    	this.logic = log;
    	this.description = des;
    };

	var logics = [
		new Logic("Black and White", "Things are rarely all one way or another."),
		new Logic("Forgetting the compitition.", "For most things there is lots of compitition. "
			+ "You are not the worst person / parent / partner / employee in your neighborhood much less the world."),
		new Logic("Comparing up insted of down.", "When we look at people who have more we see our lack. "
			+ "When we look people who have less we see some of what we have."),
		new Logic("Things change", "Impermanance as Budihst say."),
		
		
		];


	for(var i of logics){
		$("#logic").append("<li>" + i.logic + "</li>")
	}

	var prompts = [
		new Prompt("You are willing to feel better!", true),
		new Prompt("You are the worst person in the world.", false),
		new Prompt("You are willing to change and grow!", true),
		new Prompt("You are brave!", true),
		new Prompt("Almost everything people do are skills to be learned.", true),
		new Prompt("You never do anything right!", false),
		];

	var bouts = [];

	for(var p of prompts){
		$("#prompts").append("<li>" + p.prompt + "</li>")
	}

	$("#plybtn").click(function(){
		console.log("plybtn click");
		for(var i = 0; i < 5; i++){
			var prom = prompts[Math.floor(Math.random() * prompts.length)];
			var tim = setTimeout(function(){prom.display();}, 1);

		}
	});

});