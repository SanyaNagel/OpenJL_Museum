const URL = "./"

function loadObj(mtlURL, objURL, setPosition) {
	const objLoader = new THREE.OBJLoader();
	const mtlLoader = new THREE.MTLLoader();
	mtlLoader.load(mtlURL, (materials) => {
		materials.preload();
		objLoader.setMaterials(materials);
		
		objLoader.load(objURL, setPosition);
	})
}

function main() {
	var scene = new THREE.Scene();
	scene.background = new THREE.Color(0x1B103F);

	const FOV = 90;
	const ASPECT = window.innerWidth/window.innerHeight;
	const NEAR = 0.1;
	const FAR = 100;
	
	var camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);
    camera.position.z = -5;
    camera.position.y = 15;

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	document.body.appendChild(renderer.domElement);

	// Camera controls
    const controls 
    = new THREE.OrbitControls(camera, renderer.domElement);
	controls.update();
	
	// Floor
	const planeSize = 20;
	const textureLoader = new THREE.TextureLoader();
	
	const floorTexture = textureLoader.load(URL + "models/textures/parket.jpg");
	floorTexture.wrapS = THREE.RepeatWrapping;
	floorTexture.wrapT = THREE.RepeatWrapping;
	floorTexture.magFilter = THREE.NearestFilter;
	
	const repeats = 6;
	floorTexture.repeat.set(repeats, repeats);

	const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
	const planeMat = new THREE.MeshPhongMaterial({
		map: floorTexture,
		side: THREE.DoubleSide,
	});
	
	const floor = new THREE.Mesh(planeGeo, planeMat);
	floor.rotation.x = Math.PI * -0.5;
	floor.position.set(0, 0.1, 0);
	floor.receiveShadow = true;
	
	scene.add(floor);

    // Стена
    function Wall(p1,p2,p3,rx,ry,rz){
        const textureLoaderWloo = new THREE.TextureLoader();

        const floorTextureWloo = textureLoaderWloo.load(URL + "models/textures/Woll.jpg");
        floorTextureWloo.wrapS = THREE.RepeatWrapping;
        floorTextureWloo.wrapT = THREE.RepeatWrapping;
        floorTextureWloo.magFilter = THREE.NearestFilter;

        floorTextureWloo.repeat.set(3, 3);

        const planeGeoWloo = new THREE.PlaneBufferGeometry(20, 7);
        const planeMatWloo = new THREE.MeshPhongMaterial({
            map: floorTextureWloo,
            side: THREE.DoubleSide,
        });

        const wloo = new THREE.Mesh(planeGeoWloo, planeMatWloo);
        wloo.rotation.y = ry;
        wloo.rotation.x = rx;
        wloo.rotation.z = rz;
        wloo.position.set(p1,p2,p3);
        wloo.receiveShadow = true;

        scene.add(wloo);
    }

    Wall(10, 3.6, 0,  0,Math.PI * -0.5,0);
    Wall(0, 3.6, 10,  0,0,0);

    function drawSheep(p1,p2,p3){
        var geometry = new THREE.SphereGeometry(0.4, 32, 32);
        var material = new THREE.MeshBasicMaterial({
            color: 0x27e2e4
        });
        var sphere = new THREE.Mesh( geometry, material );
        
        sphere.position.set(p1,p2,p3)
        scene.add( sphere );
    }

    function light(p1,p2,p3,i){
        var lampLightIntensity = i;
        var lampLightDistance = 100;

        const lampLight1 = new THREE.PointLight( 0xffffff, lampLightIntensity,
            lampLightDistance);
        lampLight1.position.set(p1,p2,p3);
        lampLight1.castShadow = true;
        scene.add(lampLight1);
    }

    //var ii = 1.3
    //var ij = 
    for (let i = -4; i < 13; i=i+6){ 
        drawSheep(10,6,-2+i);
        if(i+6 < 13){
            light(8, 5, -3.5+i,0.5);
        }else{
            light(8, 5, -4.5+i,0.3);
        }
    }

    for (let i = -4; i < 13; i=i+6){ 
        drawSheep(-2+i,6,10);
        if(i+6 < 13){
            light(-3.5+i, 5, 8,0.5);
        }else{
            light(8, 5, -3.5+i,0.5);
        }
        //light(-2+i, 4.5, 10,ii+(i/5));
    }

	
    
    // Mesh_Beagle  10592
    loadObj(URL + "models/10448.mtl", URL + "models/10448.obj",
    (bik) => {
        //
        bik.traverse(function(child) {
            child.castShadow = true;
            child.receiveShadow = true;
            //needsUpdate=true;
        });
        bik.rotation.y = -Math.PI / 2;

        bik.position.set(6, 0.1, -2.5);
        bik.scale.set(50.1, 50.1, 50.1);
        scene.add(bik);
    });

    loadObj(URL + "models/10592.mtl", URL + "models/10592.obj",
    (stat) => {
        //
        stat.traverse(function(child) {
            child.castShadow = true;
            child.receiveShadow = true;
            //needsUpdate=true;
        });
        stat.rotation.y = -Math.PI / 2;
       
        stat.position.set(6, 0.1, 1.5);
        stat.scale.set(9.1, 9.1, 9.1);
        scene.add(stat);
    });

    loadObj(URL + "models/azer.mtl", URL + "models/azer.obj",
    (stat) => {
        //
        stat.traverse(function(child) {
            child.castShadow = true;
            child.receiveShadow = true;
            //needsUpdate=true;
        });
        stat.rotation.y = -Math.PI/2;
       
        stat.position.set(10.15, 4.6, -4);
        stat.scale.set(0.01, 0.01, 0.01);
        scene.add(stat);
    });
    
   
function drowEdgePicte(p1,p2,p3, rx,ry,rz, h = 3){
    var radius = 0.05;
    var height = h;
    var fiberGeometry1 = new THREE.CylinderGeometry(radius,
        radius, height);
    var fiberMaterial1 = new THREE.MeshPhongMaterial({
        color: 0xff0000,
    });
    var p = new THREE.Mesh(fiberGeometry1, fiberMaterial1);
    p.rotation.x = rx;
    p.rotation.y = ry;
    p.rotation.z = rz;
    p.position.set(p1, p2,p3);
    scene.add(p);
}

 function drowPict(x=0, y=0, z=0,srcPict='models/k1.jpg',r1=0,r2=0,r3=0 ) {
    drowEdgePicte(x,y+1.5,z,  r1,r2,-Math.PI/2+r3,2);
    //drowEdgePicte(x-1,y,z,    0,0,0);
    drowEdgePicte(x,y-1.5,z,  r1,r2,-Math.PI/2+r3,2);
    //drowEdgePicte(x+1,y,z,    r1,r2,r3);

    //Отрисовка картинки
    var geometry = new THREE.BoxBufferGeometry(0.05,3,2);
    var material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture(srcPict,THREE.SphericalRefractionMapping) } );
    var eyeball = new THREE.Mesh( geometry, material );
    eyeball.position.set(x, y,z);
    eyeball.rotation.y = -Math.PI/2 + r2;
    eyeball.rotation.x = r1;
    eyeball.rotation.z = r3;
    eyeball.overdraw = true;
    eyeball.castShadow = true;
    scene.add( eyeball );

}
drowPict(2, 5, 10);
drowPict(10, 5, 3,'models/mona.jpg',0,-Math.PI/2,0);
       // adding ambient light
//const ambient_light = new THREE.AmbientLight(0xffffff, 1)
//scene.add(ambient_light)
	
var animate = function() {
		requestAnimationFrame(animate);

		controls.update();

		renderer.render(scene, camera);
	}

	animate();
}

main();
