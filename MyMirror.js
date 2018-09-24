/**
 * MyMirror
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyMirror extends CGFobject {

    constructor(scene, x, z) {

        super(scene);

        this.initBuffers();

        this.myMirrorCover = new MyUnitCubeQuad(this.scene);
        this.myMirrorCover.initBuffers;

        this.myMirrorCoverAppearance = new CGFappearance(this.scene);

        this.myMirrorCoverAppearance.setAmbient(250 / 255, 0, 24 / 255, 1);
        this.myMirrorCoverAppearance.setDiffuse(250 / 255, 0, 24 / 255, 1)
        this.myMirrorCoverAppearance.setSpecular(250 / 255, 0, 24 / 255, 1);
        this.myMirrorCoverAppearance.setShininess(200);

        this.myMirrorComp = new MyQuad(this.scene);
        this.myMirrorComp.initBuffers;

        this.myMirrorAppearance = new CGFappearance(this.scene);
        this.myMirrorAppearance.setAmbient(0.75, 0.75, 0.75, 1);
        this.myMirrorAppearance.setDiffuse(0.75, 0.75, 0.75, 1);
        this.myMirrorAppearance.setSpecular(0.75, 0.75, 0.75, 1);
        this.myMirrorAppearance.setShininess(20);
    }
    ;display() {

        //mirror
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.scene.translate(8, 0.75, 2.9);
        this.scene.scale(25, 15, 0.1);
        this.myMirrorAppearance.apply();
        this.myMirrorComp.display();
        this.scene.popMatrix();

        //cover
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.translate(-8, 1, -2.63);
        this.scene.scale(26, 17, 0.5);
        this.myMirrorCoverAppearance.apply();
        this.myMirrorCover.display();
        this.scene.popMatrix();

    }
}
;