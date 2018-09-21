/**
 * MyPrism
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
class MyPrism extends CGFobject {

    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
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

        //vars
        var x;
        var y;
        var z;
        var xf;
        var yf;

        //constants
        var angle = 2 * Math.PI / (this.slices);
        var halfAngle = angle / 2;

        for (var t = 0; t < this.stacks + 1; t++) {
            for (var s = 0; s < this.slices; s++) {
                //calculating temps
                var angleS = angle * s;
                var angleAndHalf = angleS + halfAngle;

                //updating coordinates
                x = Math.cos(angleS);
                y = Math.sin(angleS);
                xf = Math.cos(angle + angleS);
                yf = Math.sin(angle + angleS);

                //pushing vertices (beginning of current slice and end)
                this.vertices.push(x);
                this.vertices.push(y);
                this.vertices.push(t / this.stacks);
                this.vertices.push(xf);
                this.vertices.push(yf);
                this.vertices.push(t / this.stacks);

                //pushing normals (the same normal on both vertices)
                for (var dois = 0; dois < 2; dois++) {
                    this.normals.push(Math.cos(angleAndHalf));
                    this.normals.push(Math.sin(angleAndHalf));
                    this.normals.push(0);
                }

                //calculating indices
                var indice = t * this.slices;
                var indiceS = indice + s;
                var indiceSS = indiceS + this.slices;
                var indiceS2 = 2 * indiceS;
                var indiceSS2 = 2 * indiceSS;

                //pushing indices
                if (t != this.stacks) {
                    this.indices.push(indiceS2);
                    this.indices.push(indiceS2 + 1);
                    this.indices.push(indiceSS2 + 1);
                    this.indices.push(indiceS2);
                    this.indices.push(indiceSS2 + 1);
                    this.indices.push(indiceSS2);
                }

            }

        }
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    ;
}
;