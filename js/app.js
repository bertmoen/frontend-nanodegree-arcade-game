

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//http://stackoverflow.com/questions/5915096/get-random-item-from-javascript-array
//Get random item from an array
function getRandomItem(array) {
    return array[Math.floor(Math.random()*array.length)];
}


// Enemies our player must avoid
//Given//
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    
    this.sprite = 'images/enemy-bug.png';
    this.width = 100; 
    this.height = 70; 
    this.getRandomVariables();
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    // When the enemy reaches the right edge restart them with random variables
    if (this.x > 500) {
        this.getRandomVariables();
    }
}

//method used to start/restart enemies with random positions and speeds
Enemy.prototype.getRandomVariables = function() {
    this.x = getRandomInt(-200,-50);
    this.y = getRandomItem([60,140,225]);
    this.speed = getRandomInt(75,200);
}

// Draw the enemy on the screen, required method for game
//Given//
Enemy.prototype.render = function() {
    //Given//
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.startX = 200;
    this.startY = 405;
    this.sprite = 'images/char-boy.png';
    this.width = 70;  
    this.height = 60; 
    this.x = x;
    this.y = y;
}

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function() {
    for (var i in allEnemies) {
        var e = allEnemies[i];
        //https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
        if (this.x < e.x + e.width &&
            this.x + this.width > e.x &&
            this.y < e.y + e.height &&
            this.height + this.y > e.y) {
                // collision detected!
                this.x = this.startX;
                this.y = this.startY;
                document.getElementById("p1").innerHTML = "Oops, try again!";
        }
    }

    //when the player gets past the enemies reset him to the starting position and congratulate him
    if (this.y < 50) {
        this.x = this.startX;
        this.y = this.startY;
        document.getElementById("p1").innerHTML = "Great job, you made it!";
    }
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function (key) {
    document.getElementById("p1").innerHTML = "";
    if ((key == "up") && (this.y > -80))
        this.y -= 83;
    else if ((key == "down") && (this.y < 400))
        this.y += 83;
    else if ((key == "right") && (this.x < 400))
        this.x += 100;
    else if ((key == "left") && (this.x > 0))
        this.x -= 100;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(),new Enemy(),new Enemy(),new Enemy()];
var player = new Player(200,405);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
//Given//
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
