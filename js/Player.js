//class for the player
class Player {
    constructor() {
        this.x = 50;
        this.y = 252;
        this.width = 100;
        this.height = 48;
        this.floor = 300;
        this.velocity = 0;
        this.jumpCount = 0;
    }

    //call jump function if space bar is pressed
    keyPressed() {
        if (keyCode === 32) {
            this.jump();
        }
    }

    jump() {
        //stop the execution of the jump function if the player reach 2 jumps
        if (this.jumpCount === 2) {
            return;
        }
        //increase the jumpcount;
        this.jumpCount++;
        //makes the player go up
        this.y -= 10;
        //adding resistance going up and gain velocity going down
        this.velocity -= 5;
    }

    draw() {
        //increase velocity. The higher the player jumps, the higher will be velocity
        this.velocity += GRAVITY;
        //makes the player go down
        this.y += this.velocity;
        
        //This doesn't allow the player to go below the floor
        if (this.y >= this.floor) {
            this.y = this.floor;
            //Once the player is on the floor, the velocity is reseted
            this.velocity = 0;
            //Once the player is on the floor, the jumCount is reseted
            this.jumpCount = 0;
        }

        //draw the player
        image(van, this.x, this.y, this.width, this.height);
    }
}