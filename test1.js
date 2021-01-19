let motorSamplePath = './h2_launch_control.mp3';

let makeElement = function(parent, className, innerHtml, style,element='div') {

	let	e = document.createElement(element);
	e.className = className;

	if (innerHtml) {
		e.innerHTML = innerHtml;
	}

	if (style) {
		for (var prop in style) {
			e.style[prop] = style[prop];
		}
	}

	parent.appendChild(e);
	
	return e;
};

let Progress = function Progress($elm){
	let $lt,$rt;
	
	this.setValue = function(percent) {
		let leftTransformerDegree = "0deg";
	  let rightTransformerDegree = "0deg";
	  if (percent >= 50) {
		leftTransformerDegree = "180deg";
		rightTransformerDegree = (percent - 50) * 3.6 + "deg";
	  } else {
		leftTransformerDegree = percent * 3.6 + "deg";
	  }
	  $lt.style.transform = "translateX(-50%) rotate("+leftTransformerDegree+") translateX(50%)";
	  $rt.style.transform = "translateX(50%) rotate("+rightTransformerDegree+") translateX(-50%)";
	};

	this.toggleRedzone={
		add:()=>{
			$lt.classList.add("redzone");
			$rt.classList.add("redzone");
		},
		remove:()=>{
			$lt.classList.remove("redzone");
			$rt.classList.remove("redzone");
		}
	}
	let circle1 = makeElement($elm,"circle1");
	circle1 = makeElement(circle1,"circle1-1");
	$lt = makeElement(circle1,"circle1-2");
	
	let circle2 = makeElement($elm,"circle2",);
	$rt = makeElement(circle2,"circle2-1");

}

let Meter = function Meter($elm,config){
    let $needle, $value;
    let steps = (config.valueMax - config.valueMin) / config.valueStep,
			angleStep = (config.angleMax - config.angleMin) / steps;
	
	let margin = 8; // in %
    let angle = 0; // in degrees
    
    let value2angle = function(value) {
		let angle = ((value / (config.valueMax - config.valueMin)) * (config.angleMax - config.angleMin) + 50);

		return angle;
	};
	
	this.setValue = function(v) {
		$needle.style.transform = "rotate(" + Math.round(value2angle(v)) + "deg)";
		$value.innerHTML = config.needleFormat(v);
    };
    
    makeElement($elm, "label label-unit", config.valueUnit);
    $needle = makeElement($elm, "bar");
    makeElement($elm, "barbottom1");
    makeElement($elm, "barbottom");
    for (let n=0; n < steps+1; n++) {
		let value = config.valueMin + n * config.valueStep;
		angle = config.angleMin + n * angleStep;
		
		// Graduation numbers
		
		// Red zone
		let redzoneClass = "";
		if (value > config.valueRed) {
			redzoneClass = " redzone";
        }
        let lt=50
        let pp ={
			left: (lt - (lt - margin-7) * Math.sin(angle * (Math.PI / 180))) + "%",
            top: (lt + (lt - margin-7) * Math.cos(angle * (Math.PI / 180))) + "%",
        }
        makeElement($elm, "grad grad--" + n + redzoneClass, config.labelFormat(value), pp);
        
        // Tick
		makeElement($elm, "grad-tick grad-tick--" + n + redzoneClass, "", {
			left: (lt - (lt-margin) * Math.sin(angle * (Math.PI / 180))) + "%",
			top: (lt + (lt-margin) * Math.cos(angle * (Math.PI / 180))) + "%",
			transform: "translate3d(-50%, 0, 0) rotate(" + (angle + 180) + "deg)"
		});

        // Half ticks
		angle += angleStep / 2;
		
		if (angle < config.angleMax) {
			makeElement($elm, "grad-tick grad-tick--half grad-tick--" + n + redzoneClass, "", {
				left: (lt - (lt - margin) * Math.sin(angle * (Math.PI / 180))) + "%",
				top: (lt + (lt - margin) * Math.cos(angle * (Math.PI / 180))) + "%",
				transform: "translate3d(-50%, 0, 0) rotate(" + (angle + 180) + "deg)"
			});
        }
        
        // Quarter ticks
		angle += angleStep / 4;
		
		if (angle < config.angleMax) {
			makeElement($elm, "grad-tick grad-tick--quarter grad-tick--" + n + redzoneClass, "", {
				left: (lt - (lt - margin) * Math.sin(angle * (Math.PI / 180))) + "%",
				top: (lt + (lt - margin) * Math.cos(angle * (Math.PI / 180))) + "%",
				transform: "translate3d(-50%, 0, 0) rotate(" + (angle + 180) + "deg)"
			});
        }
        
        angle -= angleStep / 2;
		
		if (angle < config.angleMax) {
			makeElement($elm, "grad-tick grad-tick--quarter grad-tick--" + n + redzoneClass, "", {
				left: (lt - (lt - margin) * Math.sin(angle * (Math.PI / 180))) + "%",
				top: (lt + (lt - margin) * Math.cos(angle * (Math.PI / 180))) + "%",
				transform: "translate3d(-50%, 0, 0) rotate(" + (angle + 180) + "deg)"
			});
        }
        
        
    }
    makeElement($elm, "label label-value", "<div>" + config.labelFormat(config.value) + "</div>" + "<span>" + config.labelUnit + "</span>");
    
    $value = $elm.querySelector(".label-value div");
}

let Charge = function Charge($elm){
	let prev,$icon,$value,value,interVal;
	let progress =new Progress($elm);
	let innerCircle = makeElement($elm,"inner-circle");
	let innerDiv = makeElement(innerCircle);
	this.setValue=function(v){
		if(v>=0 && v<=100){
			progress.setValue(v);
			value=v;
			$value.innerHTML = `${parseInt(v)}<i>%</i>`;
			let iconName = `fa-battery-${Math.round(v/100*4)}`;
			if(v<=25){
				progress.toggleRedzone.add();
				innerCircle.classList.add("redzone");	
			}else{
			progress.toggleRedzone.remove();
			innerCircle.classList.remove("redzone");	
	
			}
			
			if(prev !== iconName){
				$icon.classList.remove(prev);
				$icon.classList.add(iconName);
				prev=iconName;
			}
		}

	}
	this.charging={
		on:(callback)=>{
			$icon.innerHTML = "<i class='fa fa-rotate-90 fa-bolt charge-icon'></i>";
			interVal = setInterval(()=>{
				if(value+.5 <=100){
					this.setValue(value+.5);
					callback(value+.5);
				}
			},2000)
		},
		off:()=>{
			$icon.innerHTML=""
			clearInterval(interVal)
		}
	}
	$icon = makeElement(innerDiv,"fa fa-rotate-270 charge-display","","","i");
	
	$value = makeElement(innerDiv,"","0<i>%</i>","","span");
}


document.addEventListener("DOMContentLoaded",()=>{
    let meter =new Meter(document.querySelector(".meter"),{
		value: 0,
		valueMin: 0,
		valueMax: 220,
        valueStep: 20,
        valueRed:165,
		valueUnit: "<span>Speed</span><div>Km/h</div>",
		angleMin: 95,
        angleMax:265,
		labelUnit: "Km/h",
		labelFormat: function(v) { return Math.round(v); },
		needleFormat: function(v) { return Math.round(v); }
    });

	let charge = new Charge(document.querySelector(".charge"));
    document.onkeydown=keyDown;
    document.onkeyup = keyUp;

    function keyDown(e){
        e=e||window.event;
        if (e.keyCode == '38') { 			// up arrow
			isAccelerating = true;
		}
		else if (e.keyCode == '40') { // down arrow
			isBraking = true;
		}
    }
    function keyUp(e){
        e=e||window.event;
        if (e.keyCode == '38') {			// up arrow
			isAccelerating = false;
		}
		else if (e.keyCode == '40') { // down arrow
			isBraking = false;
		}
    }

    function gearUp() {
		if (gear < gears.length - 1) {
			gear++;
		}
	}

	function gearDown() {

		if (gear > 1) {
			gear--;
		}
    }
    // VEHICLE CONFIG

	let 
    mass = 1000,
    cx = 0.28,
    gears = [0, 0.4, 0.7, 1.0, 1.3, 1.5, 1.68],
    transmitionRatio = 0.17,
    transmitionLoss = 0.15,
    wheelDiameter = 0.5,
    brakeTorqueMax = 300,

    gear = 1,
	speed = 0,	// in km/h
	speedRed=180,
    overallRatio,
    wheelRpm,
    wheelTorque,
    brakeTorque,
    resistance,
    acceleration;

// MOTOR CONFIG

let 
    rpmIdle = 0,
    rpmMax = 8000,
    rpmRedzone = 6500,
    torqueMin = 20, // in m.kg
    torqueMax = 45, // in m.kg

    torque,
    rpm = 0,
    isAccelerating = false,
    isBraking = false;

    let lastTime = new Date().getTime(),
    nowTime,
    delta;
	
	// BATTERY CONFIG

	let soc=50;
	// Helper functions
	
	charge.setValue(soc);

    // Helper functions
	
	let torqueByRpm = function(rpm) {
		let torque = torqueMin + (rpm / rpmMax) * (torqueMax - torqueMin);
		return torque;
	};
	
	function kmh2ms(speed) {	// Km/h to m/s
		return speed / 3.6;
    }
    
    (function loop(){
		window.requestAnimationFrame(loop);

		// Delta time
		nowTime = new Date().getTime();
		delta = (nowTime - lastTime) / 1000; // in seconds
		lastTime = nowTime;
		
		let oldSpeed = speed,
				oldRpm = rpm;
		
		// Torque
		
		if (isAccelerating && rpm < rpmMax && soc>=1) {	// Gas!
			torque = torqueByRpm(rpm);

		} else {
			torque = -(rpm * rpm / 1000000);
		}
		
		if (isBraking) {	// Ooops...
			brakeTorque = brakeTorqueMax;
		} else {
			brakeTorque = 0;
		} 
		
		
		overallRatio = transmitionRatio * gears[gear];
		wheelTorque = torque / overallRatio - brakeTorque;
		
		acceleration = 20 * wheelTorque / (wheelDiameter * mass / 2);
		resistance = 0.5 * 1.2 * cx * kmh2ms(speed)^2;

		// Speed
		
		speed += (acceleration - resistance) * delta;
		
		
		if (speed < 0) { speed = 0; }
		
		wheelRpm = speed / (60 * (Math.PI * wheelDiameter / 1000));
		rpm = speed / (60 * transmitionRatio * gears[gear] * (Math.PI * wheelDiameter / 1000));

		// Idle
		if (rpm < rpmIdle) {
			rpm = oldRpm;
			speed = oldSpeed;
		}
		// Gear shifter
		if (rpm > rpmRedzone) {
			gearUp()
		}else if(rpm <= rpmIdle+10 || isBraking){
			gearDown()
		}
		if(speed>= speedRed ){
			document.querySelector(".bar").classList.add('redzone')
			document.querySelector(".barbottom").classList.add('redzone')
		} 
		else {
			document.querySelector(".bar").classList.remove('redzone')
			document.querySelector(".barbottom").classList.remove('redzone')
		}

		//update charge GUI
		if(acceleration>0){
			let reducedSoc = soc - (acceleration*0.0001).toFixed(3);
			if(reducedSoc>=0){
				soc=reducedSoc;
				charge.setValue(soc);
			}
		}
		
		// Update GUI
		
		meter.setValue(speed);
		// rpmMeter.setValue(rpm);

		// Update engine sound
		if (source) {
			source.playbackRate.value = rpm / 4000;
		}

		if (source2) {
			source2.playbackRate.value = speed / 4500;
		}

	})();

	var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	var source,source2,
			gainNode;
	var songLength;

	var loader = document.querySelector('.loader');
	var btnVolume = document.getElementById('btn-volume');
	let btnCharge = document.getElementById('btn-charge');

	// use XHR to load an audio track, and
	// decodeAudioData to decode it and stick it in a buffer.
	// Then we put the buffer into the source

	function getData() {
		source = audioCtx.createBufferSource();
		source2 = audioCtx.createBufferSource();
		let request = new XMLHttpRequest();

		request.open('GET', motorSamplePath, true);
		request.responseType = 'arraybuffer';

		request.onload = function() {
			var audioData = request.response;

			audioCtx.decodeAudioData(audioData, function(buffer) {
				let myBuffer = buffer;	// local buffer ?
				let myBuffer2 = buffer;
//				songLength = buffer.duration; // in seconds
				source.buffer = myBuffer;
				source2.buffer = myBuffer2;

				source.loop = true;
				source2.loop = true;

				// Hacky granular engine sound!
				source.loopStart = 0.1; // Tune this
				source.loopEnd = 0.1735; // Tune this

				source2.loopStart = 0.605;
				source2.loopEnd = 0.650;
				
				source.playbackRate.value = 1;
				source2.playbackRate.value = 1;

				// Create a gain node.
				gainNode = audioCtx.createGain();
				// Connect the source to the gain node.
				source.connect(gainNode);
				source2.connect(gainNode);
				// Connect the gain node to the destination.
				gainNode.connect(audioCtx.destination);

				// Remove loader
				loader.classList.remove('active');
			},

				function(e){"Error with decoding audio data" + e.err});
		}

		request.send();
	}

	// wire up buttons

	btnVolume.onclick = function() {
		this.classList.toggle('active');

		if (this.classList.contains('active')) {
			gainNode.gain.value = 1;
		} else {
			gainNode.gain.value = 0;
		}
	}

	btnCharge.onclick = function() {
		this.classList.toggle('active');
		if (this.classList.contains('active')) {
			charge.charging.on((currentSoC)=>soc=currentSoC);
		} else {
			charge.charging.off();
		}
	}

	// Load the sample
	getData();
	// Launch loop playing
	source.start(0);
	source2.start(0);
})