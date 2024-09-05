var width = 1000;
var height = 1000;
var mapMax =  30000000;
var mapMin = -30000000;
var centerX = width/2;
var centerY = width/2;
const switchBoard = [];
var test = 0;

class Body
{
	constructor(name, radius, gravity, orbit, gps)
	{
		this.name = name;
		this.radius = radius;
		this.gravity = gravity;
		this.orbit = orbit;
		this.gps = gps;
	}
}

const bodies = [];
bodies.push(new Body("Earthlike", 60000, 1, 42860, "GPS:EarthLike:0.50:0.50:0.50:"));
bodies.push(new Body("Moon", 9500, 0.25, 2678, "GPS:Moon:16384.50:136384.50:-113615.50:"));
bodies.push(new Body("Mars", 6000, 0.9, 39311, "GPS:Mars:1031072.50:131072.50:1631072.50:"));
bodies.push(new Body("Europa", 9500, 0.25, 3150, "GPS:Europa:916384.50:16384.50:1616384.50:"));
bodies.push(new Body("Triton", 40125, 1, 36000, "GPS:Triton:-284463.50:-2434463.50:365536.50:"));
bodies.push(new Body("Pertam", 30000, 1.2, 18510, "GPS:Pertam:-3967231.50:-32231.50:-767231.50:"));
bodies.push(new Body("Alien", 60000, 1.1, 39870, "GPS:Alien:131072.50:131072.50:5731072.50:"));
bodies.push(new Body("Titan", 9500, 0.25, 3000, "GPS:Titan:36384.50:226384.50:5796384.50:"));

function circumference(x, y, r)
{
	ctx.beginPath();
	ctx.moveTo(x + r, y);
	ctx.arc(x, y, r, 0, 2*Math.PI);
	ctx.stroke();
}

function circle(x, y, r, color)
{
	ctx.beginPath();
	
	ctx.moveTo(x + r, y);
	ctx.arc(x, y, r-1, 0, 2*Math.PI);
	
	ctx.fillStyle = color;
	ctx.fill();
	ctx.fillStyle = "#000000";
	
	circles.push(new Circle(x, y, r));
}

function circleMove(x, y, r, color)
{
	var target = findClosest(x, y);
	
	clear1();
	
	circles[target].x = x;
	circles[target].y = y;
	
	regenCircles();
}

function regenCircles()
{
	for(var i = 0; i < circles.length; i++)
	{
		circle3(circles[i].x, circles[i].y, circles[i].r, "#000000");
	}
}

function circle2(x, y, r, color = "#000000")
{
	ctx2.beginPath();
	
	ctx2.moveTo(x + r, y);
	ctx2.arc(x, y, r-1, 0, 2*Math.PI);
	
	ctx2.fillStyle = color;
	ctx2.fill();
	ctx2.fillStyle = "#000000";
}

function circle3(x, y, r, color)
{
	ctx.beginPath();
	
	ctx.moveTo(x + r, y);
	ctx.arc(x, y, r-1, 0, 2*Math.PI);
	
	ctx.fillStyle = color;
	ctx.fill();
	ctx.fillStyle = "#000000";
}

function polar(x, y, r, n, r2, f = 0, color)
{
	for(i = 0; i<n; i++)
	{
		circle(x + (r-1)*Math.cos(i*(2*Math.PI)/n), y + (r-1)*Math.sin(i*(2*Math.PI)/n), r2, color);
	}
}

function polarTest(x, y, r, n, r2, f = 0, color)
{
	for(i = 0; i<n; i++)
	{
		circumference(x + (r-1)*Math.cos(i*(2*Math.PI)/n), y + (r-1)*Math.sin(i*(2*Math.PI)/n), r2);
		tangent(x, y, 250, x + (r-1)*Math.cos(i*(2*Math.PI)/n), y + (r-1)*Math.sin(i*(2*Math.PI)/n), r2);
	}
}

function stereoA(x, y, r1, r2, s, color)
{
	for(j = r1; j <= r2; j++)
	{
		polar(x, y, j*5, j*5, s, 0, color);
	}
}

function stereoB(x, y, r1, r2, s, color)
{
	for(j = r1; j <= r2; j++)
	{
		polar(x, y, j*5, j, s, color);
	}
}

function line(x1, y1, x2, y2, color = "#000000")
{
	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
	ctx.strokeStyle = "#000000";
}

function Line(x1, y1, x2, y2, width = 2, color = "#000000")
{
	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.lineWidth = width;
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 1;
}

function tangent(x1, y1, r1, x2, y2, r2)
{
	ctx.beginPath();
	ctx.lineWidth = 4;
	ctx.strokeStyle = "#000000";
	
	var radiusDifference = r2 - r1;
	var centerToCenter = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
	var a1 = Math.PI/2 - Math.atan((x2 - x1)/(y2 - y1));
	var b1 = -Math.asin(radiusDifference/centerToCenter);
	
	if (((x2 > x1) && (y2 < y1)) || ((y2 < y1))){b1 *= -1;}
	
	var b2 = Math.PI/2 - b1;
	var d = -a1 + b2;
	var e = -a1 - b2;
	
	line(x1 + r1*Math.cos(d), y1 - r1*Math.sin(d), x2 + r2*Math.cos(d), y2 - r2*Math.sin(d));
	line(x1 + r1*Math.cos(e), y1 - r1*Math.sin(e), x2 + r2*Math.cos(e), y2 - r2*Math.sin(e));
	
	if (y2 < y1){zz = e; e = d; d = zz;}
	arc(x2, y2, r2, -d, -e);
	arc(x1, y1, r1, -e, -d);
	
	ctx.lineWidth = 1;
}

function CrossTangent(x1, y1, r1, x2, y2, r2)
{
	ctx.beginPath();
	ctx.lineWidth = 4;
	ctx.strokeStyle = "#000000";
	
	var radiusDifference = r2 - r1;
	
	var radiusSum = r1 + r2;
	var centerToCenter = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
	var a1 = Math.atan((y2 - y1)/(x2 - x1)) - Math.PI;
	var b1 = Math.PI/2 - Math.asin(radiusSum/centerToCenter);
	
	if (((x2 > x1) && (y2 < y1)) || ((y2 < y1))){b1 *= -1;}
	
	var b2 = Math.PI/2 - b1;
	var d = - a1 + b1;
	var e = - a1 - b1;

	line(x1 + r1*Math.cos(d + Math.PI), y1 - r1*Math.sin(d + Math.PI), x2 + r2*Math.cos(d), y2 - r2*Math.sin(d));
	line(x1 + r1*Math.cos(e - Math.PI), y1 - r1*Math.sin(e + Math.PI), x2 + r2*Math.cos(e), y2 - r2*Math.sin(e));
	
	if (y2 < y1){zz = e; e = d; d = zz;}
	arc(x1, y1, r1, -e + Math.PI, -d + Math.PI);
	arc(x2, y2, r2, d + Math.PI/2, -d);
	
	ctx.lineWidth = 1;
}

function arc(x, y, r, a, b)
{
	ctx.beginPath();
	ctx.arc(x, y, r, a, b);
	ctx.stroke();
}

function tangentTest()
{
	circumference(500, 500, 250);
	
	circumference(750, 250, 50);
	tangent(500, 500, 250, 750, 250, 50);
	
	circumference(750, 750, 50);
	tangent(500, 500, 250, 750, 750, 50);
	
	circumference(250, 750, 50);
	tangent(500, 500, 250, 250, 750, 50);
	
	circumference(250, 250, 50);
	tangent(500, 500, 250, 250, 250, 50);
	
	circumference(500, 850, 50);
	tangent(500, 500, 250, 500, 850, 50);
	
	circumference(850, 500, 50);
	tangent(500, 500, 250, 850, 500, 50);//
	
	circumference(150, 500, 50);
	tangent(500, 500, 250, 150, 500, 50);//
	
	circumference(500, 150, 50);
	tangent(500, 500, 250, 500, 150, 50);//*/
	
	circumference(825, 650, 50);
	tangent(500, 500, 250, 825, 650, 50);
	
	circumference(825, 350, 50);
	tangent(500, 500, 250, 825, 350, 50);//*/
	
	circumference(650, 175, 50);
	tangent(500, 500, 250, 650, 175, 50);
	
	circumference(650, 825, 50);
	tangent(500, 500, 250, 650, 825, 50);
}

function clear1()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function clear()
{
	ctx2.clearRect(0, 0, canvas.width, canvas.height);
}

function toggle(variable)
{
	const target = document.getElementById("toggle" + Format(variable));
	var toggle = FindToggle(variable);
	
	if(toggle != NaN)
	{
		toggles[toggle].Flip();
		target.classList = toggles[toggle].state == 1 ? "button buttonGreen" : "button buttonRed";
	}
}

function FindToggle(variable)
{
	for (var i = 0; i < toggles.length; i++)
	{
		if(toggles[i].name == variable)
		{
			return i;
		}
	}
}

function targetLiner(x, y)
{
	ctx.lineTo(x, y);
	ctx.stroke();
}

function targetLiner2(x1, y1, x2, y2)
{
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

function targetLiner3(x1, y1, x2, y2)
{
	clear1();
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

function colorCircle(x, y)
{
	var output = 10000;
	var outputx = 0;
	
	if(circles.length < 1){return;}
	
	for(var i = 0; i < circles.length; i++)
	{
		var distance = calculateDistance(x, y, circles[i].x, circles[i].y);
		if (distance < output) {output = distance; outputx = i;}
	}
	
	clear();
	circle2(circles[outputx].x, circles[outputx].y, circles[outputx].r, "#00FFFF");
}

function colorCircle2(x, y)
{
	var output = 0;
	var outputx = 0;
	
	if(circles.length < 1){return;}
	
	for(var i = 0; i < circles.length; i++)
	{
		var distance = calculateDistance(x, y, circles[i].x, circles[i].y);
		if (distance > output) {output = distance; outputx = i;}
	}
	
	clear();
	circle2(circles[outputx].x, circles[outputx].y, circles[outputx].r, "#FF0000");
}

function colorCircle3(x, y)
{
	var output = 10000;
	var outputx = 0;
	
	if(circles.length < 1){return;}
	
	for(var i = 0; i < circles.length; i++)
	{
		var distance = calculateDistance(x, y, circles[i].x, circles[i].y);
		if (distance < output) {output = distance; outputx = i;}
	}
	
	clear();
	circle2(circles[outputx].x, circles[outputx].y, circles[outputx].r, "#00FFFF");
	
	output = 0;
	outputx = 0;
	
	if(circles.length < 1){return;}
	
	for(var i = 0; i < circles.length; i++)
	{
		var distance = calculateDistance(x, y, circles[i].x, circles[i].y);
		if (distance > output) {output = distance; outputx = i;}
	}
	
	circle2(circles[outputx].x, circles[outputx].y, circles[outputx].r, "#FF0000");
}

function findClosest(x, y)
{
	var output = 10000;
	var outputx = 0;
	
	if(circles.length < 1){return;}
	
	for(var i = 0; i < circles.length; i++)
	{
		var distance = calculateDistance(x, y, circles[i].x, circles[i].y);
		if (distance < output) {output = distance; outputx = i;}
	}
	
	clear();

	return outputx;
}

function colorCircle4(x, y)
{
	var output = 10000;
	var outputx = 0;
	
	const points = [];
	
	if(circles.length < 1){return;}
	
	clear();
	
	for(var i = 0; i < circles.length; i++)
	{
		var distance = calculateDistance(x, y, circles[i].x, circles[i].y);
		if (distance < output) {output = distance; outputx = i;}
		points.push(distance);
		circle2(circles[outputx].x, circles[outputx].y, circles[outputx].r, "#FF0000");
	}
	
	Sorter1(points);
}

var test1;
var test2;
var test3;

function colorCircle6(x, y)
{
	var output = 10000;
	var outputx = 0;
	
	const points = [];
	const order = [];
	const circles2 = [];
	
	if(circles.length < 1){return;}
	
	clear();
	
	for(var i = 0; i < circles.length; i++)
	{
		var distance = calculateDistance(x, y, circles[i].x, circles[i].y);
		points.push(distance);
		circles2.push
		(
			new Circle2
			(
				circles[i].x,
				circles[i].y,
				circles[i].r,
				distance,
				i
			)
		);
	}
	
	const unsortedDistances = points.slice();
	
	Sorter1(points);
	
	for(var i = 0; i < points.length; i++)
	{
		for(var j = 0; j < points.length; j++)
		{
			if(unsortedDistances[j] == points[i])
			{
				order.push(j);
			}
		}
	}
	
	Sorter2(circles2);
	ratio = 255/circles2.length;
	
	for(var i = 0; i < circles2.length; i++)
	{
		var x = Hex(Math.trunc(i * ratio)) + "0000";
		//circle2(circles[order[i]].x, circles[order[i]].y, circles[order[i]].r, "#FF0000"); // Interesting segmented
		circle2(circles2[i].x, circles2[i].y, circles2[i].r, "#" + x);
		if (x.length != 6){console.log("Error: " + i);}
	}
}

function colorCircle7(x, y)
{
	var output = 10000;
	var outputx = 0;
	
	const points = [];
	const order = [];
	const circles2 = [];
	
	if(circles.length < 1){return;}
	
	clear();
	
	for(var i = 0; i < circles.length; i++)
	{
		var distance = calculateDistance(x, y, circles[i].x, circles[i].y);
		points.push(distance);
		circles2.push
		(
			new Circle2
			(
				circles[i].x,
				circles[i].y,
				circles[i].r,
				distance,
				i
			)
		);
	}
	
	const unsortedDistances = points.slice();
	
	Sorter1(points);
	
	for(var i = 0; i < points.length; i++)
	{
		for(var j = 0; j < points.length; j++)
		{
			if(unsortedDistances[j] == points[i])
			{
				order.push(j);
			}
		}
	}
	
	Sorter2(circles2);
	
	ratio = 255/circles2.length;
	
	for(var i = 0; i < circles2.length; i++)
	{
		var x = Hex(Math.trunc(i * ratio)) + "000022";
		circle2(circles2[i].x, circles2[i].y, circles2[i].r, "#" + x);
		if (x.length != 6){console.log("Error: " + i);}
	}
}

function Dump()
{
	const outputTarget = document.getElementById("debug");
	var output = "";
	output += "<table>"
	
	var hold;
	
	for(var i = 0; i < test2.length; i++)
	{
		output += "<tr><td>";
		output += test1[i] == hold ? "<b>" + test1[i] + "</b>" : test1[i];
		output += "</td><td>" + test2[i] + "</td><td>" + test3[i] + "</td>";
		output += "</tr>";
		hold = test1[i];
	}
	output += "</table>";
	
	outputTarget.innerHTML = output;
}

function Sorter1(input)
{
	return input.sort(function(a, b){return a - b;});
}

function Sorter2(input)
{
	var unsorted = false;
	var temporal;
	do
	{
		unsorted = false;
		for (var i = 0; i < input.length; i++)
		{
			if (i > 0)
			{
				if(input[i].distance < input[i - 1].distance)
				{
					temporal = input[i - 1];
					input[i - 1] = input[i];
					input[i] = temporal;
					unsorted = true;
				}
			}
		}
	}
	while(unsorted == true)
		
	return input;
}

function Hex(input)
{
	var output = input.toString(16);
	
	output = output.length == 1 ? "0" + output : output;
	output = output.toUpperCase();
	
	return output;
}

function calculateDistance(x1, y1, x2, y2)
{
	return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
}

function Format(input)
{
	var output = "";
	if(input.length > 0){output = input.slice(0, 1).toUpperCase();}
	if(input.length > 1){output += input.slice(1, input.length);}
	return(output);
}

function SetBackground(path)
{
	document.body.style.backgroundImage = "url('" + path + "')";
	document.body.style.backgroundSize = "100%";
}

function RemoveBackground()
{
	document.body.style.backgroundImage = "";
}

function DrawGrid()
{
	for(var i = 0; i <= canvas.height; i += 10)
	{
		line(0, i, canvas.width, i);
	}
	
	for(var j = 0; j <= canvas.width; j += 10)
	{
		line(j, 0, j, canvas.height);
	}
	
	for(var k = 0; k <= canvas.height; k += 100)
	{
		for(var m = 0; m <= canvas.width; m += 100)
		{
			circle(m, k, 15, "#000000");
			console.log(k + ", " + m);
		}
	}
}

function DrawBorder()
{
	// Need to make a clear by array of canvases.
	ctx0.clearRect(0, 0, canvas.width, canvas.height);
	
	ctx0.beginPath();
	ctx0.moveTo(0, 0);
	ctx0.lineTo(width, 0);
	ctx0.lineTo(width, height);
	ctx0.lineTo(0, height);
	ctx0.lineTo(0, 0);
	ctx0.lineWidth = 4;
	ctx0.stroke();
}

function TakeApart()
{
	const input = document.getElementById("input");
	const outputName = document.getElementById("outputName");
	const outputX = document.getElementById("outputX");
	const outputY = document.getElementById("outputY");
	const outputZ = document.getElementById("outputZ");
	
	var test = input.value;	
	if (test != "")
	{
		exploded = test.split(":");
		if (exploded.length == 7 && exploded[0] == "GPS")
		{					
			outputName.value = exploded[1];
			outputX.value = exploded[2];
			outputY.value = exploded[3];
			outputZ.value = exploded[4];
		}
	}
}

function DisectCSV(target)
{
	const input = target;
	var test = input.value;	
	
	if (test != "")
	{
		exploded = test.split(":");
		if (exploded.length == 7 && exploded[0] == "GPS")
		{				
			return exploded;
		}
	}
}

function CoordinateDistance()
{
	const firstCoordinate = document.getElementById("firstCoordinate");
	const secondCoordinate = document.getElementById("secondCoordinate");
	
	var a = DisectCSV(document.getElementById("firstCoordinate"));
	var b = DisectCSV(document.getElementById("secondCoordinate"));
	
	return Distance3D(a[2], a[3], a[4], b[2], b[3], b[4]);
}

function Distance3D(x1, y1, z1, x2, y2, z2)
{
	document.getElementById("outputDistance").value = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2) + Math.pow((z2 - z1), 2));
}

function Scale(value, axis)
{
	var originMin;
	var originMax;
	var targetMin;
	var targetMax;
	var originCenterX = 0;
	var originCenterY = 0;
	var originCenterZ = 0;
	var center = 0;
	
	var targetCenter;
	
	var originRange;
	var targetRange;
	
	switch(axis)
	{
		case "x":
			originMin = mapMin;
			originMax = mapMax;
			targetMin = 0;
			targetMax = width;
			originCenter = originCenterX;
			targetCenter = centerX;
			break;
		
		case "z":
			originMin = mapMin;
			originMax = mapMax;
			targetMin = 0;
			targetMax = height;
			originCenter = originCenterY;
			targetCenter = centerY;
			break;
		
		default:
			return 0;
	}
	
	if (value >= center)
	{
		originRange = originMax - center;
		targetRange = targetMax - targetCenter;
	}
	else if (value < center)
	{
		originRange = -(originMin + center);
		targetRange = targetMin + targetCenter;
	}
	
	var conversionRatio = targetRange / originRange;
	return(value*conversionRatio + targetCenter);
}

var csvOutput;

function LoadCSV(target)
{
	var xmlhttp = new XMLHttpRequest();
	return new Promise
	(
		(resolve, reject) =>
		{	
			xmlhttp.onreadystatechange = function()
			{
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
				{
					var x = this.responseText;
					var y = x.slice(1, x.length - 1).split(",");
					for(var i = 0; i < y.length; i++){y[i] = y[i].split('"')[1];}
					resolve(y);
				}
			};
			
			xmlhttp.open("GET", "LoadCSV.php?target=" + target);
			xmlhttp.send();
		}
	);
}

function LoadCoordinates(target)
{
	LoadCSV(target).then
	(
		function(value){DrawCoordinates(value);},
		function(error){console.log(error);}
	);
}

function DrawCoordinates(data)
{
	for(var i = 0; i < data.length; i++)
	{
		var outputName;
		var outputX;
		var outputY;
		var outputZ;
		
		exploded = data[i].split(":");
		if (exploded.length == 7 && exploded[0] == "GPS")
		{					
			outputName = exploded[1];
			outputX = exploded[2];
			outputY = exploded[3];
			outputZ = exploded[4];
		}
		
		circle(Scale(outputX, "x"), -Scale(outputZ, "z") + 1000, 3, "#0000FF");
	}
}

function LineTest()
{
	DottedLine(250, 500, 750, 500);
	DottedLine(250, 510, 750, 510, "#FF0000");
	DottedLine(250, 520, 750, 520, "#00FFFF");
	
	DottedLine(250, 530, 750, 530, "#FF0000");
	DottedLine(253, 530, 753, 530, "#0000FF");
	
	DottedLine(250, 540, 750, 540, "#000000");
	DottedLine(253, 540, 753, 540, "#888888");
	
	DashedLine(250, 600, 750, 600);
	
	DottedLineX(250, 500, 750, 750);
	DottedLineX(500, 250, 500, 750);
	DottedLineX(750, 500, 250, 750);
}

function DashedLine(x1, y1, x2, y2, width = 2, color = "#000000")
{
	var x3 = x1;
	for(var i = x1 + 10; i < x2; i += 10)
	{
		line(x3, y1, i - 5, y2, color);
		x3 = i;
	}
	line(x3, y1, x2 - 5, y2, color);
}

function DottedLine(x1, y1, x2, y2, width = 2, color = "#000000")
{
	var x3 = x1;
	
	var cos = Math.cos(x2 - x1 / y2 - y1);
	var sin = Math.sin(y2 - y1 / x2 - x1);
	
	for(var i = x1 + 6; i < x2; i += 6)
	{
		line(x3, y1, i - 4, y2, color);
		x3 = i;
	}
}

function DottedLineX(x1, y1, x2, y2, width = 2, color = "#000000")
{
	ctx.lineWidth = width;
	
	if (x1 > x2)
	{
		var x4 = x1;
		var y4 = y1;
		x1 = x2;
		y1 = y2;
		x2 = x4;
		y2 = y4;
	}
	
	var x3 = x1;
	var y3 = y1;
	x2 += 0.00000000001;

	var cos = (x2 - x1) / Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
	var sin = (y2 - y1) / Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
	
	// h = u ??
	
	var u = 2.5;
	
	x3 += u*cos;
	y3 += u*sin;
	
	u = 5;
	
	for(var i = 0; x3 < x2; i++)
	{
		line(x3, y3, x3 + u*cos, y3 + u*sin, color);
		x3 = x3 + 2*u*cos;
		y3 = y3 + 2*u*sin;
	}
	
	ctx.lineWidth = 1;
}

function Arrow(x, y, a, length = 10, width = 2)
{
	a = -a*Math.PI/180;
	line(x - length*Math.cos(a), y - length*Math.sin(a), x + length*Math.cos(a), y + length*Math.sin(a));
	ctx.lineTo(x - width*Math.cos(a + Math.PI/2), y - width*Math.sin(a + Math.PI/2));
	ctx.lineTo(x + width*Math.cos(a + Math.PI/2), y + width*Math.sin(a + Math.PI/2));
	ctx.lineTo(x + length*Math.cos(a), y + length*Math.sin(a));
	ctx.fill();
}

function ToRadians(a)
{
	return -a*Math.PI/180;
}

function ToDegrees(a)
{
	return a/(Math.PI/180);
	// Needs more logic to deal with negative angles and over-angles.
}

function Arc(x, y, r, a, b)
{
	a = ToRadians(a);
	b = ToRadians(b);

	ctx.beginPath();
	ctx.arc(x, y, r, b, a);
	ctx.stroke();
}

function Arc2(x, y, r, a, b, width = 2, color = "#000000")
{
	ctx.beginPath();
	ctx.lineWidth = width;
	ctx.strokeStyle = color;
	
		a = -a;
		b = -b;
		ctx.arc(x, y, r, b, a); // Why did I reverse them?
	
	ctx.stroke();
	ctx.lineWidth = 1;
	ctx.strokeStyle = "#000000";
}

function ArcTest()
{
	var a1 = 0;
	var a2 = Math.PI/2;
	var radius1 = 100;

	var fontSize = 20;
	var font1 = fontSize + "px Cambria";
	var font2 = fontSize/2 + "px Cambria";
	
	ctx.font = font1;
	
	var test = "A";
	var out = ctx.measureText(test).width;
	var out2 = ctx.measureText(test).actualBoundingBoxAscent;
	
	Text("A", 500 + (5 + radius1)*Math.cos(a1), 800 + (5 + radius1)*Math.sin(a1), font1);
	Text("1", out + 500 + (5 + radius1)*Math.cos(a1), out2/4 + 800 + (5 + radius1)*Math.sin(a1), font2);
	
	Text("A", 500 + (5 + radius1)*Math.cos(a2), 800 - (5 + radius1)*Math.sin(a2), font1);
	Text("2", out + 500 + (5 + radius1)*Math.cos(a2), out2/4 + 800 - (5 + radius1)*Math.sin(a2), font2);
	
	Arc2(500, 800, 100, 0, Math.PI/2);
	Arc2(500, 800, 90, Math.PI/2, 0);
}


function Text(text, x, y, font = "20px Cambria")
{
	ctx.font = font;
	ctx.fillText(text, x, y);
}

function DottedArc(x, y, r, a, b, width = 2)
{
	ctx.lineWidth = width;
	DashedArc(x, y, r, a, b, width, 4);
	ctx.lineWidth = 1;
}

function DashedArc(x, y, r, a, b, targetLength = 5, separation = 2)
{
	var circumferenceLength = Math.PI*2*r;
	var steps = circumferenceLength / targetLength;
	var stepAngle = ToDegrees(Math.PI*2 / steps);
	var c = stepAngle;
	
	console.log("a: " + a + " b: " + b);
	
	for(var i = 0; c < b; i++)
	{
		Arc(x, y, r, a, c);
		a += stepAngle*separation;
		c += stepAngle*separation;
	}
}

function DashedArc2(x, y, r, a, b, targetLength = 3, separation = 2)
{
	if (b < 0){b = Math.PI + b;}
		
	var circumferenceLength = Math.PI*2*r;
	var arcLength = (Math.abs(b-a))*r;
	var steps = circumferenceLength / targetLength;
	var stepsB = arcLength / (targetLength + separation);
	var stepAngle = Math.abs(b - a) / stepsB;
	a += stepAngle;
	var c = a + stepAngle; // I need to go back to the arc function itself and study it.
	
	//Line(x, y, x + r*Math.cos(a), y - r*Math.sin(a), 1, "#FF0000");
	//Line(x, y, x + r*Math.cos(b), y - r*Math.sin(b), 1, "#00FFFF");
	
	for(var i = 0; c < b; i++)
	{
		Arc2(x, y, r, a, c);
		a += stepAngle*separation;
		c += stepAngle*separation;
	}
}

function DashedCrossTangent(x1, y1, r1, x2, y2, r2)
{
	ctx.beginPath();
	ctx.lineWidth = 4;
	ctx.strokeStyle = "#000000";
	
	var radiusDifference = r2 - r1;
	
	var radiusSum = r1 + r2;
	var centerToCenter = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
	var a1 = Math.atan((y2 - y1)/(x2 - x1)) - Math.PI;
	var b1 = Math.PI/2 - Math.asin(radiusSum/centerToCenter);
	
	if (((x2 > x1) && (y2 < y1)) || ((y2 < y1))){b1 *= -1;}

	var d = - a1 + b1;
	var e = - a1 - b1;

	DottedLineX(x1 + r1*Math.cos(d + Math.PI), y1 - r1*Math.sin(d + Math.PI), x2 + r2*Math.cos(d), y2 - r2*Math.sin(d), 2);
	DottedLineX(x1 + r1*Math.cos(e - Math.PI), y1 - r1*Math.sin(e + Math.PI), x2 + r2*Math.cos(e), y2 - r2*Math.sin(e), 2);
	
	if (y2 < y1){zz = e; e = d; d = zz;}
	DashedArc2(x1, y1, r1, d - Math.PI, e + Math.PI, 2, 2);
	DashedArc2(x2, y2, r2, d, e + 2*Math.PI, 2, 2);
	
	ctx.lineWidth = 1;
}

function DashedCrossTangentTest()
{
	DashedCrossTangent(500, 500, 250, 750, 250, 50);
	DashedCrossTangent(500, 500, 250, 750, 750, 50);
	DashedCrossTangent(500, 500, 250, 250, 750, 50);
	DashedCrossTangent(500, 500, 250, 250, 250, 50);
	DashedCrossTangent(500, 500, 250, 500, 850, 50);
	DashedCrossTangent(500, 500, 250, 850, 500, 50);
	DashedCrossTangent(500, 500, 250, 150, 500, 50);
	DashedCrossTangent(500, 500, 250, 500, 150, 50);
	DashedCrossTangent(500, 500, 250, 825, 650, 50);
	DashedCrossTangent(500, 500, 250, 825, 350, 50);
	DashedCrossTangent(500, 500, 250, 650, 175, 50);
	DashedCrossTangent(500, 500, 250, 650, 825, 50);
}

function CrossTangentTest()
{
	CrossTangent(500, 500, 250, 750, 250, 50);
	CrossTangent(500, 500, 250, 750, 750, 50);
	CrossTangent(500, 500, 250, 250, 750, 50);
	CrossTangent(500, 500, 250, 250, 250, 50);
	CrossTangent(500, 500, 250, 500, 850, 50);
	CrossTangent(500, 500, 250, 850, 500, 50);
	CrossTangent(500, 500, 250, 150, 500, 50);
	CrossTangent(500, 500, 250, 500, 150, 50);
	CrossTangent(500, 500, 250, 825, 650, 50);
	CrossTangent(500, 500, 250, 825, 350, 50);
	CrossTangent(500, 500, 250, 650, 175, 50);
	CrossTangent(500, 500, 250, 650, 825, 50);
}