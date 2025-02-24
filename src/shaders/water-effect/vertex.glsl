uniform float uTime;

attribute vec3 aRandom;

vec3 getNewPos(float progress) {
    float PI = 3.1415926;
    float angle = progress * PI * 2.0;

    float x = sin(angle) + 2.0 * sin(2.0 * angle);
    float y = cos(angle) - 2.0 * cos(2.0 * angle);
    float z = -sin(3.0 * angle);

    vec3 newPos = vec3(x, y, z);
    return newPos;
}

vec3 getTangent(float progress) {
    float PI = 3.1415926;
    float angle = progress * PI * 2.0;

    float tx = cos(angle) + 4.0 * cos(2.0 * angle);
    float ty = sin(angle) + 4.0 * sin(2.0 * angle);
    float tz = -3.0 * cos(3.0 * angle);

    return aRandom * vec3(tx, ty, tz);
}

vec3 getNormal(float progress) {
    float PI = 3.1415926;
    float angle = progress * PI * 2.0;

    float nx = -sin(angle) - 8.0 * sin(2.0 * angle);
    float ny = -cos(angle) + 8.0 * cos(2.0 * angle);
    float nz = 9.0 * sin(3.0 * angle);

    return aRandom * vec3(nx, ny, nz);
}

void main() {
    float progress = fract(uTime * 0.05 + aRandom.y);
    vec3 newPos = getNewPos(progress);
    vec3 tangent = normalize(getTangent(progress));
    vec3 normal = normalize(getNormal(progress));
    vec3 bitTanget = cross(tangent, normal);

    newPos += normal * aRandom.x * 1.0 + bitTanget * aRandom.y * 1.0;

    vec4 modelPosition = modelMatrix * vec4(newPos, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    gl_PointSize *= (1.0 / -viewPosition.z) * aRandom.z * 20.0;
}