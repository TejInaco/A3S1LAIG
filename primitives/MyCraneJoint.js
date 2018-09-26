/**
 * MyCraneJoint
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCraneJoint extends CGFobject {

    constructor(scene, x, z) {
        super(scene);
        this.x = x || x;
        this.y = 3.75 || y;
        this.z = z || z;

        this.initBuffers();

        this.myTop = new MyCircle(this.scene,20,1);
        this.myTop.initBuffers;

        this.myJoint = new MyCilinder(this.scene,20,4);
        this.myJoint.initBuffers;

        this.craneAppearance = new CGFappearance(this.scene);
        this.craneAppearance.setAmbient(150 / 255, 153 / 255, 151 / 255, 1);
        this.craneAppearance.setDiffuse(150 / 255, 153 / 255, 151 / 255, 1)
        this.craneAppearance.setSpecular(150 / 255, 153 / 255, 151 / 255, 1);
        this.craneAppearance.setShininess(200);

    }
    ;
    display() {

        //Joint
        this.scene.pushMatrix();
        this.myJoint.display();
        this.scene.popMatrix();

        //top
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 1)
        this.myTop.display();
        this.scene.popMatrix();

        //bottom
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 1, 0, 0)
        this.myTop.display();
        this.scene.popMatrix();

    }
    ;
}
;