/**
 * MyUnitCubeQuad 
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyUnitCubeQuad extends CGFobject {
    constructor(scene) {
        super(scene);
        this.quad = new MyQuad(this.scene);
        this.quad.initBuffers();
    }
    ;display() {

        this.deg2rad = Math.PI / 180.0;
        var a_rot = 90.0 * this.deg2rad;
        var b_rot = 2 * a_rot;

        //face mais proxima de xy e //
        this.scene.pushMatrix();
        this.scene.rotate(b_rot, 1.0, 0.0, 0.0);
        this.scene.translate(0.0, 0.0, 0.5);

        this.quad.display();
        this.scene.popMatrix();

        //face mais distante de xy e //
        this.scene.pushMatrix();
        this.scene.translate(0.0, 0.0, 0.5);
        this.quad.display();
        this.scene.popMatrix();

        //face acima de xz e //
        this.scene.pushMatrix();
        this.scene.rotate(-a_rot, 1.0, 0.0, 0.0);
        this.scene.translate(0.0, 0.0, 0.5);
        this.quad.display();
        this.scene.popMatrix();

        //face abaixo de xz e //
        this.scene.pushMatrix();
        this.scene.rotate(a_rot, 1.0, 0.0, 0.0);
        this.scene.translate(0.0, 0.0, 0.5);
        this.quad.display();
        this.scene.popMatrix();

        //face para ca de yz e //
        this.scene.pushMatrix();
        this.scene.rotate(a_rot, 0.0, 1.0, 0.0);
        this.scene.translate(0.0, 0.0, 0.5);
        this.quad.display();
        this.scene.popMatrix();

        //face para la de yz e //
        this.scene.pushMatrix();
        this.scene.rotate(-a_rot, 0.0, 1.0, 0.0);
        this.scene.translate(0.0, 0.0, 0.5);
        this.quad.display();
        this.scene.popMatrix();

    }
}
;