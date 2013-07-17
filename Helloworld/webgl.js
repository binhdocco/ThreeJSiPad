if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container;

var camera, scene, renderer, objects;
var particleLight, pointLight;
var showLog = true;
var loopId;
var didDispose = false;

//init();

 function webgl_dispose() { 
 	if (!didDispose) {
		log("dispose");
		didDispose = true;		
		window.cancelAnimationFrame(loopId);
		if (renderer) {
			if (renderer.domElement) container.removeChild(renderer.domElement);
		}
	}
}

function webgl_onEnterFrame() {
	
}

function webgl_createObjects() {
	//To use enter the axis length
	webgl_debugAxis(4);
	
	var geometry = new THREE.CubeGeometry(1,1,1);
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	var cube = new THREE.Mesh( geometry, material );
	scene.add( cube );
}

function webgl_init() {
	log("init ...");
	didDispose = false;
	container = document.getElementById( 'webglContainer' );
	//log("create camera ...");
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.set( 10, 2, 10 );
	//log("create scene ...");
	scene = new THREE.Scene();
	camera.lookAt( scene.position );
	//log("create objects ...");
	webgl_createObjects();
	
	//log("create lights ...");
	webgl_createLights();
	
	//log("create renderer ...");
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );

	container.appendChild( renderer.domElement );
	log("init completed");
	webgl_animate();
}

function webgl_createLights() {
	scene.add( new THREE.AmbientLight( 0xcccccc ) );
	var directionalLight = new THREE.DirectionalLight(/*Math.random() * 0xffffff*/0xeeeeee );
	directionalLight.position.x = Math.random() - 0.5;
	directionalLight.position.y = Math.random() - 0.5;
	directionalLight.position.z = Math.random() - 0.5;
	directionalLight.position.normalize();
	scene.add( directionalLight );
	pointLight = new THREE.PointLight( 0xffffff, 4 );
	pointLight.position.set(0,0,0);
	scene.add( pointLight );
}

function webgl_animate() {
	loopId = requestAnimationFrame( webgl_animate );
	webgl_onEnterFrame();
	webgl_render();
}

function webgl_render() {

	var timer = Date.now() * 0.0005;
	camera.position.x = Math.cos( timer ) * 10;
	camera.position.y = 2;
	camera.position.z = Math.sin( timer ) * 10;
	camera.lookAt( scene.position );
	
	
	renderer.render( scene, camera );
}

function log(msg) {
	if (showLog) console.log("[webgl logger] msg: " + msg);
}

function webgl_debugAxis(axisLength){
    if (showLog) scene.add(new THREE.AxisHelper(axisLength));
};


