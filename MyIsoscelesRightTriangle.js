/**
 * MyIsoscelesRightTriangle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyIsoscelesRightTriangle extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    ;
    initBuffers() {
        this.vertices = [0, 0, 0, 1, 0, 0, 0, 1, 0];

        this.indices = [0, 1, 2, 0, 2, 1];

        this.normals = [0, 0, 1, 0, 0, 1, 0, 0, 1];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    ;

}
;