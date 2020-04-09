var population;
var lifespan = 300;
var lifeP;
var count = 0;
var target;
var maxforce = 1;
var inside = false;
var numberOfhits = 0;
var numberOfhitsP;
var locked = undefined;
var obstacles = [];
var mutationRate = 0.01;

// var rx = 100;
// var ry = 150;
// var rw = 200;
// var rh = 10;

function resetButtonFunc()
{
	population.reset();
	this.obstacles = [];
}

function Target() {
	this.pos = createVector(width / 2, 50);
	// this.y = 50;
	this.r = 30;
	this.colors = [color(0, 0, 255), color(255, 255, 255), color(255, 0, 0)];

	this.show = function() {
		// this.targetColor.setAlpha(150);
		// stroke(100);
		noStroke();
		for(var i = 0; i < this.colors.length; ++i)
		{
			fill(this.colors[i]);
			ellipse(this.pos.x, this.pos.y, this.r - 10 * i, this.r - 10 * i);
		}
	}

}

function setup() {
  createCanvas(windowWidth * 0.9, windowHeight * 0.78);
  population = new Population();
  lifeP = createP();
  numberOfhitsP = createP();
  target = new Target();
  numberOfhitsP.style('color: white');
  lifeP.style('color: white');
}

function draw() {
  background(0);
  population.run();
  lifeP.html('Iterations for this epoch: ' + count);
  numberOfhitsP.html('Number of Hits in this epoch: ' + numberOfhits);


  inside = (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height);

  count++;
  if (count == lifespan) {
    population.evaluate();
    population.selection();
    count = 0;
    numberOfhits = 0;
  }
  // rect(0, 0, mouseX, mouseY);
  if(drawRect)
  {
  	if(locked == true)
  	{
	  	var w = abs(mouseX - startPos.x);
		var h = abs(mouseY - startPos.y);
		var tempColor = color(120);
		tempColor.setAlpha(100);
		stroke(20);
		fill(tempColor);
		var corner = createVector((mouseX < startPos.x) ? mouseX : startPos.x, (mouseY < startPos.y) ? mouseY : startPos.y);
		rect(corner.x, corner.y, w, h);
	}
  	else if(locked == false)
  	{
  		console.log(locked);
  		var temp = new Obstacle();
  		obstacles.push(temp);
  		drawRect = false;
  		locked = undefined;
  	}
  }
  for(var i = 0; i < obstacles.length; ++i)
  	obstacles[i].show();
 
  fill(color(255, 120, 0));
  target.show();
}




