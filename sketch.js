let ball;

let speed = 5;
let acceleration = 1.25;
let deceleration = 0.5;
let limitSpeed = 100;

function setup() {

  createCanvas(720, 480);
  ball = new Ball();
}

function draw() {

  background(51);

  if(ball.vel.mag() >= limitSpeed) {
    ball.explode();

  }
  else{
    ball.update();
    ball.edges();
  }
    ball.display();

}

function keyPressed() {

  if(ball.vel.mag() > speed)
    ball.vel.mult(deceleration);
}


function Ball() {

  this.pos = createVector(width/2, height/2);
  this.vel = p5.Vector.random2D().mult(speed);
  this.size = 25;
  this.ballColor = 0;
  this.isBigEnough = false;

  this.update = function() {
      this.pos.add(this.vel);
  }

  this.display = function() {
    noStroke();

    fill(255, 255 - this.ballColor, 255 - this.ballColor);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }



  this.explode = function() {
    if(this.isBigEnough == false){
    if(this.size < 1700){
      this.size += 55;
      
      if(this.pos.x < 0)
        this.pos.x = 0;

      if(this.pos.x > width)
        this.pos.x = width;

      if(this.pos.y < 0)
        this.pos.y = 0;

      if(this.pos.y > height)
        this.pos.y = height;
    }
    else
    this.isBigEnough = true
    }

    if(this.isBigEnough == true){
      this.pos = createVector(width/2, height/2);
      this.size -= 25;
      this.ballColor -= 3;

      if(this.size <= 10)
        this.size = 10;
    }


  }

  this.edges = function() {
    if (this.pos.y > height - this.size ||
        this.pos.y < this.size) {

      this.vel.y *= -1;
      this.vel.mult(acceleration);
      this.ballColor += 12;
    }

    if (this.pos.x > width - this.size ||
        this.pos.x < this.size) {

      this.vel.x *= -1;
      this.vel.mult(acceleration);
      this.ballColor += 12;
    }
  }
}
