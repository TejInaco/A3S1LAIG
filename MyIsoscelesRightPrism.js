/**
 * MyIsoscelesRightPrism
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
class MyIsoscelesRightPrism extends CGFobject {

    constructor(scene, stacks) {
        super(scene);
        this.slices = 3;
        this.stacks = stacks;
        this.initBuffers();

    }

    initBuffers() {
        //vectors
        this.vertices = [];
        //vector de vertices
        this.indices = [];
        //vector de indices
        this.normals = [];
        //vector de normais

        for (var t = 0; t < this.stacks + 1; t++) {

            //pushing vertices (beginning of current slice and end)
            this.vertices.push(0, 0, t / this.stacks);
            this.vertices.push(1, 0, t / this.stacks);
            this.vertices.push(1, 0, t / this.stacks);
            this.vertices.push(0, 1, t / this.stacks);
            this.vertices.push(0, 1, t / this.stacks);
            this.vertices.push(0, 0, t / this.stacks);

            //pushing normals (the same normal on both vertices)
            this.normals.push(0, -1, 0);
            this.normals.push(0, -1, 0);
            this.normals.push(1, 1, 0);
            this.normals.push(1, 1, 0);
            this.normals.push(0, 1, 0);
            this.normals.push(0, 1, 0);

            //pushing indices
            for (var i = 0; i < 3; i++) {
                if (t != this.stacks) {
                    this.indices.push(6 * t + 2 * i);
                    this.indices.push(6 * t + 1 + 2 * i);
                    this.indices.push(6 * (t + 1) + 2 * i);
                    this.indices.push(6 * t + 2 * i + 1);
                    this.indices.push(6 * (t + 1) + 2 * i + 1);
                    this.indices.push(6 * (t + 1) + 2 * i);
                }
            }

        }
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    ;
}
;