// import vertex from './shaders/vertexShader.glsl'
// import fragment from './shaders/fragmentShader.glsl'

/* Sizes */
const sizes = {
    w: window.innerWidth,
    h: window.innerHeight
}

/* Initialise scene and camera */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, sizes.w / sizes.h, 100, 2000);

/* Set up camera */
camera.position.z = 600
camera.fov = 2 * Math.atan((sizes.h / 2) / 600) * (180 / Math.PI)

/* Set up renderer */
const renderer = new THREE.WebGLRenderer({
    // antialias: true,
    alpha: true
});
// renderer.setClearColor(0xffff00)
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(sizes.w, sizes.h);
document.body.appendChild(renderer.domElement);

/* Handle resize */
const resize = () => {
    sizes.w = window.innerWidth
    sizes.h = window.innerHeight
    renderer.setSize(sizes.w, sizes.h)
    camera.aspect = sizes.w / sizes.h
    camera.updateProjectionMatrix()
}

resize()

window.addEventListener('resize', resize)

/* Current Scroll Initialisation to 0 */
let currentScroll = 0

/* Get images */

// console.log(document.getElementById("vertexImport"))

console.log(document.getElementById('vertexShader'))

const materials = []

// console.log(gsap)

const material = new THREE.ShaderMaterial({
    uniforms: {
        uTime: { value: 0 },
        uImage: { value: new THREE.Vector2() },
        uHover: { value: new THREE.Vector2(.5, .5) },
        uHoverState: { value: 0 }
    },
    side: THREE.DoubleSide,
    vertexShader: `
    
        varying vec2 vUv;
        varying float vNoise;
        varying float vLight;
        varying float vDist;
        uniform vec2 uHover;
        uniform float uTime;
        uniform float uHoverState;

        

        void main()
            {

                float dist = distance(uv, uHover);
                vec3 newPosition = position;

                newPosition += uHoverState * 5. * sin(dist*10. + uTime*3.);
                gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );

                vUv = uv;
                vLight = uHoverState * sin(dist* 10. - uTime*3.);
                vDist = dist;
                vNoise = 0.;
            }
    
    `,
    fragmentShader: `
    
        varying float vNoise;
        varying float vDist;
        varying float vLight;
        uniform sampler2D uImage;
        varying vec2 vUv;
        uniform float uTime;
        uniform vec2 uHover;

        void main()
            {
                vec2 newUv = vUv;
                vec4 image = texture2D(uImage, newUv);
                gl_FragColor = vec4(vec3(vDist), 1.0);
                gl_FragColor = image;
                gl_FragColor.rgb += 0.05 * vec3(vLight);
            }
    
    `,
    // wireframe: true
})

// material.map.magFilter = THREE.LinearFilter;
// material.map.minFilter = THREE.LinearFilter;
material.anisotropy = renderer.getMaxAnisotropy()

const addImagesToDom = () => {
    // console.log('added')
    const images = [...document.querySelectorAll('.img')]

    // console.log(images)

    const imageStore = images.map(img => {
        const bounds = img.getBoundingClientRect()

        console.log(img, bounds, bounds.width, bounds.height)

        const texture = new THREE.Texture(img)
        texture.needsUpdate = true
        const geometry = new THREE.PlaneBufferGeometry(bounds.width, bounds.height, 64, 64)

        const material2 = material.clone()
        material2.uniforms.uImage.value = texture

        materials.push(material2)

        img.addEventListener('mouseenter', () => {
            gsap.to(material2.uniforms.uHoverState, {
                duration: .5,
                value: 1
            })
        })

        img.addEventListener('mouseout', () => {
            gsap.to(material2.uniforms.uHoverState, {
                duration: .5,
                value: 0
            })
        })

        const imageMesh = new THREE.Mesh(geometry, material2)
        // imageMesh.position.z += 0.001

        // console.log(imageMesh)

        scene.add(imageMesh)

        return {
            img,
            mesh: imageMesh,
            top: bounds.top,
            left: bounds.left,
            width: bounds.width,
            height: bounds.height,
        }
    })

    const setPosition = () => {
        imageStore.forEach(o => {
            o.mesh.position.y = currentScroll - o.top + sizes.h / 2 - o.height / 2
            o.mesh.position.x = o.left - sizes.w / 2 + o.width / 2
        })
    }

    setPosition()

    window.addEventListener('scroll', () => {
        currentScroll = window.scrollY
        // console.log(window.scrollY)
        setPosition()
    })

    /* Mouse move stuff */
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const mouseMovement = () => {
        window.addEventListener('mousemove', (e) => {
            mouse.x = (e.clientX / sizes.w) * 2 - 1
            mouse.y = - (e.clientY / sizes.h) * 2 + 1

            raycaster.setFromCamera(mouse, camera)
            const intersects = raycaster.intersectObjects(scene.children)

            if (intersects.length > 0) {
                // console.log(intersects[0])
                let obj = intersects[0].object
                obj.material.uniforms.uHover.value = intersects[0].uv
            }

        }, false)
    }

    mouseMovement()

}

const preloadImages = new Promise((resolve, reject) => {
    imagesLoaded(document.querySelectorAll('img'), { background: true }, resolve)
})

const allDone = [preloadImages]

Promise.all(allDone).then(() => {
    addImagesToDom()
})

/* Add stuff */
// const geometry = new THREE.PlaneBufferGeometry(1500, 100, 10, 10);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// console.log(images)

// console.log(cube.position.z)

// console.log(renderer)

const animate = function () {

    const clock = new THREE.Clock();

    requestAnimationFrame(animate);

    materials.forEach((m) => {
        // m.uniforms.uTime.value = clock.getElapsedTime();
        m.uniforms.uTime.value += 1/60;
        
    })

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    renderer.render(scene, camera);
};

animate();