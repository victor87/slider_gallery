$(document).ready(function()
{	
	canvasOperations.populate();	
	$("canvas").click( function( evt )
	{
		canvasOperations.blurOut();
	});
});

var canvasOperations = 
		{
			radius : 		22,
			defaultRadius : 22,
			
			canvases: [],
			
			populate : function()
									{
										var _this = canvasOperations,
										    radius;
										    
								    if(_this.radius<=0)
								    {
								    	_this.radius = _this.defaultRadius;
								    	radius = _this.radius;
								    } else { 
				    				radius = _this.radius;
				    				}
	
										$("canvas").each(function() 
										{
											$( this )
												.attr( 'width', 400 )
												.attr( 'height', 300 );
											
										    var ctx = $(this).get(0).getContext("2d"),
										    		canvas = this,
										    		img = new Image(),
										    		w = this.width,
										    		h = this.height,
										    		imgCache = new Image(); // cache the image data
										    		
										    img.src = $(this).children()[0].src;
										    $(img).load(function() 
									  		{
													ctx.drawImage(img, 0, 0, w, h);
													
													// cache the image as a data URI
													imgCache.src =  canvas.toDataURL("image/png");
													
													stackBoxBlurCanvasRGB( canvas, 0, 0, w, h, radius, 2 );
												});
											
											
											// cache your canvases
											_this.canvases.push( { ctx: ctx, canvas: canvas, img: imgCache, w: w, h: h } );
								 		});
								 		return this.radius;
									},
									
			update: function()
									{
										// update through the cached canvases instead of loading a new context each time
										var _this = canvasOperations,
											radius = _this.radius;
										
										for ( var i = _this.canvases.length; i--; )
										{
											var canvasObj = _this.canvases[ i ],
												ctx = canvasObj.ctx,
												img = canvasObj.img,
												canvas = canvasObj.canvas,
												w = canvasObj.w,
												h= canvasObj.h;
											
											ctx.drawImage(img, 0, 0, w, h);
											stackBoxBlurCanvasRGB( canvas, 0, 0, w, h, radius, 2 );
										}
									},			
			
			blurOut : function()
									{
										var _this = canvasOperations;

										var rad = _this.radius,
											i,
											populate = _this.populate,
											_timer;
											
										i =  _this.radius;

										// the while loop will ignore the intervals, so you need to factor in the while within the interval
										_timer = window.setInterval( function()
										{
											if ( i>=0 )
											{
												_this.radius = i--;
												_this.update();
											}
											else
											{
												// clear and quit the loop when done.
												window.clearInterval( _timer );
											}
										}, 42 ); // 24fps
										
										return this.radius;
									}							 	
		};