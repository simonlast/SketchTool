![SketchTool](https://github.com/simonlast/SketchTool/blob/master/sketch.png?raw=true)

#SketchTool.js

###Hassle-free and configurable sketching in the browser.

##Quick Start
1. Load processing.js
2. Create your canvas

		<canvas id="myCanvas"></canvas>
		
2. Load sketch.js
3. Make a SketchTool!

		var sketch = SketchTool.create("myCanvas");
		
###Or run my example:
		sudo node server.js
	
	
##Documentation
	
###Configuration

You can optionally pass SketchTool.create a configuration object, which may contain any of the following:

		options = {
			width: 800,
			height: 600,
			radius: 20,
			color: {
				r: 60,
				g: 60,
				b: 60
			}
		};

You can pass it like this:

		var sketch = SketchTool.create("myCanvas", options);


###sketch.reset
Call sketch.reset to reset the canvas and its data.

###sketch.changeColor
Pass a color to sketch.changeColor to change the color of the strokes

		sketch.changeColor(red, green, blue);

###sketch.changeRadius

		sketch.changeColor(radius);
		
###sketch.getData
This function will return a JS object containing the image data, in this format:

		{
			points: [
				{x: Number, y:Number},
				{x: Number, y:Number},
				...
			],
			color: {
				r: Number,
				g: Number,
				b: Number
			},
			radius: Number
		}

###sketch.getPNG
This function will return a PNG data URL

###CSS
In order for the canvas to not be outlined on selection, these CSS rules are recommended:
		
		outline: none;
  		-webkit-tap-highlight-color: rgba(255, 255, 255, 0); /* mobile webkit */
  		
##TODO
* Make a default color/radius picker