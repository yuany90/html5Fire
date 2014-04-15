function particle(fireLocation, fireSize, baseLife,baseVy, color){
	this.set(fireLocation, fireSize, baseLife, color);
}

particle.prototype.set = function (fireLocation, fireSize, baseLife, baseVy, color){
	if(color == undefined){
		color = [145,53,0];
		//color = [21,37,167];
	} 
	if(fireLocation == undefined){
		fireLocation = {x:0, y:0};
	} 
	if(fireSize == undefined){
		fireSize = {x:30, y:20};
	}
	if(baseLife == undefined){
		baseLife = 20;
	}
	if(baseVy == undefined){
		baseVy = 10;
	}
	this.x = fireLocation.x - fireSize.x/2 + Math.random()*fireSize.x;
	this.y = fireLocation.y - fireSize.y/2 + Math.random()*fireSize.y;
	this.vx = -2.5+Math.random()*5;
	this.vy = - baseVy - 5 +Math.random()*10;
	this.radius = 10+Math.random()*20;
	this.life = baseLife+Math.random()*10;
	this.fade = this.life;
	this.color = color;
}

particle.prototype.draw = function (ctx) {
	ctx.save();
	ctx.beginPath();
	this.opacity = Math.round(this.fade/this.life*100)/100 ;
	var gradient = ctx.createRadialGradient(this.x, this.y, 0,
	this.x, this.y, this.radius);
	gradient.addColorStop(0, 'rgba('+ this.color.join(',') + ',' + this.opacity+')');
	gradient.addColorStop(0.2, 'rgba('+ this.color.join(',') + ',' + this.opacity+')');
	gradient.addColorStop(1, 'rgba(' + this.color.join(',') + ',0)');
	ctx.fillStyle = gradient;
	ctx.arc(this.x, this.y, this.radius, Math.PI*2, false);
	ctx.fill();
	ctx.restore();
}

