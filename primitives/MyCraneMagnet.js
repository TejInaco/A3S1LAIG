/**
 * MyCraneMagnet
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCraneMagnet extends CGFobject {

    constructor(scene, x, z) {
        super(scene);
        this.x = x || x;
        this.y = 3.75 || y;
        this.z = z || z;

        this.initBuffers();

        this.myMagnetString = new MyCilinder(this.scene,20,4);
        this.myMagnetString.initBuffers;

        this.myMagnetTop = new MyCircle(this.scene,20,1);
        this.myMagnetTop.initBuffers;

        this.myMagnetBody = new MyCilinder(this.scene,20,4);
        this.myMagnetBody.initBuffers;

        this.craneAppearance = new CGFappearance(this.scene);
        this.craneAppearance.setAmbient(150 / 255, 153 / 255, 151 / 255, 1);
        this.craneAppearance.setDiffuse(150 / 255, 153 / 255, 151 / 255, 1)
        this.craneAppearance.setSpecular(150 / 255, 153 / 255, 151 / 255, 1);
        this.craneAppearance.setShininess(200);

    }
    ;display() {

        //base
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.07, 0.15, 0.04);
        this.myMagnetBody.display();
        this.scene.popMatrix();

        //top
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0);
        this.scene.scale(0.07, 0.07, 0.15);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.myMagnetTop.display();
        this.scene.popMatrix();

        //bottom
        this.scene.pushMatrix();
        this.scene.translate(0, 0.04, 0);
        this.scene.scale(0.07, 0.07, 0.15);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.myMagnetTop.display();
        this.scene.popMatrix();

        //string
        this.scene.pushMatrix();
        this.scene.translate(0, 0.04, 0);
        this.scene.scale(0.001, 0.25, 0.015);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.myMagnetString.display();
        this.scene.popMatrix();

    }
    ;
}
;