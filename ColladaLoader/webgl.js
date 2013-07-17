if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container;
var camera, scene, renderer, objects;
var particleLight, pointLight;
var showLog = true;
var loopId;
var didDispose = false;
var cameraController;
var dae;
var colladaURL = "./model/MD_object_v2.dae";

function webgl_resetVars(){
	didDispose = false;
}
function webgl_initLoader() {
	log("start loading COLLADA obj...");
	var loader = new THREE.ColladaLoader();
	//loader.options.convertUpAxis = true;
	loader.load( colladaURL, function ( collada ) {
		log("finish loading COLLADA obj");
		dae = collada.scene;
		dae.scale.x = dae.scale.y = dae.scale.z = 0.02;
		//dae.updateMatrix();
		webgl_init();	

	} );
}


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
	if (cameraController) cameraController.update();
}

function webgl_createObjects() {
	//To use enter the axis length
	webgl_debugAxis(10);	
	scene.add( dae );
}

function webgl_init() {
	log("init ...");
	log("reset vars");
	webgl_resetVars();
	
	container = document.getElementById( 'webglContainer' );
	//log("create camera ...");
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set( 0, 0, 20 );
	cameraController = new THREE.TrackballControls(camera);
	cameraController.noZoom = true;
	cameraController.noPan = true;
	cameraController.noRoll = true;
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
		scene.add( new THREE.AmbientLight( 0x000000) );		
		var directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1.2);		
		directionalLight.position.set(0, 10, -1);
		scene.add(directionalLight);		
		webgl_addLightDirectionHelper(directionalLight, .7);
		
		directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1.2);		
		directionalLight.position.set(0, -10, 1);
		scene.add(directionalLight);		
		webgl_addLightDirectionHelper(directionalLight, .7);
		
		directionalLight = new THREE.DirectionalLight(0xFFFFFF, .9);		
		directionalLight.position.set(-10, 0, 1);
		scene.add(directionalLight);		
		webgl_addLightDirectionHelper(directionalLight, .5);
		
		directionalLight = new THREE.DirectionalLight(0xFFFFFF, .9);		
		directionalLight.position.set(10, 0, -1);
		scene.add(directionalLight);		
		webgl_addLightDirectionHelper(directionalLight, .5);
		
		directionalLight = new THREE.DirectionalLight(0xFFFFFF, .7);		
		directionalLight.position.set(0, 1, -10);
		scene.add(directionalLight);		
		webgl_addLightDirectionHelper(directionalLight, .3);
		
		directionalLight = new THREE.DirectionalLight(0xFFFFFF, .7);		
		directionalLight.position.set(0, -1, 10);
		scene.add(directionalLight);		
		webgl_addLightDirectionHelper(directionalLight, .3);
		
		var pointLight = new THREE.PointLight(0x999999, 3);		
		pointLight.position.set(3, 3, 3);
		scene.add(pointLight);		
		webgl_addLightPointLightHelper(pointLight, .2);
		
		pointLight = new THREE.SpotLight (0x999999, 3);		
		pointLight.position.set(-3, -3, -3);
		scene.add(pointLight);		
		webgl_addLightPointLightHelper(pointLight, .2);
		
	}
	
function webgl_addLightDirectionHelper(light, size){
	if (showLog) {	
		scene.add(new THREE.DirectionalLightHelper(light, size));
	}
}

function webgl_addLightPointLightHelper(light, size){
	if (showLog) {	
		scene.add(new THREE.PointLightHelper(light, size));
	}
}

function webgl_animate() {
	loopId = requestAnimationFrame( webgl_animate );
	webgl_onEnterFrame();
	webgl_render();
}

function webgl_render() {	
	renderer.render( scene, camera );
}

function log(msg) {
	if (showLog) console.log("[webgl logger] msg: " + msg);
}

function webgl_debugAxis(axisLength){
    if (showLog) scene.add(new THREE.AxisHelper(axisLength));
};

