function UiManager(){
	
	var noOfPlayers = 4;
	var handSlotWidth = 400;
	var handSlotHeight = 75;
	var tableSlotWidth = 50;
	var tableSlotHeight = 75;
	var cardsPerHand = 8;
	
	var canvas;
	var context;
	var centerX;
	var centerY;
	var tableSlotRadius;
	var handSlotRadius;
	var tableRadius;
	
	var getSlot = function(radius, angle) 
	{
		angle = (angle + 90) * (-1) ;
		var radians = angle / 180 * Math.PI;
		var endX = centerX + radius * Math.cos(radians);
		var endY = centerY - radius * Math.sin(radians);

		return {x:endX, y:endY};
	}
	
	var getHandSlotForPlayer  = function(playerNo){
		var angle = 360 * (playerNo / noOfPlayers);
		return getSlot(handSlotRadius, angle);
	}
	
	var getTableSlotForPlayer = function(playerNo){
		var angle = 360 * (playerNo / noOfPlayers);
		return getSlot(tableSlotRadius, angle);
	}
	
	var drawTable = function() {
	  context.beginPath();
      context.arc(centerX, centerY, tableRadius, 0, 2 * Math.PI, false);
      context.fillStyle = 'green';
      context.fill();
      context.lineWidth = 1;
      context.strokeStyle = '#003300';
      context.stroke(); 
	}
	
	var drawCircleForPlayers = function() {
      context.beginPath();
      context.arc(centerX, centerY, handSlotRadius, (1/2) * Math.PI,  (5/2)* Math.PI, false);
      context.lineWidth = 1;
      context.strokeStyle = '#003300';
      context.stroke();
	}
	
	var drawCircleForTable = function() {
      context.beginPath();
      context.arc(centerX, centerY, tableSlotRadius, (1/2) * Math.PI,  (5/2)* Math.PI, false);
      context.lineWidth = 1;
      context.strokeStyle = '#003300';
      context.stroke();
	}
	
	var drawSlot = function(imageObj, x, y, width, height, i, noOfImages){
		imageObj.onload = function(){
			i = typeof i !== 'undefined' ? i : 0;
			noOfImages = typeof noOfImages !== 'undefined' ? noOfImages : 1;
			x = Math.round(x);
			y = Math.round(y);
			var cardWidth = width / noOfImages;
			var centX = Math.round(centerX);
			var centY = Math.round(centerY);
			
			context.beginPath();
				if (x == centX && y > centY){
					context.drawImage(imageObj, x-width/2 + i*cardWidth ,y,cardWidth,height);
				} else if (x == centX && y < centY){
					context.drawImage(imageObj, x-width/2 + i*cardWidth,y-height,cardWidth,height);
				} else if (x == centX && y < centY){
					context.drawImage(imageObj, x-width/2 + i*cardWidth,y-height,cardWidth,height);
				} else if (y == centY && x < centX){
					context.drawImage(imageObj, x-width + i*cardWidth,y-height/2,cardWidth,height);
				} else if (y == centY && x > centX){
					context.drawImage(imageObj, x + i*cardWidth,y-height/2,cardWidth,height);
				} else if (y > centY && x < centX){
					context.drawImage(imageObj, x-width + i*cardWidth,y,cardWidth,height);
				} else if (y < centY && x < centX){
					context.drawImage(imageObj, x-width + i*cardWidth,y-height,cardWidth,height);
				} else if (y < centY && x > centX){
					context.drawImage(imageObj, x + i*cardWidth,y-height,cardWidth,height);
				} else {
					context.drawImage(imageObj, x + i*cardWidth,y,cardWidth,height);
				}
				context.stroke();
		}
	}
		
	this.init = function()
	{
	  canvas = document.getElementById('canvas');
	  canvas.width = window.innerWidth;
	  canvas.height = window.innerHeight;
      context = canvas.getContext('2d');
      centerX = canvas.width / 2;
      centerY = canvas.height / 2;
	  tableRadius = canvas.height / 4;
	  tableSlotRadius = canvas.height / 10;
	  handSlotRadius = this.canvas.height / 3;
      
	  drawTable();
	  
	  for (i=0;i<noOfPlayers; i++){
		var loc1 = getTableSlotForPlayer(i);
		var img = new Image();
		img.src = "carddeck/as.jpg";
		drawSlot(img,loc1.x, loc1.y,tableSlotWidth, tableSlotHeight);
		
		var loc2 = getHandSlotForPlayer(i);
		for (j=0; j<cardsPerHand; j++){
			var img = new Image();
			img.src = "carddeck/as.jpg";
			drawSlot(img,loc2.x, loc2.y ,handSlotWidth, handSlotHeight, j, cardsPerHand);
		}
	  }
	}
}