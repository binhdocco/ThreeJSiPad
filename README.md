ThreeJSiPad
===========

Optimize Threejs to work on iPad (iOS 6.0 or above) without crashing when going in/out.

0.0.1
	Initial version 0.0.1
	Add Threejs.js r59.
	Add Detector.js.
	Add ColladaLoader.js.
	Add TrackballControls.js.
	
	Create Helloworld sample.
	Usage:
		<body>

			<input type="button" onclick="resetWebGL()" value="RESET"></input>
	
			<div id="webglContainer"></div>
			<script src="../mrdoob/three.min.js"></script>
			<script src="../mrdoob/loaders/ColladaLoader.js"></script>
			<script src="../mrdoob/Detector.js"></script>		
			<script src="webgl.js"></script>
			
			<script>
				webgl_init();
				function resetWebGL() {
					webgl_dispose();
					webgl_init();
				}
			</script>
			
		</body>
	
	Create ColladaLoader sample.
	Usage:
		<body>

			<input type="button" onclick="resetWebGL()" value="RESET"></input>
	
			<div id="webglContainer"></div>
			<script src="../mrdoob/three.min.js"></script>
			<script src="../mrdoob/controls/TrackballControls.js"></script>
			<script src="../mrdoob/loaders/ColladaLoader.js"></script>
			<script src="../mrdoob/Detector.js"></script>		
			<script src="webgl.js"></script>
			
			<script>
				webgl_initLoader();
				function resetWebGL() {
					webgl_dispose();
					webgl_initLoader();
				}
			</script>
			
		</body>
