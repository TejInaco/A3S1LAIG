/**
 * MyCrane
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
var degToRad = Math.PI / 180.0;
var INITIAL_MAGNET_HEIGHT = 5;
var FACTORZ = 2;
var FACTORX = 2;
var LENGTH_ARM = 3;
var INITIAL_JOINT_ANGLE;
var BASE_FACTOR = 0.1;
var FACTOR_DOWN = 0.3;
var FACTOR_UP = 0.3;

class MyCrane extends CGFobject {

    constructor(scene, x, z, angleB, angleJ, angle1, angle2) {
        super(scene);

        this.x = x || x;
        this.y = 3.75 || y;
        this.z = z || z;
        this.rotBase = 0 || angleB;
        this.rotJoint = 0 || angleJ;
        this.arm1rot = 0 || angle1;
        this.arm2rot = 0 || angle2;
        this.magnetx = this.x + Math.cos(this.rotBase) * FACTORX;
        this.magnetz = this.z + FACTORZ;
        this.magnety = this.y + 4;

        this.speed = 0;

        this.lastUpdate = -1;
        this.elapsedTime = 0;

        this.initBuffers();

        this.myBase = new MyCraneBase(this.scene,20,4,0);
        this.myBase.initBuffers;

        this.myJoint = new MyCraneJoint(this.scene,20,4);
        this.myJoint.initBuffers;

        this.myArm1 = new MyUnitCubeQuad(this.scene);
        this.myArm1.initBuffers;

        this.myArm2 = new MyUnitCubeQuad(this.scene);
        this.myArm2.initBuffers;

        this.myString = new MyCilinder(this.scene,20,4);
        this.myString.initBuffers;

        this.myMagnet = new MyCraneMagnet(this.scene,20,4);
        this.myMagnet.initBuffers;

        this.craneAppearance = new CGFappearance(this.scene);
        this.craneAppearance.setAmbient(150 / 255, 153 / 255, 151 / 255, 1);
        this.craneAppearance.setDiffuse(150 / 255, 153 / 255, 151 / 255, 1)
        this.craneAppearance.setSpecular(150 / 255, 153 / 255, 151 / 255, 1);
        this.craneAppearance.setShininess(200);

    }

    ;display() {

        //base
        this.scene.pushMatrix();
        this.scene.rotate(this.rotBase, 0, 1, 0);
        this.scene.scale(7, 7, 3);
        this.myBase.display();
        this.scene.popMatrix();

        //arm1
        this.scene.pushMatrix();
        this.scene.rotate(this.rotBase, 0, 1, 0);
        this.scene.rotate(Math.PI / 5, 0, 0, 1);
        this.scene.translate(0.2, 2.6, 0);
        this.scene.scale(0.4, 5, 0.25);
        this.myArm1.display();
        this.scene.popMatrix();

        //arm2
        this.scene.pushMatrix();
        this.scene.rotate(this.rotBase, 0, 1, 0);
        this.scene.translate(-3, 4.2, 0);
        this.scene.rotate(Math.PI / 5, 0, 0, 1);
        this.scene.rotate(-degToRad * this.arm2rot, 0, 0, 1);
        this.scene.rotate(-Math.PI / 5, 0, 0, 1);
        this.scene.translate(3, -4.20, 0);
        this.scene.rotate(-Math.PI / 5, 0, 0, 1);
        this.scene.translate(-5, 0, 0);
        this.scene.scale(0.4, LENGTH_ARM, 0.25);
        this.myArm2.display();
        this.scene.popMatrix();

        //magnet
        this.scene.pushMatrix();
        this.scene.rotate(this.rotBase, 0, 1, 0);
        this.scene.translate(-LENGTH_ARM * (1 - Math.cos(degToRad * this.arm2rot)), -LENGTH_ARM * (1 - Math.sin(degToRad * this.arm2rot)), 0);
        this.scene.translate(-4.95, 4, 0);
        this.scene.scale(10, 3, 5);
        this.myMagnet.display();
        this.scene.popMatrix();

        //joint
        this.scene.pushMatrix();
        this.scene.rotate(this.rotBase, 0, 1, 0);
        this.scene.translate(-3, 4.2, -0.125);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.scale(0.5, 0.5, 0.25);
        this.myJoint.display();
        this.scene.popMatrix();

    }
    ;
}
;