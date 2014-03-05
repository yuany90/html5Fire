html5Fire
=========

html5 canvas fire simulation

Controls
--------
- Click to trigger sound on and off
- MouseOver to blaze fire
<body>
    <canvas id="canvas" width="480" height="480"></canvas>
	<audio id="sound" autoplay loop>
		<source src="fireBurn.ogg">
		<source src="fireBurn.mp3">
	 </audio>
	<style>
		*{
			margin:0 auto;
			padding:0;
		}
	</style>
    <script src="animate.js"></script>
    <script src="particle.js"></script>
    <script>
	  window.onload = function () {
	    var sound =document.getElementById("sound");
		sound.volume=0.02;
		sound.muted = true;
		
		var canvas = document.getElementById("canvas");
		var ctx = canvas.getContext("2d");
		var W = canvas.width, H = canvas.height;
		
		var particles = [];
		var numParticles = 200;
		
		var fireLocation = {x:W/2, y:H/2};
		var fireSize = {x:30, y:20};
		var fireLocations = [];
		var baseLife = 20;
		var baseVy = 10;
		
		for(var i = 0; i<numParticles; i++){
			particles.push(new particle(fireLocation, fireSize, baseLife, baseVy));
		}
		
		numParticles = 100;
		function handleParticle (particle){
			particle.fade--;
			particle.radius--;
			particle.x+=particle.vx;
			particle.y+=particle.vy;
			if(particle.fade < 0 || particle.radius < 0){
				particle.set(fireLocation, fireSize, baseLife, baseVy);
			}
		}
		
		canvas.addEventListener("mousemove", mouseMove, false);
		function mouseMove(e){
			if(fireLocation.x <= e.pageX+10  && fireLocation.y <= e.pageY+20
			&& fireLocation.x >= e.pageX-10  && fireLocation.y >= e.pageY-50){
				fireSize = {x:60, y:40};
				baseLife = 50;
				baseVy = 15;
				numParticles = 200;
				sound.volume=0.2;
			} else{
				fireSize = {x:40, y:20};
				baseLife = 20;
				baseVy = 10;
				numParticles = 100;
				sound.volume=0.05;
			}
	    }
		
		var soundText= "Sound: Off";
		canvas.addEventListener("click", mouseClick, false);
		function mouseClick(e){
			if(sound.muted == true){
				soundText= "Sound: On";
			} else {
				soundText= "Sound: Off";
			}
			sound.muted = !sound.muted;
		}
		
		(function drawFrame () {
			window.requestAnimationFrame(drawFrame, canvas);
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			
			ctx.globalCompositeOperation = "source-over";
			ctx.fillStyle = "black";
			ctx.beginPath();
			ctx.rect(0,0,canvas.width, canvas.height);
			ctx.fill();
			
			ctx.font="18px Georgia";
			ctx.fillStyle="white";
			ctx.fillText(soundText,370,30);
			
			ctx.globalCompositeOperation = "lighter";
			for(var i = 0; i<numParticles; i++){
				particles[i].draw(ctx);
				handleParticle(particles[i]);
			}
		  }());

	  }
    </script>
  </body>
