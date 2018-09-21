/**
 * MyCraneBase
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCraneBase extends CGFobject {

    constructor(scene, x, z, roty) {
        super(scene);
        this.x = x;
        this.y = 3.75 || y;
        this.z = z;
        this.z = roty;

        this.initBuffers();

        this.myTop = new MyCircle(this.scene,20,1);
        this.myTop.initBuffers;

        this.myBase = new MyCilinder(this.scene,20,4);
        this.myBase.initBuffers;

        this.craneAppearance = new CGFappearance(this.scene);
        this.craneAppearance.setAmbient(150 / 255, 153 / 255, 151 / 255, 1);
        this.craneAppearance.setDiffuse(150 / 255, 153 / 255, 151 / 255, 1)
        this.craneAppearance.setSpecular(150 / 255, 153 / 255, 151 / 255, 1);
        this.craneAppearance.setShininess(200);

    }
    ;
    display() {

        //base
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.07, 0.15, 0.04);
        this.myBase.display();
        this.scene.popMatrix();

        //top
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0);
        this.scene.scale(0.07, 0.07, 0.15);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.myTop.display();
        this.scene.popMatrix();

        //bottom
        this.scene.pushMatrix();
        this.scene.translate(0, 0.04, 0);
        this.scene.scale(0.07, 0.07, 0.15);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.myTop.display();
        this.scene.popMatrix();

    }
    ;
}
;