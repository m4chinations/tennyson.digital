let lissa = function() {

var scene = new THREE.Scene();

var SCREEN_WIDTH = 150, SCREEN_HEIGHT = 150
var VIEW_ANGLE = 20, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 2000;
var camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );


var renderer = new THREE.WebGLRenderer({ alpha: true } );
renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
renderer.domElement.id = 'lissa';
document.body.appendChild( renderer.domElement );


let lissa = function() {
  this.nx = 2; this.ny = 3; this.nz = 4;
  this.render = function(t, d, s) {
    return [
      s * Math.cos(this.nx * t + d),
      s * Math.cos(this.ny * t + d),
      s * Math.cos(this.nz * t)
    ];
  }
};

let steps = 200;

let l1 = new lissa();

let vertices = new Float32Array(steps * 3);

for (var i = 0; i < steps; i ++ ) {
  let p = l1.render(THREE.Math.lerp(0, 2 * Math.PI, i / (steps-1)), 1.6, 10.0);
  vertices[i * 3] = p[0];
  vertices[i * 3 + 1] = p[1];
  vertices[i * 3 + 2] = p[2];
}

//create a blue LineBasicMaterial
var material = new THREE.LineBasicMaterial( { color: 'dodgerblue', linewidth: 1, lights: false } );


var geometry = new THREE.BufferGeometry();
// create a simple square shape. We duplicate the top left and bottom right
// vertices because each vertex needs to appear once per triangle.

// itemSize = 3 because there are 3 values (components) per vertex
geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

var line = new THREE.Line( geometry, material );
scene.add( line );
renderer.render( scene, camera );


let d = 1.6;
let speed = 0.015;



function animate() {
 window.requestAnimationFrame(animate);
  d += speed;

  for (var i = 0; i < steps; i ++ ) {
    let p = l1.render(THREE.Math.lerp(0, 2 * Math.PI, i / (steps-1)), d, 10.0);
    vertices[i * 3] = p[0];
    vertices[i * 3 + 1] = p[1];
    vertices[i * 3 + 2] = p[2];
  }

  line.geometry.attributes.position.needsUpdate = true;


  line.rotateY(0.01);

 renderer.render( scene, camera );
} animate();

/* click to randomize... disable for now */

/* 
renderer.domElement.addEventListener('click', function() {
  l1.nx = Math.floor(Math.random() * 9) + 1;
  l1.ny = Math.floor(Math.random() * 9) + 1;
  l1.nz = Math.floor(Math.random() * 9) + 1;
});
*/

/* debug */
/*
window.onload = function() {
  var gui = new dat.GUI();
  gui.add(l1, 'nx', 1, 10).step(1);
  gui.add(l1, 'ny', 1, 10).step(1);
  gui.add(l1, 'nz', 1, 10).step(1);
  gui.add({speed: speed}, 'speed', 0.001, 0.2).onChange(function(v) { speed = v; });
};
*/

}
lissa();
