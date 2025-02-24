uniform float uTime;

varying vec2 vUv;

#include "../noise2D.glsl"

void main() {

    vec2 newUv = vec2(vUv.x + uTime * 0.1, vUv.y);
    float noise = fbm(newUv * 10.0, 2, 3.1, 2.0);
    noise = pow(noise, 5.0);
    gl_FragColor = vec4(vec3(1.0), noise * 0.15);
}