/**
 * MyWheel
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

var degToRad = Math.PI / 180.0;

class MyWheel extends CGFobject {

    constructor(scene) {

        super(scene);
        
        this.cylinder = new MyCilinder(this.scene,20,4);
        this.top = new MyCircle(this.scene,20,1);

        this.top.initBuffers();
        this.cylinder.initBuffers();

        this.wheelAppearance = new CGFappearance(this.scene);
        this.wheelAppearance.setAmbient(0.25, 0.25, 0.25, 1);
        this.wheelAppearance.setDiffuse(0.75, 0.75, 0.75, 1);
        this.wheelAppearance.setSpecular(0.75, 0.75, 0.75, 1);
        this.wheelAppearance.setShininess(5);
        this.wheelAppearance.loadTexture("images/wheel.jpg");

        this.tireAppearance = new CGFappearance(this.scene);
        this.wheelAppearance.setAmbient(0.25, 0.25, 0.25, 1);
        this.wheelAppearance.setDiffuse(0.75, 0.75, 0.75, 1);
        this.wheelAppearance.setSpecular(0.75, 0.75, 0.75, 1);
        this.wheelAppearance.setShininess(5);
        this.tireAppearance.loadTexture("images/tire.png");
        this.tireAppearance.setTextureWrap("REPEAT", "REPEAT");

        /*
	this.materialMetal = new CGFappearance(this.scene);
	this.materialMetal.setAmbient(0.24,0.24,0.24,1);
	this.materialMetal.setDiffuse(0.24,0.24,0.24,1);
	this.materialMetal.setSpecular(0.5,0.5,0.5,1);	
	this.materialMetal.setShininess(120);
*/
    }
    ;

    display() {

        this.scene.pushMatrix();
        this.tireAppearance.apply();
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 1);
        this.wheelAppearance.apply();
        this.top.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 1);
        this.scene.rotate(180 * degToRad, 0, 1, 0);
        this.wheelAppearance.apply();
        this.top.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0);
        this.scene.rotate(180 * degToRad, 0, 1, 0);
        this.wheelAppearance.apply();
        this.top.display();
        this.scene.popMatrix();
    }
}
;