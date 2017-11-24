var backc = document.getElementById("back-c");
var backctx = backc.getContext('2d');

var whitec = document.getElementById("white-c");
var whitectx = whitec.getContext('2d');

var frontc = document.getElementById("front-c");
var frontctx = frontc.getContext('2d');

var linec = document.getElementById("line-c");
var linectx = linec.getContext('2d');

var textc = document.getElementById("text-c");
var textctx = textc.getContext('2d');

var backWidth = backc.width;
var backHeight = backc.height;
var pieLen = pieData.length;

var requestAnimationFrame = window.requestAnimationFrame ||
							window.webkitRequestAnimationFrame ||
							window.mozRequestAnimationFrame ||
							window.oRequestAnimationFrame ||
							window.msRequestAnimationFrame;

var iteration = 0;
var totalIterations = 100;
var easingValue;
var radiusBig = 200;
var radiusSmall = 100;

var startValue = Math.PI * 1.5,
	inValue = Math.PI * 2,
	changeValue = Math.PI * 2,
	endValue = Math.PI * 1.5;

function Effect (position) {
	this.position = position;
	this.done = false;
	this.clicked = false;
	this.hover = false;
}

var effects = [];

for(var i = 0; i < pieLen; i++) {
	effects.push(new Effect(i));
}

var position = 100;
var last_click = 100;
var last_hover = 100;

drawWhite(whitectx);
drawCircle(backctx);

linec.addEventListener('mousemove', onMouseMove, false);
linec.addEventListener('click', onclick, false);

function onMouseMove(evt) {
	var pagex = evt.pageX;
	var pagey = evt.pageY;
	downWhere(pagex, pagey, drawThing, false);
}

function onclick(evt) {
	var pagex = evt.pageX;
	var pagey = evt.pageY;
	downWhere(pagex, pagey, drawThing, true);
}

function downWhere (pax, pay, callback, isclick) {
	if ( (pax - 225)*(pax - 225) + (pay - 225)*(pay - 225) < radiusBig*radiusBig &&
	 (pax - 225)*(pax - 225) + (pay - 225)*(pay - 225) > radiusSmall*radiusSmall){
		if( pay < inline(pax, addValue(7)) &&
			pay < inline(pax, addValue(0)) ) {
			position = 0;
		}
		if( pay > inline(pax, addValue(0))  &&
			pay < inline(pax, addValue(1)) ) {
			position = 1;
		}
		if( pay > inline(pax, addValue(1))  &&
			pay > inline(pax, addValue(2)) ) {
			position = 2;
		}
		if( pay < inline(pax, addValue(2))  &&
			pay > inline(pax, addValue(3)) ) {
			position = 3;
		}
		if( pay < inline(pax, addValue(3))  &&
			pay > inline(pax, addValue(4)) ) {
			position = 4;
		}
		if( pay < inline(pax, addValue(4))  &&
			pay > inline(pax, addValue(5)) ) {
			position = 5;
		}
		if( pay < inline(pax, addValue(5))  &&
			pay > inline(pax, addValue(6)) ) {
			position = 6;
		}
		if( pay < inline(pax, addValue(6))  &&
			pay > inline(pax, addValue(7)) ) {
			position = 7;
		}
		if( last_hover != position ) { 
			if( last_hover != 100 ) { effects[last_hover].hover = false; }
			effects[position].hover = true;
			last_hover = position;
			callback(frontctx);
			return;
		} else if( isclick && last_click != position ) {
			if( last_click != 100 ) { effects[last_click].clicked = false; }
			effects[position].clicked = true;
			last_click = position;
			callback(frontctx);
			clickThing(textctx, position);
			return;
		}
	} else {
		initialGrey();
	}

	function initialGrey () {
		if( position == 100 && last_hover == 100 ){
		    return;
		}
		if( last_hover != 100 ) {
		    effects[last_hover].hover = false;
		}
		position = 100;
		last_hover = 100;
		callback(frontctx);
	}
}

function inline (pax, rad) {
	if( isFinite(-Math.cos(Math.PI * 2 * rad)*radiusBig) ) {
		return (pax - 225)*(-Math.cos(Math.PI * 2 * rad)*radiusBig)/(Math.sin(Math.PI * 2 * rad)*radiusBig) + 225;
	} else {
		return 225;
	}
}

function addValue (count) {
	var values = 0;
	for(var i = 0; i <= count; i++) {
		values += pieData[i].value;
	}
	return values;
}

function drawClear(ctx) {
	ctx.clearRect(0, 0, backWidth, backHeight);
	ctx.fillStyle = "#fff";
	ctx.fillRect(0, 0, backWidth, backHeight);
}

function drawCircle(ctx) {
	var i = 0;
	drawClear(ctx);
	for( ; i < pieData.length ; i++ ) {
		(i == 0) ? startValue = Math.PI * 1.5 : startValue = easingValue ;
		changeValue = inValue * pieData[i].value;
		easingValue = easing.easeOutBounce(iteration, startValue, changeValue, totalIterations);

		ctx.beginPath();
		ctx.arc(225, 225, radiusBig, startValue, easingValue, false);
		ctx.lineTo(225,225);
		ctx.lineWidth = 2;

		ctx.closePath();
		ctx.fillStyle = pieData[i].color;
		ctx.strokeStyle = "#fff";

		ctx.fill();
		ctx.stroke();
	}

	if(iteration < totalIterations) {
		iteration++;
		requestAnimationFrame(function () {
			drawCircle(ctx);
		});
	} else {
		getByClass("wrap-box")[0].style.transform = "rotatey(180deg)";
		drawThing(frontctx);
		setTimeout(function () {
			effects[0].clicked = true;
			last_click = 0;
			drawIcon(frontctx);
			setTimeout(function () {
				drawThing(frontctx);
				clickThing(textctx, 0);
			}, 500);
		}, 500);
	}
}

function drawWhite (ctx) {
	ctx.beginPath();
	ctx.arc(225, 225, radiusSmall, Math.PI * 0, Math.PI * 2, false);
	ctx.closePath();
	ctx.fillStyle = "#fff";
	ctx.fill();
}

function drawThing(ctx) {
	var i = 0;
	var icon = undefined;

	for( ; i < pieLen ; i++ ) {
		drawing(ctx, i);
	}
	for(i = 0 ; i < pieLen ; i++ ) {
		if( !effects[i].clicked ) {
			icon = putIcon(i, 225, 140, true);
			ctx.font = "bold 30px Arial";
			ctx.textAlign = "center";
			ctx.fillStyle = "#fff";
			ctx.fillText(i + 1, icon.x, icon.y);
		}
	}
}

function putIcon(count, radiusW, radiusN, more) {
	var values = 
		angle = 
		i = 0,
		more = more ? pieData[count].value / 2 : 0;

	for( ; i < count; i++) {
		values += pieData[i].value;
	}
	angle = Math.PI * 2 * (values + more);

	return {
		x: Math.floor(radiusW + Math.sin(angle) * radiusN),
		y: Math.floor(radiusW - Math.cos(angle) * radiusN)
	}
}

function drawIcon (ctx) {
	var i = 0;
	var icon = undefined;

	for( ; i < pieLen ; i++ ) {
		drawing(ctx, i);
	}
	for(i = 0 ; i < pieLen ; i++ ) {
		icon = putIcon(i, 225, 140, true);
		ctx.font = "bold 30px Arial";
		ctx.textAlign = "center";
		ctx.fillStyle = "#fff";
		ctx.fillText(i + 1, icon.x, icon.y);
	}
}

function drawing (ctx, i) {
    startValue = endValue ;
	endValue = startValue + Math.PI * pieData[i].value * 2;

	ctx.beginPath();
	ctx.arc(225, 225, radiusBig, startValue, endValue, false);
	ctx.lineTo(225,225);
	ctx.lineWidth = 2;
	ctx.closePath();
	if ( effects[i].clicked || effects[i].done ) {
		( effects[i].hover ) ? ctx.fillStyle = pieData[i].highlight : ctx.fillStyle = pieData[i].color;
	} else {
		( effects[i].hover ) ? ctx.fillStyle = pieData[i].greylight : ctx.fillStyle = pieData[i].grey;
	}
	ctx.strokeStyle = "#fff";
	ctx.fill();
	ctx.stroke();
}

function clickThing (ctx, i) {
	var iteration = 0;
	var totalIterations = 30;
	var backX, backY;
	var icon = putIcon(i, 225, 140, true);
	var ty = icon.y - 25;

	(function miniIcon () {
		ctx.clearRect(0, 0, 500, 500);
		backY = easing.easeOutBounce(iteration, ty, 25, totalIterations);

		ctx.font = "bold 30px Arial";
		ctx.textAlign = "center";
		ctx.fillStyle = "#fff";
		ctx.fillText(i + 1, icon.x, backY);
		if(iteration < totalIterations) {
			iteration++;
			requestAnimationFrame(function () {
				miniIcon();
			});
		}
	})();
}

function getByClass(className){
    var domArr = [];
    var docELem = document.getElementsByTagName('*');
    for(var i in docELem){
        if(docELem[i].nodeType == 1){
            var elemClass = docELem[i].className.split(' ');
            for( var m in elemClass){
                if(elemClass[m] == className){
                    domArr.push(docELem[i]);
                }
            }
        }
    }
    return domArr;
}      