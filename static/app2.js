/* Miha by Michael Harbach */

// Create global variable
var app;

// Recursive function: createApp
(function createApp(app) {

	// Enable strict mode
	'use strict';

	// Define the app as an object that includes the version number
	app = {
		version: '0.0.1'
	};

	// Set the width and height values based on the viewport
	app.width = window.innerWidth;
	app.height = window.innerHeight;

	// Set the camera's aspect ratio
	app.aspect = app.width / app.height;

	// Set the camera's vertical field of view (units of degrees)
	app.vfov = 45;

	// Set the camera's frustum planes
	app.nearFrustum = 0.01;
	app.farFrustum = 1000;

	// Create the scene
	app.scene = new THREE.Scene();

	// Create the clock and set it to start automatically when the first update is called
	app.clock = new THREE.Clock();
	app.clock.autoStart = true;

	// Create the main camera
	app.camera = new THREE.PerspectiveCamera(app.vfov, app.aspect, app.nearFrustum, app.farFrustum);

	// Create the renderer
	app.renderer = new THREE.WebGLRenderer({
		alpha: true,
		antialias: true
	});
	app.renderer.setPixelRatio(window.devicePixelRatio);
	app.renderer.setClearColor(new THREE.Color('black'), 0);
	app.renderer.setSize(app.width, app.height);
	app.renderIdentifier = '';

	// Create the staging containers
	app.lights = {};
	app.meshes = {};
	app.materials = {};
	app.geometries = {};
	app.colors = {};

	// Create the colors
	app.colors.white = new THREE.Color('white');
	app.colors.blue = new THREE.Color('blue');
	app.colors.chocolate = new THREE.Color('chocolate');

	// Create the origin
	app.origin = new THREE.Vector3(0, 0, 0);

	// Create the light
	app.lights.light = new THREE.PointLight(app.colors.white, 1, 100);

	// Create the ball
	app.materials.chocolate = new THREE.MeshPhongMaterial({color: app.colors.chocolate});
	app.geometries.sphere = new THREE.SphereGeometry(10, 32, 32);
	app.meshes.ball = new THREE.Mesh(app.geometries.sphere, app.materials.chocolate);

	// Resize function
	app.resize = function (event) {

		// Prevent default behavior
		if (event) {
			event.preventDefault();
		};

		// Update the width and height values based on the viewport
		app.width = window.innerWidth;
		app.height = window.innerHeight;

		// Update the aspect ratio
		app.aspect = app.width / app.height;

		// Update the camera's aspect ratio
		app.camera.aspect = app.aspect;
    	app.camera.updateProjectionMatrix();

		// Update the size of the renderer
		app.renderer.setSize(app.width, app.height);

		app.renderer.render(app.scene, app.camera);

	};

	// Create the render function
	app.render = function () {
		var delta = app.clock.getDelta();
		app.renderIdentifier = requestAnimationFrame(app.render);
		app.renderer.render(app.scene, app.camera);
	};

	// Attach event listeners
	window.addEventListener('resize', app.resize);
	window.addEventListener('orientationchange', app.resize, false);

	app.lights.light.position.set(0, 0, 50);

	// Adding objects to the scene
	app.scene.add(app.camera);
	app.scene.add(app.lights.light);
	app.scene.add(app.meshes.ball);

	// Positioning the camera
	app.camera.position.set(0, 0, 100);
	app.camera.lookAt(app.origin);
	app.camera.updateProjectionMatrix();

	// Done creating app
	app.render();

})(app);