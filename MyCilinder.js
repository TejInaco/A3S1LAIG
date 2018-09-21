/**
 * MyClilinder
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCilinder extends CGFobject {

    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    initBuffers() {

        //vectors
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        //coordinate variables
        var x;
        var y;
        var z = 0;

        //slice increment (2*pi*r/slices)
        var angle = (2 * Math.PI) / this.slices;

        for (var t = 0; t <= this.stacks; t++) {
            for (var s = 0; s <= this.slices; s++) {

                //calculating coordinates
                x = Math.cos(angle * s);
                y = Math.sin(angle * s);

                //pushing vertices
                this.vertices.push(x);
                this.vertices.push(y);
                this.vertices.push(z);

                //pushing normals
                this.normals.push(x);
                this.normals.push(y);
                this.normals.push(0);

                //pushing textCoords
                this.texCoords.push(s / this.slices, t / this.stacks);

                //unless last stack and slice
                if (t != this.stacks && s != this.slices) {
                    //calculating indices
                    var indice = t * (this.slices + 1);
                    var indiceS = indice + s;
                    var indiceSS = indiceS + this.slices + 1;

                    //pushing indices
                    this.indices.push(indiceS);
                    this.indices.push(1 + indiceS);
                    this.indices.push(indiceSS);
                    this.indices.push(1 + indiceS);
                    this.indices.push(1 + indiceSS);
                    this.indices.push(indiceSS);
                }
            }
            z += 1 / this.stacks;
            //z increment
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    ;
}
;