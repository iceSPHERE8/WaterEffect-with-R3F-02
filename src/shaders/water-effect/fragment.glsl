void main() {
    float alpha = 1.0 - distance(gl_PointCoord, vec2(0.5));
    alpha = pow(alpha, 5.0);

    gl_FragColor = vec4(vec3(1.0), alpha);
}