

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
/**
 * Returns a random integer between min (included) and max (excluded).
 * @param {number} min - The min number.
 * @param {number} max - The max number.
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// http://stackoverflow.com/questions/5915096/get-random-item-from-javascript-array
/**
 * Returns a random item from an array.
 * @param {array} array - The array input parameter.
 */
function getRandomItem(array) {
    return array[Math.floor(Math.random()*array.length)];
}

/** Represents the Enemies our player must avoid */
var Enemy = function() {
    // Variables applied to each of our Enemy instances
    this.sprite = 'images/enemy-bug.png';
    this.width = 100;
    this.height = 70;
    this.getRandomVariables();
};

/**
 * Update the enemy's position, required method for game.
 * @param dt, a time delta between ticks.
 */
Enemy.prototype.update = function(dt) {
    // multiply any movement by the dt parameter to ensure
    // the game runs at the same speed for all computers.
    this.x += this.speed * dt;
    // When the enemy reaches the right edge restart them with random variables.
    if (this.x > 500) {
        this.getRandomVariables();
    }
};

/** Method used to start/restart enemies with random positions and speeds.  */
Enemy.prototype.getRandomVariables = function() {
    this.x = getRandomInt(-200,-50);
    this.y = getRandomItem([60,140,225]);
    this.speed = getRandomInt(75,200);
};

/** Draw the enemy on the screen, required method for game. */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/** Represents the Player in the game. */
var Player = function(x,y) {
    // Variables applied to the Player object.
    this.startX = 200;
    this.startY = 405;
    this.sprite = 'images/char-boy.png';
    this.width = 70;
    this.height = 60;
    this.x = x;
    this.y = y;
};

/** Update the player's position */
Player.prototype.update = function() {
    var len = allEnemies.length;
    for (var i = 0; i < len; i++) {
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

    /** When the player gets past the enemies reset him to the starting position and congratulate him */
    if (this.y < 50) {
        this.x = this.startX;
        this.y = this.startY;
        document.getElementById("p1").innerHTML = "Great job, you made it!";
    }
};

/** Draws the player on the screen, required method for game. */
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * Moves the player up, down, left and right.
 * @param key, the arrow key pressed.
 */
Player.prototype.handleInput = function (key) {
    document.getElementById("p1").innerHTML = "Use the arrow keys to move.";
    if ((key == "up") && (this.y > -80)) {
        this.y -= 83;
    }
    else if ((key == "down") && (this.y < 400)) {
        this.y += 83;
    }
    else if ((key == "right") && (this.x < 400)) {
        this.x += 100;
    }
    else if ((key == "left") && (this.x > 0)) {
        this.x -= 100;
    }
};

/** Instantiate the enemies and player objects. */
var allEnemies = [new Enemy(),new Enemy(),new Enemy(),new Enemy()];
var player = new Player(200,405);

/** This listens for key presses. */
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
