
var SketchTool = {};

SketchTool.play = function(pjs) {

	var bkg, strokes, defaultCol, currColor, currRadius;

	pjs.setup = function(){
		pjs.size(SketchTool.options.width,SketchTool.options.height);
		pjs.noStroke();
		pjs.smooth();
		pjs.noLoop();
		pjs.resetVars();
		
	};

	pjs.resetVars = function(){
		bkg = pjs.color(255);
		strokes = [];
		defaultCol = SketchTool.options.color;
		currColor = pjs.color(defaultCol.r, defaultCol.g, defaultCol.b);
		currRadius = SketchTool.options.radius;
		pjs.redraw();
	}

	pjs.draw = function(){
		pjs.background(bkg);
		for(var i=0; i<strokes.length; i++){
			strokes[i].render();
		}
	};

	pjs.mousePressed = function(){
	   	var stroke = new pjs.Stroke(
	  		[new pjs.PVector(pjs.mouseX,pjs.mouseY)],
	    	currColor,
	    	currRadius);
	    strokes.push(stroke);
	    pjs.loop();
	};

	pjs.mouseDragged = function(){
		var currStroke = strokes[strokes.length-1];
  		currStroke.addPoint(new pjs.PVector(pjs.mouseX,pjs.mouseY));
	};

	pjs.mouseReleased = function(){
  		pjs.noLoop();
	};

	pjs.changeColor = function(r,g,b){
		currColor = pjs.color(r,g,b);
	};

	pjs.changeRadius = function(radius){
		currRadius = radius;
	};

	pjs.getData = function(){
		var data = [];
		for(var i=0; i<strokes.length; i++){
			var curr = strokes[i];
			var currPoints = [];
			for(var x=0; x<curr.points.length; x++){
				currPoints.push({
					x: curr.points[x].x,
					y: curr.points[x].y
				});
			}
			data.push({
				points: currPoints,
				color: {
					r: pjs.red(curr.color),
					g: pjs.green(curr.color),
					b: pjs.blue(curr.color)
				},
				radius: curr.radius
			});
		}
		return data;
	};

	pjs.Stroke = function(points, color, radius){
		this.points = points;
		this.color = color;
		this.radius = radius;

		this.render = function(){
			pjs.beginShape();
  			pjs.stroke(this.color);
  			pjs.strokeWeight(this.radius);
  			pjs.noFill();
  			for(var i=0; i<this.points.length; i++){
  				var curr = this.points[i];
    			pjs.curveVertex(curr.x, curr.y);
  			}
  			pjs.endShape();
		};

		this.addPoint = function(point){
			this.points.push(point);
		};
	};

};

SketchTool.defaults = {
	width: 800,
	height: 600,
	radius: 20,
	color: {
		r: 60,
		g: 60,
		b: 60
	}
};

SketchTool.options = {};

SketchTool.setOptions = function(userOptions){
	if(!userOptions){
		SketchTool.options = SketchTool.defaults;
	}else{
		for(var key in SketchTool.defaults){
			if(userOptions[key] != undefined){
				SketchTool.options[key] = userOptions[key];
			}else{
				SketchTool.options[key] = SketchTool.defaults[key];
			}
		}
	}
};

/* Call this function on sketch (sketch.getPNG) */
SketchTool.getPNG = function(){
	return this.canvas.toDataURL("image/png");
}

SketchTool.create = function(canvasId, options){
	var sketch = {};
	SketchTool.setOptions(options);
	sketch.canvas = document.getElementById(canvasId);
	sketch.processingInstance = new Processing(sketch.canvas, SketchTool.play);
	sketch.reset = sketch.processingInstance.resetVars;
	sketch.changeColor = sketch.processingInstance.changeColor;
	sketch.changeRadius = sketch.processingInstance.changeRadius;
	sketch.getData = sketch.processingInstance.getData;
	sketch.getPNG = SketchTool.getPNG;
	return sketch;
};
