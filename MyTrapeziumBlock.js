/**
 * MyTrapeziumBlock
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTrapeziumBlock extends CGFobject {
    constructor(scene) {
        super(scene);
        this.trapezium = new MyTrapezium(this.scene,0.8);
        this.trapezium.initBuffers();

        this.quad = new MyQuad(this.scene);
        this.quad.initBuffers();
    }
    ;display() {

        this.deg2rad = Math.PI / 180.0;
        var a_rot = 90.0 * this.deg2rad;
        var b_rot = 2 * a_rot;

        //face mais proxima de xy e //
        this.scene.pushMatrix();
        this.scene.scale(1, -1, 1);
        this.scene.rotate(b_rot, 1.0, 0.0, 0.0);
        this.scene.translate(0.0, 0.0, 0.5);
        this.trapezium.display();
        this.scene.popMatrix();

        //face mais distante de xy e //
        this.scene.pushMatrix();
        this.scene.translate(0.0, 0.0, 0.5);
        this.trapezium.display();
        this.scene.popMatrix();

        //face acima de xz e //
        this.scene.pushMatrix();
        this.scene.rotate(-a_rot, 1.0, 0.0, 0.0);
        this.scene.scale(0.8035, 1, 0.5);
        this.scene.translate(-0.123, 0.0, 0.99);
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
        this.scene.translate(0, -0.005, 0.4);
        this.scene.rotate(-45 * degToRad / 4, 1, 0, 0);
        this.scene.scale(1, 1.02, 1);
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