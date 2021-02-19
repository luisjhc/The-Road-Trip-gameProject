class Heart {
    constructor(x) {
        this.x = x;
        this.y = 10;
        this.width = 20;
        this.height = 20;
    }

    draw() {
        image(heart, this.x, this.y, this.width, this.height);
    }
}