if ( ! System.support.webgl ) {

	alert( 'WebGL Support is Required!' );

	throw new Error( 'WebGL must be enabled' );

};

var clock = new THREE.Clock();
clock.autoStart = true;

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera();
camera.near = 0.01;
camera.far = 100;
camera.fov = 45;
camera.aspect = window.innerWidth / window.innerHeight;

var renderer = new THREE.WebGLRenderer({
	alpha: true,
	antialias: true,
	depth: true,
	stencil: true,
	premultipliedAlpha: true,
	logarithmicDepthBuffer: false
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setClearColor( new THREE.Color('black'), 0 );
renderer.setSize(window.innerWidth, window.innerHeight);

var ambient = new THREE.AmbientLight(new THREE.Color('white'));
var ball = new THREE.Mesh(new THREE.SphereGeometry(10, 32, 32), new THREE.MeshPhongMaterial({color: new THREE.Color('blue')}));
var light = new THREE.PointLight(new THREE.Color('white'), 1, 100);
light.position.set(0, 0, 50);

scene.add(camera);
// scene.add(ambient);
scene.add(ball);
scene.add(light);

var text;
var loader = new THREE.FontLoader();
loader.load('static/helvetiker_regular.typeface.json', function (font) {

	var size = 10;
	var height = 1;

    var textGeo = new THREE.TextGeometry("Miha", {
        font: font,
        size: size,
        height: height,
        curveSegments: 12,
        bevelThickness: 1,
        bevelSize: 1,
        bevelEnabled: true
    });

    var textMaterial = new THREE.MeshPhongMaterial({color: new THREE.Color('chocolate')});

    var mesh = new THREE.Mesh(textGeo, textMaterial);
    mesh.position.set(0, 0, 0);

    text = mesh;

    scene.add(text);

} );

camera.position.set(0, 0, 100);
camera.lookAt(new THREE.Vector3(0, 0, 0));
camera.updateProjectionMatrix();

$('body').append(renderer.domElement);

window.addEventListener( 'resize', onResize );
window.addEventListener( 'orientationchange', onResize, false );

function onResize(event) {
	if (event) {
		event.preventDefault();
	};
	camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.render(scene, camera);
};

var renderIdentifier;

function render() {
	var delta = clock.getDelta();
	renderIdentifier = requestAnimationFrame(render);
	renderer.render(scene, camera);
};

render();

// setInterval(function () {
// 	text.rotateX(.1);
// 	text.rotateY(.1);
// 	text.rotateZ(.1);
// }, 100);