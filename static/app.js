'use strict';
var scene, clock, camera, renderer, renderIdentifier;

scene = new THREE.Scene();

clock = new THREE.Clock();
clock.autoStart = true;

camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);
camera.position.set(0, 0, 100);
camera.lookAt(new THREE.Vector3(0, 0, 0));
camera.updateProjectionMatrix();
scene.add(camera);

renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(new THREE.Color('black'), 0);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', resize, false);
window.addEventListener('orientationchange', resize, false);
function resize(event) {
	event.preventDefault();
	camera.aspect =  window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.render(scene, camera);
}

function render() {
	var delta = clock.getDelta();
	renderIdentifier = requestAnimationFrame(render);
	renderer.render(scene, camera);
}

function stopRendering() {
	cancelAnimationFrame(renderIdentifier);
};

render();

// Scene
var light, ball, axis, cursor, ambient;
light = new THREE.PointLight(new THREE.Color('white'), 1, 100);
light.position.set(0, 0, 50);
scene.add(light);
ball = new THREE.Mesh(new THREE.SphereGeometry(10, 32, 32), new THREE.MeshPhongMaterial({color: new THREE.Color('blue')}));
scene.add(ball);
axis = new THREE.AxisHelper(50);
scene.add(axis);
cursor = ball.clone();
scene.add(cursor);
ambient = new THREE.AmbientLight(new THREE.Color('white'));
scene.add(ambient);

// Detection
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

window.addEventListener('mousemove', mouseMove, false);
function mouseMove(event) {
	event.preventDefault();
	var x = event.pageX || event.clientX;
	var y = event.pageY || event.clientY;
	mouse.x = (x / window.innerWidth) * 2 - 1;
	mouse.y = -(y / window.innerHeight) * 2 + 1;
	// var vector = new THREE.Vector3();
	// vector.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0);
	// vector.unproject(camera);
	// var dir = vector.sub(camera.position).normalize();
	// var distance = -camera.position.z / dir.z;
	// var pos = camera.position.clone().add(dir.multiplyScalar(distance));
	// cursor.position.set(pos.x, pos.y, pos.z);
}

function getIntersects() {
	raycaster.setFromCamera(mouse, camera);
	return raycaster.intersectObjects(scene.children);
	// var intersects = raycaster.intersectObjects(scene.children);
	// for (var i = 0; i < intersects.length; ++i) {
	// 	var object = intersects[i].object;
	// };
}