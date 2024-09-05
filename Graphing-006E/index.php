<!DOCTYPE html>
<html>
	<head>
		<script src="mainLogic.js"></script>
		<link rel="stylesheet" href="style.css">
	</head>
	<body id="body">
		<h1>Graphing-006E</h1>
		<div style="z-index: 1">
			<div style="display: flex; gap: 4px;">
				<button id="toggleDots" class="button buttonRed" onclick="toggle('dots')">ADD DOTS</button>
				<button id="toggleTest" class="button buttonRed" onclick="toggle('test')">SWITCH TEST</button>
				<button id="toggleHover" class="button buttonRed" onclick="toggle('hover')">HOVER TEST</button>
				<button id="toggleDraw" class="button buttonRed" onclick="toggle('draw')">DRAW TEST</button>
				<button id="toggleFuse" class="button buttonRed" onclick="toggle('fuse')">FUSE TEST</button>
				<button id="toggleFuse3" class="button buttonRed" onclick="toggle('fuse3')">FUSE TEST 3</button>
				<button id="toggleFuse4" class="button buttonRed" onclick="toggle('fuse4')">FUSE TEST 4</button>
				<button id="toggleFollow" class="button buttonRed" onclick="toggle('follow')">FOLLOW DOT</button>
				<button id="toggleFollow2" class="button buttonRed" onclick="toggle('follow2')">FOLLOW DOT 2</button>
				<button id="toggleDrag" class="button buttonRed" onclick="toggle('drag')">DRAG CIRCLE</button>
				<button class="button" onclick="toggles[0].Flip()">FLIP</button>
				<button class="button" onclick="Format('test')">FORMAT</button>
				<button class="button" onclick="Dump()">DUMP DATA</button>
				<button class="button" onclick="SetBackground('@Karasu2022rendercombined.jpg')">SET BACKGR.</button>
				<button class="button" onclick="RemoveBackground()">REMOVE BACKGR.</button>
				<button class="button" onclick="DrawGrid()">DRAW GRID</button>
				<button class="button" onclick="DrawBorder()">DRAW BORDER</button>
			</div>
			<br>
			<div style="display: flex; gap: 4px;">
				<button class="button" onclick="clear1()">CLEAR 1</button>
				<button class="button" onclick="clear()">CLEAR 2</button>
				<button class="button" onclick="polarTest(500, 500, 400, 35, 40, 0, '#000000')">POLAR TANGENT TEST</button>
				<button class="button" onclick="tangentTest()">TANGENT TEST</button>
				<button class="button" onclick="circumference(250, 250, 250, '#000000')">DRAW CIRCUM.</button>
				<button class="button" onclick="circumference(650, 650, 50, '#000000')">DRAW CIRCUM. 2</button>
				<button class="button" onclick="line(250, 250, 650, 650)">DRAW LINE</button>
				<button class="button" onclick="tangent(250, 250, 250, 650, 650, 50)">DRAW TANGENT</button>
				<button class="button" onclick="circle(250, 250, 25, '#000000')">DRAW CIRCLE</button>
				<button class="button" onclick="polar(250, 250, 250, 12, 10, 0, '#000000')">POLAR A</button>
				<button class="button" onclick="stereoA(250, 250, 1, 200, 2, '#000000')">STEREO A</button>
				<button class="button" onclick="stereoB(250, 250, 1, 200, 4, '#000000')">STEREO B</button>
				<button class="button" onclick="stereoA(250, 250, 1, 200, 3, '#AAAAFF')">STEREO C</button>
				<button class="button" onclick="DottedLine(250, 500, 750, 500)">DOTTED LINE</button>
				<button class="button" onclick="DashedLine(250, 600, 750, 600)">DOTTED LINE</button>
				<button class="button" onclick="LineTest()">LINE TEST</button>
				<button class="button" onclick="CrossTangent(250, 450, 250, 650, 850, 50)">CROSS TANGENT</button>
			</div>
			<br>
			<div style="display: flex; gap: 4px;">
				<button class="button" onclick="LoadCoordinates('Main_NPCs');">LOAD CSV 3</button>
				<button class="button" onclick="Arrow(500, 500, 0);">ARROW</button>
				<button class="button" onclick="Arrow(500, 600, 45);">ARROW 2</button>
				<button class="button" onclick="Arc(500, 500, 470, 0, 360)">ARC</button>
				<button class="button" onclick="Text('Test', 500, 500)">TEXT</button>
				<button class="button" onclick="DottedArc(500, 500, 490, 0, 360)">DOTTED ARC</button>
				<button class="button" onclick="DashedArc(500, 500, 360, 0, 45)">DASHED ARC</button>
				<button class="button" onclick="DashedArc(500, 500, 380, 0, 45); DashedArc2(500, 500, 360, 0, 45);">DASHED ARC 2</button>
				<button class="button" onclick="DashedCrossTangent(250, 450, 250, 650, 850, 50)">DASHED CROSS TANGENT</button>
				<button class="button" onclick="CrossTangentTest()">MULTI CROSS TANGENT</button>
				<button class="button" onclick="DashedCrossTangentTest()">MULTI CROSS TANGENT 2</button>
				<button class="button" onclick="ArcTest()">ARC TEST</button>
			</div>
			<br>
			<label for="input">Input:</label><input type="text" id="input" name="input"><button onclick="TakeApart()">Take apart</button>
			<br>
			<table>
				<tr>
					<td><label for="outputName">Name:</label></td>
					<td><input type="text" id="outputName" name="outputName"></td>
				</tr>
				<tr>
					<td><label for="outputX">X:</label></td>
					<td><input type="text" id="outputX" name="outputX"></td>
				</tr>
				<tr>
					<td><label for="outputY">Y:</label></td>
					<td><input type="text" id="outputY" name="outputY"></td>
				</tr>
				<tr>
					<td><label for="outputZ">Z:</label></td>
					<td><input type="text" id="outputZ" name="outputZ"></td>
				</tr>
			</table>
			<table>
				<tr>
					<td><input type="text" id="firstCoordinate"></td>
					<td><input type="text" id="secondCoordinate"></td>
					<td><button onclick="console.log(CoordinateDistance());">Calculate distance</button></td>
					<td><input type="text" id="outputDistance"></td>
				</tr>
			</table>
		</div>
		<br><br>
		<div>
			<!-- Here there would be a common input layer, on top of all. -->
			<div id="output2" class="canvas" style="z-index: -1;"><canvas id="canvas2"></canvas></div>
			<div id="output0" class="canvas" style="z-index: -2;"><canvas id="canvas0"></canvas></div>
			<div id="output"  class="canvas" style="z-index: -3;"><canvas id="canvas" ></canvas></div>
		</div>
		<div id="debug"></div>
	</body>
	<script>
		const canvas = document.getElementById("canvas");
		canvas.height = height;
		canvas.width = width;
		const ctx = canvas.getContext("2d");
		
		const canvas2 = document.getElementById("canvas2");
		canvas2.height = height;
		canvas2.width = width;
		const ctx2 = canvas2.getContext("2d");
		
		const canvas0 = document.getElementById("canvas0");
		canvas0.height = height;
		canvas0.width = width;
		const ctx0 = canvas0.getContext("2d");
		
		canvas2.addEventListener
		(
			"click",
			function(e)
			{
				var rect = e.target.getBoundingClientRect();
				var x = e.clientX - rect.left;
				var y = e.clientY - rect.top;
				
				if(toggles[FindToggle("test")].state == 1)			{colorCircle(x, y);}
				else if(toggles[FindToggle("dots")].state == 1)		{circle(x, y, 25, '#000000');}
			}
		);
		
		canvas2.addEventListener
		(
			"mousemove",
			function(e)
			{
				var rect = e.target.getBoundingClientRect();
				var x = e.clientX - rect.left;
				var y = e.clientY - rect.top;

				if(toggles[FindToggle("hover")].state == 1)			{colorCircle3(x, y);}
				else if(toggles[FindToggle("fuse")].state == 1)		{colorCircle4(x, y);}
				else if(toggles[FindToggle("fuse3")].state == 1)	{colorCircle6(x, y);}
				else if(toggles[FindToggle("fuse4")].state == 1)	{colorCircle7(x, y);}
				else if(toggles[FindToggle("follow")].state == 1)	{targetLiner2(500, 500, x, y);}
				else if(toggles[FindToggle("follow2")].state == 1)	{targetLiner3(500, 500, x, y);}
				else if(toggles[FindToggle("drawx")].state == 1)	{circle(x, y, 25, "#000000");}
				else if(toggles[FindToggle("dragx")].state == 1)	{circleMove(x, y, 25, "#000000");}
			}
		);
		
		canvas2.addEventListener
		(
			"mousedown",
			function(e)
			{
				var rect = e.target.getBoundingClientRect();
				var x = e.clientX - rect.left;
				var y = e.clientY - rect.top;
				
				if(toggles[FindToggle("draw")].state == 1)			{toggles[FindToggle("drawx")].state = 1;}
				else if(toggles[FindToggle("drag")].state == 1)		{toggles[FindToggle("dragx")].state = 1;}
			}
		);
		
		canvas2.addEventListener
		(
			"mouseup",
			function(e)
			{
				var rect = e.target.getBoundingClientRect();
				var x = e.clientX - rect.left;
				var y = e.clientY - rect.top;
				
				if(toggles[FindToggle("draw")].state == 1)			{toggles[FindToggle("drawx")].state = 0;}
				else if(toggles[FindToggle("drag")].state == 1)		{toggles[FindToggle("dragx")].state = 0;}
			}
		);
		
		class Circle
		{
			constructor(x, y, r)
			{
				this.x = x;
				this.y = y;
				this.r = r;
			}
		}
		
		class Circle2
		{
			constructor(x, y, r, distance, order)
			{
				this.x = x;
				this.y = y;
				this.r = r;
				this.distance = distance;
				this.order = order;
			}
		}
		
		class Toggle
		{
			constructor(name)
			{
				this.name = name;
				this.state = 0;
			}
			
			Flip(){this.state = this.state == 0 ? 1 : 0;}
		}
		
		const toggles = [];
		toggles.push(new Toggle("test"));
		toggles.push(new Toggle("hover"));
		toggles.push(new Toggle("dots"));
		toggles.push(new Toggle("draw"));
		toggles.push(new Toggle("drawx"));
		toggles.push(new Toggle("fuse"));
		toggles.push(new Toggle("fuse3"));
		toggles.push(new Toggle("fuse4"));
		toggles.push(new Toggle("follow"));
		toggles.push(new Toggle("follow2"));
		toggles.push(new Toggle("drag"));
		toggles.push(new Toggle("dragx"));

		const circles = [];
	</script>
</html>