/**
 * MyTrapezium
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTrapezium extends CGFobject {
    constructor(scene, smaller) {
        super(scene);

        this.smaller = smaller;
        this.minS = 0;
        this.maxS = 0 + smaller;
        this.minT = 0;
        this.maxT = 1;

        this.initBuffers();
    }
    ;
    initBuffers() {
        this.vertices = [-0.5, 0.5, 0, -0.5, -0.5, 0, 0.5, -0.5, 0, -0.5 + this.smaller, 0.5, 0,
        ];

        this.indices = [0, 1, 3, 3, 1, 2, 0, 3, 1, 1, 3, 2];

        this.normals = [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1];

        this.texCoords = [this.minS, this.maxT, this.maxS, this.maxT, this.minS, this.minT, this.maxS, this.minT];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    ;
}
;