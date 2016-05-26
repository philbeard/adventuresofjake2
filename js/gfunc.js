// save game
var savegame = function()
{
$.ajax({
		 type: "POST",
         url: "server.php",
		 data: { 
				save : 1,
				score: score,
		 		level: hero.level,
				speed: hero.speed, 
				attack: hero.attack,
				dmg: hero.dmg,
				hp: hero.hp,
				life: hero.life,
				bg: bg,
				bg2: bg2
		 },
         success: function() {
             alert("Game saved");
         }
     });
}
// load game
var loadgame = function()
{
	$.ajax({
		 type: "GET",
         url: "server.php",
		 data: { t:1
		 },
         success: function(data) {
		 var obj = data.split("[").pop();
		 obj = obj.replace("]",'');
		 obj = jQuery.parseJSON(obj);		 
			 score = obj.score;
			 hero.level = obj.level;
			 hero.speed = obj.speed;
			 hero.attack = obj.attack;
			 hero.dmg = obj.damage;
			 hero.hp = obj.hitpoints;
			 hero.life = obj.life;
			 bg1 = obj.chords1;
			 bg2 = obj.chords2;
			 alert("Game Loaded");
         }
     });
}

var register = function()
{
		$.ajax({
		 type: "POST",
         url: "server.php",
         
         //data: { level: 'test', score: 500 },
		 data: { 
				name : 1,
				password: password,
		 },
         success: function() {
             alert("account created");
         }
     });
}

var login = function()
{
		$.ajax({
		 type: "POST",
         url: "server.php",
         
         //data: { level: 'test', score: 500 },
		 data: { 
				Log : Log,
				name : name,
				password: password
		 },
         success: function() {
             alert("account created");
         }
     });
}