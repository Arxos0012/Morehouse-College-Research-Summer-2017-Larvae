//in cm/s
var SPEED = 75;

//on a scale from 0-255 for motor power
var POW = 63;
var penMax =  63;

async function startProgram() {
	/* call function(s) where!*/
	
	
	
}


/*The sphero will rotate to face it's target destination. Then it will move
  to the desired location.
  
  Parameters:
  	locX - the x coordinate of the target destination (in cm)
	locY - the y coordinate of the target destination (in cm)
*/
async function travel(locX, locY){
	
	var angle = Math.atan2(locX - getLocation().x, locY - getLocation().y);
	var degrees = (angle / Math.PI) * 180;
	
	degrees = (degrees < 0) ? 360 + degrees : degrees;
	
	await spin(degrees, 1.0);
	resetAim(degrees);
	await delay(0.5);
	
	var distance = Math.sqrt(((locX - getLocation().x)**2) + ((locY - getLocation().y)**2));
	
	await roll(0, SPEED, distance/SPEED);
	
	/*Developer's note: Although we are not taking the robot's initial acceleration into account,
	it seems that at a speed of 75 cm/s (and possibly lower) the acceleration of the sphero has little
	impact on judging the distance it will realistically travel. There is some noticeable and fairly
	consistent undershotting. However, we are not sure if this truely a necessary concern as we are
	trying to simulate a scenario that doesn't require a high level of accuracy.*/
}


/*Will move the sphero in a sinusoidal pattern for a given duration.
  
  Parameters:
  durr - duration of time for which to run (in seconds)
*/
async function sine(durr){
	var start = getCurrentTime();
	while(getCurrentTime() - start <= durr){
		var heading = 30*Math.cos(2*(getCurrentTime() - start))
		heading = (heading < 0) ? 360 + heading : heading;
		await roll(heading, POW, .05);
	}
	
}


/*Will move the sphero in a circular pattern for a given duration.
  
  Parameters:
  durr - duration of time for which to run (in seconds)
*/
async function circle(durr){
	var heading = 0;
	var start = getCurrentTime();
	
	while(getCurrentTime() - start <= durr) {
		await roll(heading, POW, .05);
		heading = (heading + 5) % 360;
	}
}


/*The sphero move back and forth in an arc, speeding up and slowing down,
  mimicking the swing of a pendulum
  
  Parameters:
  durr - duration of time for which to run (in seconds)
  sweep = the angle of arc of the sphero's movement (in degrees)
*/
async function pendulum(durr, sweep) {
	var start = getCurrentTime();
	var offPeriod = false;
	
	var heading = 0;
	var hChange = 5;
	var dHeading = 0;
	
	while(getCurrentTime() - start <= durr){
		
		heading = (!offPeriod) ? heading + hChange : heading - hChange;
		dHeading += hChange;
		heading = (heading < 0) ? heading + 360 : heading % 360;
		
		var x = (Math.PI/2) * (heading / (sweep/2.0));
		var speed = penMax * (Math.sin(x)**2);
		
		await roll(heading, speed, .3);
		
		if(dHeading >= sweep){
			heading = (heading + 180) % 360;
			await spin(heading, .5);
			offPeriod = !offPeriod;
			dHeading = 0;
		}
	}
}

/* The sphero will move forward. Once it is certain of a change in elevation,
   the sphero will stop and change its main light to be red, indicating the
   end of the program.
   
   Parameters:
   	speed - the desired speed at which the robot will travel (has not been tested)
			[NOTE: speed is on a scale from 0 to 255]
*/
async function detechElevation(speed){
	setSpeed(63);
	setMainLed({ r: 0, g: 0, b: 255 });
	setBackLed(0);
	await delay(0.03);
	
	var vals =[[0,0],
			   [0,0],
			   [0,0],
			   [0,0],
			   [0,0],
			   [0,0],
			   [0,0],
			   [0,0],
			   [0,0],
			   [0,0]],
		
		avg = [0,0],
		lastPt = 0,
		currPt = 0,
		
		variance = [0,0],
		lambda = [0,0],
		ref = [0,0],
		refEstablished = false,
		
		count = 0,
		place = 0;
	
	while(true){
		await delay(0.001);
		place = count % 10;
		lastPt = vals[place];
		currPt = [getOrientation().pitch, getOrientation().roll];
		vals[place] = currPt;
		
		count++;
		
		avg[0] += (currPt[0] - lastPt[0])/10;
		avg[1] += (currPt[1] - lastPt[1])/10;
		
		if(!refEstablished){
			lambda[0] += ((currPt[0]**2) - (lastPt[0]**2))/10;
			lambda[1] += ((currPt[1]**2) - (lastPt[1]**2))/10;
			
			variance[0] = lambda[0] + (avg[0]**2);
			variance[1] = lambda[1] + (avg[1]**2);
			
			if(count >= 10 && variance[0] <= 100 && variance[1] <= 100){
				ref[0] = avg[0];
				ref[1] = avg[1];
				refEstablished = true;
				
				delete this.variance;
				delete this.lambda;
				continue;
			}
			continue;
		}
		
		if(Math.abs(avg[0] - ref[0]) > 20 || Math.abs(avg[1] - ref[1]) > 20) break;
	}

	setSpeed(0);
	setMainLed({ r: 255, g: 0, b: 0 });
	await delay(0.001);
}