var load;
// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 640;
document.body.appendChild(canvas);
 
// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
        bgReady = true;
};
bgImage.src = "images/map.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
        heroReady = true;
};
heroImage.src = "images/player.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
        monsterReady = true;
};
monsterImage.src = "images/monster.png";

//sword image
var swordReady = false;
var swordImage = new Image();
swordImage.onload = function(){
		swordReady = true;
}
swordImage.src = "images/sword.png";

// weapon image
var weaponReady = false;
var weaponImage = new Image();
weaponImage.onload = function () {
        weaponReady = true;
};
weaponImage.src = "images/atkRight.png";

// Game objects
var hero = {
		level: 1,
        speed: 35, // movement in pixels per second
		attack: 22,
		dmg: 20,
		hp: 100,
		life:5
};
        hero.x = canvas.width / 2;
        hero.y = canvas.height / 2;

// npc class
function npc(speed,hp,dmg,sight,x,y)
    {
		this.speed= speed; 
		this.hp= hp; 
		this.dmg= dmg; 
		this.sight = sight; 
		this.x = x; 
		this.y = y; 
		this.draw = true;
    }
npc.prototype.render = function(){
	ctx.drawImage(monsterImage, this.x, this.y);
}

// create new monster class from npc class.	(change array size to increase monster count.)
var i =0;
var monster = new Array();
var score = 0;
var direction = 0;
var move = false;
var weapon = {};
var sword = {};
var bg = 0;
var bg2 = 4480;
var travel = 0;
var multi = 1;
var collision = {
 u: false,
 d: false,
 l: false,
 r: false
 };
 var j = 0;
 var count = 0;
 var slow = 0;
 var x =32;
 var y =0;
 var end;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
		move = true;
		end = true;
}, false);

addEventListener("keyup", function (e) {
        delete keysDown[e.keyCode];
		move = false;
		end = false;
}, false);

// updates stats when hero dies or monster is killed
var reset = function () {
		hero.hp = 100;
		i=0;
		
		if (swordReady = false)
		{
		sword.x = 5000 + (Math.random() * (canvas.width + 5000));
		sword.y = 32 + (Math.random() * (canvas.height - 64));
		}
		hero.attack = hero.attack + (hero.level / 2);
		hero.dmg = hero.dmg + (hero.level * 2); 

};

// increase hero stats when sword is collected.
var buff = function(){
		weaponImage.src = "images/special.png";
		hero.attack += 10;
		hero.dmg +=15;
		swordReady = false;
		sword.x = 2000 + (Math.random() * (canvas.width + 2000));
		sword.y = 32 + (Math.random() * (canvas.height - 64));
}

// Update game objects
var update = function (modifier) {

// create enemies
while (i < 100)
{
monster[i] = new npc(25, 50+(hero.level * 5), 10 + (hero.level * 5), false,(600 + (Math.random() * (canvas.width + 600))) , (32 + (Math.random() * (canvas.height - 64))));

i++	;
}
// when they are all dead, create more
if (typeof monster[i] === 'undefined' && monster[i] === 'null') {
i=0;
while (i < 100)
{
monster[i] = new npc(25, 50+(hero.level * 5), 10 + (hero.level * 5), false,(600 + (Math.random() * (canvas.width + 600))) , (32 + (Math.random() * (canvas.height - 64))));
i++;
}}
// xp level calculator
hero.level = 1 * Math.sqrt(score);
i=0;
while (i < (hero.level * 2) + 1){
if (typeof monster[i] !== 'undefined' && monster[i] !== 'null') {
monster[i].sight = false;
        if (38 in keysDown) { // Player holding up
		if (hero.y + 32 >= 60)
		{
                hero.y -= hero.speed * modifier;
				direction = 1;
				move = true;
        }
		}
        if (40 in keysDown) { // Player holding down
		if (hero.y + 32 <= 600)
		{
                hero.y += hero.speed * modifier;
				direction = 0;
				move = true;
		}
		}
        if (37 in keysDown) { // Player holding left
				if (hero.x + 32 >= 30)
		{
                hero.x -= hero.speed * modifier;
				direction = 3;
				move = true;
        }
		}
        if (39 in keysDown) { // Player holding right
			if (hero.x + 32 <= 800 )
			{
                hero.x += hero.speed * modifier;
				direction = 2;
				move = true;
			}
        }
		//collect sword
		if (
                hero.x <= (sword.x + 32)
                && sword.x <= (hero.x + 32)
                && hero.y <= (sword.y + 32)
                && sword.y <= (hero.y + 32)
        ) {
		setTimeout(buff,50);	
		}
		
		// can the monster see you?
		if (hero.x <= monster[i].x + 200 && monster[i].x <= hero.x+200 && hero.y <= monster[i].y + 200 && monster[i].y <= hero.y + 200){
		
			if (hero.x <= monster[i].x + 32 && monster[i].x <= hero.x + 32)
			{
			collision.r = true;
			}
			else {
			collision.r = false;
			}

			if (monster[i].x <= hero.x+32 && monster[i].x <= hero.x + 32)
			{
			collision.l = true;
			}
			else {
			collision.l = false;
			}
			if (hero.y <= monster[i].y +32)
			{
			collision.u = true;
			}
			else {
			collision.u = false;
			}
			if(monster[i].y <= hero.y +32)
			{
			collision.d = true;
			}
			else {
			collision.d = false;
			}
			
		monster[i].sight = true;
			if (hero.x <= monster[i].x+32)
			{
			monster[i].x -= monster[i].speed * modifier;
			}
			if (monster[i].x <= hero.x)
			{
			monster[i].x += monster[i].speed * modifier;
			}
			if (hero.y <= monster[i].y)
			{
			monster[i].y -= monster[i].speed * modifier;
			}
			if (monster[i].y <= hero.y+32)
			{
			monster[i].y += monster[i].speed * modifier;
			}
		}
		// if not
		if (monster[i].sight == false){
		monster[i].x -= monster[i].speed * modifier;
		}

        // Are they touching?
        if (
                hero.x <= (monster[i].x + 32)
                && monster[i].x <= (hero.x + 32)
                && hero.y <= (monster[i].y + 32)
                && monster[i].y <= (hero.y + 32)
        ) {
				
				hero.hp = hero.hp - monster[i].dmg;
				if (hero.life == 0){
				alert("Game Over!");
				location.reload();
				}
				if (hero.hp <= 0){
				--hero.life;
                reset();
				}				
        }
		
		// attack hits monster
		if (
                weapon.x <= (monster[i].x + hero.attack)
                && monster[i].x <= (weapon.x + hero.attack)
                && weapon.y <= (monster[i].y + hero.attack)
                && monster[i].y <= (weapon.y + hero.attack)
        ) {
				monster[i].hp = monster[i].hp - hero.dmg;
				if (monster[i].hp <= 0){
				 monster.splice(i, 1);
                ++score;
                reset();
				}
        }
		} i++;}
};

// Draw everything
var render = function () {
i=0;
while (i <(hero.level * 2) + 1){
if (typeof monster[i] !== 'undefined' && monster[i] !== 'null') {
//Screen Movement
if (hero.x > 500)
	{
	move = true;
	bg -= 10;
	bg2-= 10;
	sword.x -=10;
	monster[i].x -=5;
	hero.x -=5;
	}
	else if(end == false){
	move = false;
	}
if (hero.x > 600)
	{
	bg -= 15;
	bg2-= 15;
	sword.x -= 15;
	monster[i].x -=7;
	hero.x -=7;
	}
	} i++;}
	
    if (bgReady) {
		if (bg <= -4480){
		bg = 4480;
		}
		if (bg2 <= -4480){
		bg2 = 4480
		}

		ctx.drawImage(bgImage, bg, 0);
		ctx.drawImage(bgImage, bg2, 0);
        }

        if (heroReady) {
			if (direction == 1){
			y =96;
			}
			if (direction ==2){
			y =64;
			}
			if (direction ==3){
			y =32;
			}
			if (direction ==0){
			y =0;
			}
			if (move == true){
				x= (count % 3) *32;
				}
				ctx.drawImage(heroImage, x, y, 32, 32, hero.x, hero.y, 42,42);
				if (count == 12) count = 0;
				else count++;
		} 	 	

        if (monsterReady) {
		i=0;
		while (i <(hero.level * 2) + 1){
			if (typeof monster[i] !== 'undefined' && monster[i] !== 'null') {
				ctx.drawImage(monsterImage, monster[i].x, monster[i].y);
			} i++}
        }

		if (swordReady) {
                ctx.drawImage(swordImage, sword.x, sword.y);
        }
				
		if (weaponReady){
		if (32 in keysDown) {
		if (direction ==1){
		weapon.x = hero.x+5;
		weapon.y = hero.y-20;
		weaponImage.src = "images/atk.png";
		}
		if (direction ==0){
		weapon.x = hero.x+5;
		weapon.y = hero.y+40;
		weaponImage.src = "images/atkDown.png";
		}
		if (direction == 2){
		weapon.x = hero.x+40;
		weapon.y = hero.y+5;
		weaponImage.src = "images/atkRight.png";
		}
		if (direction == 3){
		weapon.x = hero.x-20;
		weapon.y = hero.y+5;
		weaponImage.src = "images/atkLeft.png";
		}
		
		ctx.drawImage(weaponImage, weapon.x, weapon.y);
		}	
		}

        // player HUD
        ctx.fillStyle = "rgb(250, 250, 250)";
        ctx.font = "24px Helvetica";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("Score: " + score + "   level:" + hero.level.toFixed(0), 32, 32);
		ctx.fillText("Life: " + hero.life, 662, 528);
		ctx.fillText("Range: " + hero.attack, 662, 558);
		ctx.fillText("Damage: " + hero.dmg, 662, 588);
		ctx.fillText("HP: " + hero.hp, 662, 618);
		//ctx.fillText("test: " + hero.speed , 462, 618);
		
		
};


// The main game loop
var main = function () {
        var now = Date.now();
        var delta = now - then;

        update(delta / 500);
        render();
		
        then = now;
};

// Let's play this game!
reset();
var then = Date.now();
setInterval(main, 100); 