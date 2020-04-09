function Rocket(dna) {
  // Physics of rocket at current instance
  this.pos = createVector(width / 2, height - 10);
  this.vel = createVector();
  this.acc = createVector();
  this.color = color(random(50, 250), random(50, 250), random(50, 250));
  // this.color = color(200, 200, 200);
  this.completed = false;
  this.crashed = false;
  this.obstacleCrash = false;
  this.counted = false;
  this.history = [];
  // this.strokeColor = color(random(50, 250), random(50, 250), random(50, 250));
  this.strokeColor = color(random(200, 255), random(100, 255), 0);
  this.dna = (dna) ? dna : new DNA();
  this.fitness = 0;

  this.applyForce = function(force) 
  {
    this.acc.add(force);
  };
  
  this.calcFitness = function() 
  {
    var d = dist(this.pos.x, this.pos.y, target.pos.x, target.pos.y);
    this.fitness = map(d, 0, width, width, 0);

    if (this.completed)
      this.fitness *= (10 * (4000 / count));
    
    if (this.crashed) 
      this.fitness /= 20;

    if(this.obstacleCrash)
      this.fitness /= 40;
  };

  this.checkCollisions = function() {
    for(var i = 0; i < obstacles.length; ++i)
    {
      if(this.pos.x >= obstacles[i].corner1.x && this.pos.x <= obstacles[i].corner2.x && this.pos.y >= obstacles[i].corner1.y && this.pos.y <= obstacles[i].corner2.y)
      {
        this.obstacleCrash = true;
        break;
      }
    }
  }
  // Updates state of rocket
  this.update = function() {
    
    var d = dist(this.pos.x, this.pos.y, target.pos.x, target.pos.y);
    
    if (d < 30) 
    {
      this.completed = true;
      this.pos = target.pos.copy();
      if(!this.counted)
      {
        numberOfhits++;
        this.counted = true;
      }
    }
    this.checkCollisions();
    if (this.pos.x > width || this.pos.x < 0 || this.pos.y < 0 || this.pos.y > height) 
      this.crashed = true;
    

    this.history.push(createVector(this.pos.x, this.pos.y));
    if(this.history.length > 50)
      this.history.splice(0, 1);

    this.applyForce(this.dna.genes[count]);
    if (!this.completed && !this.crashed && !this.obstacleCrash) 
    {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }
    // else this.history = [];
  };
  // displays rocket to window
  this.show = function() {
    push();
    
    stroke(0);
    
    fill(this.color);
    // fill(0);
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    // triangleMode(CENTER);
    // triangle(-12, 0, 12, 0, 0, 25);
    rect(0, 0, 25, 5);

    pop();

    noFill();
    // stroke(color(0, 0, 200));
    stroke(this.strokeColor);
    strokeWeight(1);
    beginShape();
    for(var i = 0; i < this.history.length; ++i)
      vertex(this.history[i].x, this.history[i].y);
    endShape();
  };
}