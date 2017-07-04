$(document).ready(function(){
	console.log("document ready")

	console.log("constructors and lists");

	var Logic = (function(){
		var idcounter = 0;

		return function (title, txt){
			this.title = title;
			this.text = txt;
			this.id = "log" + idcounter++;
		};
	}());

	var logics = [
		new Logic("Black and White", "Things are rarely all one way or another."),
		new Logic("Forgetting the compitition.", "For most things there is lots of compitition. "
			+ "You are not the worst person / parent / partner / employee in your neighborhood much less the world."),
		new Logic("Comparing up insted of down.", "When we look at people who have more we see our lack. "
			+ "When we look people who have less we see some of what we have."),
		new Logic("Things change", "Impermanance as Budihst say."),
		new Logic("Taking part for the whole", "That guy looks good (right now)." 
			+ " She is (looks) confident (in this conversation)..." 
			+ " I wish I could be handsom and confident like them."
			+ " This take a little known information and ignores all the things that are not known."),
		

	];

	var txtHTML = "";
	for(var i = 0; i < logics.length; i++){
		txtHTML += "<tr id='" + logics[i].id + "'>"
		+ "<td class='title'>" + logics[i].title + "</td>"
		+ "<td class='text'>" + logics[i].text + "</td>"
		+ "<td class='play'>0</td>"
		+ "<td class='time'>1:00</td>"
		+ "<td class='id'>" + logics[i].id + "</td></tr>";
	}
	$("#logics tr:last").after(txtHTML);

	var Response = (function(){
		var idcounter =0;

		return function(txt, confirm){
			this.text = txt;
			this.confirm = confirm;
			this.id = "res" + idcounter++;
		};
	}());

	var responses = [
		new Response("Yes", true),
		new Response("No", false),
	];

	var Prompt = (function(){
		var idcounter = 0;

		return function Prompt(txt, confirm, response = [], logic = []){
			this.text = txt;
			this.confirm = confirm;
			this.responses = response;
			this.logics = logic;
			this.id = "prm" + idcounter++;
		};
	}());

	var prompts = [
		new Prompt("You are willing to play.", true, [responses[0], responses[1]], []),
		new Prompt("You are willing to feel better!", true, [responses[0], responses[1]], []),
		new Prompt("You are the worst person in the world.", false, [responses[0], responses[1]], []),
		new Prompt("You are willing to change and grow!", true, [responses[0], responses[1]], []),
		new Prompt("You are brave!", true, [responses[0], responses[1]], []),
		new Prompt("Almost everything people do are skills to be learned.", true, [responses[0], responses[1]], []),
		new Prompt("You never do anything right!", false, [responses[0], responses[1]], []),
	];

	var txtHTML = "";
	for(var i = 0; i < prompts.length; i++){
		txtHTML += "<tr id='" + prompts[i].id + "'>"
		+ "<td class='text'>" + prompts[i].text + "</td>"
		+ "<td class='confirm'>" + prompts[i].confirm + "</td>"
		+ "<td class='play'>0</td>"
		+ "<td class='time'>1:00</td>"
		+ "<td>" + prompts[i].id + "</td></tr>";
	}
	$("#prompts tr:last").after(txtHTML);


	function Bout(prompt, responses, pick = null){
		this.prompt = prompt;
		this.responses = responses;
		this.pick = pick;
		this.time = new Date();
	}

	var bouts = [];


	console.log("click handling");

	$(".response").click(function(){
		$this = $(this);
		var bout = bouts[bouts.length-1];
		var index = parseInt($this.attr('id').substring(3));

		var notPlaying = $this.hasClass("afirm") === false && $this.hasClass("refuse") === false;
		notPlaying = notPlaying && bout === undefined;
		if(notPlaying) {
			console.log("notPlaying");
			return;
		}

		var $prompt = $("#" + bout.prompt.id + " .play");
		$prompt.html(parseInt($prompt.html())+1);

		bout.time = new Date().getTime() - bout.time;
		$prompt = $("#" + bout.prompt.id + " .time");
		var avgTime = Math.floor(bouts.filter(
			function(b){return b.prompt.id == bout.prompt.id;}
			).reduce(
			function(a, b){
				return{time: a.time + b.time};
			}
			).time / bouts.filter(
			function(b){return b.prompt.id == bout.prompt.id;}
			).length);
		console.log(avgTime);
		$prompt.html(avgTime);

		var $score = $("#score");

		if(
			($this.hasClass("afirm") && bout.prompt.confirm)
			|| ($this.hasClass("refuse") && !bout.prompt.confirm)
			){
			bout.pick = index;
			console.log("You win");
			$score.html(parseInt($score.html()) + 1);
		}else if(
			($this.hasClass("afirm") && !bout.prompt.confirm)
			|| ($this.hasClass("refuse") && bout.prompt.confirm)
			){
			bout.pick = index;
			console.log("You loose");
			$score.html(parseInt($score.html()) - 1);
		}else{
			console.log("Should neve run.");
		}

		clear();
		display(new Bout(randomPick(prompts), [responses[0], responses[1]]));
	});

	$("#playstop").click(function(){
		console.log("playstop click");
		if($("#playstop").html() === "Play"){
			$("#playstop").html("Stop");
			
			var prom = randomPick(prompts);

			var bout = new Bout(
				prom,
				[responses[0], responses[1]]
				);
			display(bout);
		}else{
			$("#playstop").html("Play");
			clear();
		}
	});

	console.log("application helper functions");

	//later should have stuff about user and level
	function display(bout){	
			bouts.push(bout);

			var $res = $("#btn0");
			$res.html(bout.responses[0].text);
			if(bout.responses[0].confirm === true){
				$res.removeClass("refuse");
				$res.addClass("afirm");
			}else{
				$res.addClass("refuse");
				$res.removeClass("afirm");
			}
			$res = $("#btn1");
			$res.html(bout.responses[1].text);
			if(bout.responses[1].confirm === true){
				$res.removeClass("refuse");
				$res.addClass("afirm");
			}else{
				$res.addClass("refuse");
				$res.removeClass("afirm");
			}
			$("#prompt").html(bout.prompt.text);
	}
	function clear(){
		console.log("clear");
		var $res = $(".response");
		var bout = bouts[bouts.length-1];
		if(bout !== undefined && bout.pick === null){
			bouts.pop();
		}
		for(var i = 0; i < $res.length; i++){

		}
	}

});

//adapted from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function arrayShuffle(arr){
	var array = [];
	for(var i = 0; i < arr.length; i++) array.push(arr[i]);

	var currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

function randomPick(arr){
	return arr[Math.floor(Math.random() * arr.length)];
}