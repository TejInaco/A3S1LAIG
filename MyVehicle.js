/**
 * MyVehicle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyVehicle extends CGFobject {

    constructor(scene, x, z, angle) {

        super(scene);
        this.x = x || x;
        this.y = 3.75 || y;
        this.z = z || z;
        this.rotX = 0 || angle;
        this.speed = 0;

        this.lastUpdate = -1;
        this.elapsedTime = 0;

        this.initBuffers();

        this.myMirrorInst = new MyMirror(this.scene);
        this.myMirrorInst.initBuffers;

        this.myLight = new MyCircle(this.scene,20,1);
        this.myLight.initBuffers;

        this.myLightAppearance = new CGFappearance(this.scene);
        this.myLightAppearance.setAmbient(0.75, 0.75, 0.75, 1);
        this.myLightAppearance.setDiffuse(0.75, 0.75, 0.75, 1);
        this.myLightAppearance.setSpecular(0.75, 0.75, 0.75, 1);
        this.myLightAppearance.setShininess(20);

        this.myTriangularPrism = new MyTriangularPrism(this.scene,3,10);
        this.myTriangularPrism.initBuffers;

        this.mySpareWheel = new MyWheel(this.scene,0,0,0);
        this.mySpareWheel.initBuffers();

        this.mySpareWheelCover = new MySemiCircle(this.scene,600,1);
        this.mySpareWheelCover.initBuffers();

        this.mySpareWheelCoverAppearance = new CGFappearance(this.scene);
        this.mySpareWheelCoverAppearance.setAmbient(0, 0, 0, 1);
        this.mySpareWheelCoverAppearance.setDiffuse(0, 0, 0, 1);
        this.mySpareWheelCoverAppearance.setSpecular(0, 0, 0, 1);
        this.mySpareWheelCoverAppearance.setShininess(0);

        this.myLeftFrontWheel = new MyWheel(this.scene,0,0,0);
        this.myLeftFrontWheel.initBuffers();
        this.myRightFrontWheel = new MyWheel(this.scene,0,0,0);
        this.myRightFrontWheel.initBuffers()

        this.myLeftRearWheel = new MyWheel(this.scene,0,0,0);
        this.myLeftRearWheel.initBuffers();
        this.myRightRearWheel = new MyWheel(this.scene,0,0,0);
        this.myRightRearWheel.initBuffers()

        this.myFront = new MyUnitCubeQuad(this.scene);
        this.myFront.initBuffers;

        this.myBack = new MyUnitCubeQuad(this.scene);
        this.myBack.initBuffers;

        this.myBackTrapezium = new MyTrapeziumBlock(this.scene);
        this.myBackTrapezium.initBuffers;

        this.trap = new MyTrapezium(this.scene,0.5);
        this.trap.initBuffers;

        this.myWindshield = new MyQuad(this.scene);
        this.myWindshield.initBuffers;

        this.myGrid = new MyQuad(this.scene);
        this.myGrid.initBuffers;

        this.myBackPlaque = new MyQuad(this.scene);
        this.myGrid.initBuffers;

        this.myWindowAppearance = new CGFappearance(this.scene);
        this.myWindowAppearance.setAmbient(0.75, 0.75, 0.75, 1);
        this.myWindowAppearance.setDiffuse(0.75, 0.75, 0.75, 1);
        this.myWindowAppearance.setSpecular(0.75, 0.75, 0.75, 1);
        this.myWindowAppearance.setShininess(20);

        this.myGridAppearanceS = new CGFappearance(this.scene);
        this.myGridAppearanceS.setAmbient(0.25, 0.25, 0.25, 1);
        this.myGridAppearanceS.setDiffuse(0.75, 0.75, 0.75, 1);
        this.myGridAppearanceS.setSpecular(0.75, 0.75, 0.75, 1);
        this.myGridAppearanceS.setShininess(20);
        this.myGridAppearanceS.loadTexture("images/scoobyFront.png");

        this.myBackPlaqueAppearanceS = new CGFappearance(this.scene);
        this.myBackPlaqueAppearanceS.setAmbient(0.25, 0.25, 0.25, 1);
        this.myBackPlaqueAppearanceS.setDiffuse(0.75, 0.75, 0.75, 1);
        this.myBackPlaqueAppearanceS.setSpecular(0.75, 0.75, 0.75, 1);
        this.myBackPlaqueAppearanceS.setShininess(20);
        this.myBackPlaqueAppearanceS.loadTexture("images/scoobyBack.png");

        this.vehicleMaterialAppearanceS = new CGFappearance(this.scene);
        this.vehicleMaterialAppearanceS.setAmbient(89 / 255, 173 / 255, 201 / 255, 1);
        this.vehicleMaterialAppearanceS.setDiffuse(89 / 255, 173 / 255, 201 / 255, 1)
        this.vehicleMaterialAppearanceS.setSpecular(89 / 255, 173 / 255, 201 / 255, 1);
        this.vehicleMaterialAppearanceS.setShininess(200);

        this.myGridAppearanceM = new CGFappearance(this.scene);
        this.myGridAppearanceM.setAmbient(0.25, 0.25, 0.25, 1);
        this.myGridAppearanceM.setDiffuse(0.75, 0.75, 0.75, 1);
        this.myGridAppearanceM.setSpecular(0.75, 0.75, 0.75, 1);
        this.myGridAppearanceM.setShininess(20);
        this.myGridAppearanceM.loadTexture("images/front.png");

        this.myBackPlaqueAppearanceM = new CGFappearance(this.scene);
        this.myBackPlaqueAppearanceM.setAmbient(0.25, 0.25, 0.25, 1);
        this.myBackPlaqueAppearanceM.setDiffuse(0.75, 0.75, 0.75, 1);
        this.myBackPlaqueAppearanceM.setSpecular(0.75, 0.75, 0.75, 1);
        this.myBackPlaqueAppearanceM.setShininess(20);
        this.myBackPlaqueAppearanceM.loadTexture("images/back.png");

        this.vehicleMaterialAppearanceM = new CGFappearance(this.scene);
        this.vehicleMaterialAppearanceM.setAmbient(250 / 255, 0, 24 / 255, 1);
        this.vehicleMaterialAppearanceM.setDiffuse(250 / 255, 0, 24 / 255, 1)
        this.vehicleMaterialAppearanceM.setSpecular(250 / 255, 0, 24 / 255, 1);
        this.vehicleMaterialAppearanceM.setShininess(200);

        this.myGridAppearanceA = new CGFappearance(this.scene);
        this.myGridAppearanceA.setAmbient(0.25, 0.25, 0.25, 1);
        this.myGridAppearanceA.setDiffuse(0.75, 0.75, 0.75, 1);
        this.myGridAppearanceA.setSpecular(0.75, 0.75, 0.75, 1);
        this.myGridAppearanceA.setShininess(20);
        this.myGridAppearanceA.loadTexture("images/ateam_front.png");

        this.myBackPlaqueAppearanceA = new CGFappearance(this.scene);
        this.myBackPlaqueAppearanceA.setAmbient(0.25, 0.25, 0.25, 1);
        this.myBackPlaqueAppearanceA.setDiffuse(0.75, 0.75, 0.75, 1);
        this.myBackPlaqueAppearanceA.setSpecular(0.75, 0.75, 0.75, 1);
        this.myBackPlaqueAppearanceA.setShininess(20);
        this.myBackPlaqueAppearanceA.loadTexture("images/ateam_back.png");

        this.vehicleMaterialAppearanceA = new CGFappearance(this.scene);
        this.vehicleMaterialAppearanceA.setAmbient(255 / 255, 255 / 255, 255 / 255, 1);
        this.vehicleMaterialAppearanceA.setDiffuse(5 / 255, 3 / 255, 20 / 255, 1)
        this.vehicleMaterialAppearanceA.setSpecular(89 / 255, 17 / 255, 1 / 255, 1);
        this.vehicleMaterialAppearanceA.setShininess(200);
    }
    ;updateWheels(moveRot, speed, isPressed) {
        this.speed = speed;
        var tmpRot = moveRot;

        if (isPressed && this.rotX >= -45 && this.rotX <= 45) {
            tmpRot = moveRot;
        }

        if (!isPressed) {
            super.wheelAngle = 0;
            moveRot = 0;

            if (tmpRot > 0.00000000000000001) {
            
                tmpRot = -2 * tmpRot;
            } else if (tmpRot < -0.00000000000000001) {
          
                tmpRot = +2 * tmpRot;
            }
            tmpRot = 0;
        }

        this.rotX = tmpRot;
    }
    ;display() {

        //spare wheel
        this.scene.pushMatrix();
        this.scene.translate(3.32, -0.05, 0.65);
        this.scene.rotate(-Math.PI / 2, 0, 0, 1);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.7, 0.7, 0.3);
        this.mySpareWheel.display();
        this.scene.popMatrix();

        //left front wheel
        this.scene.pushMatrix();
        this.scene.translate(-1.5, 0.90, 0.71)
        this.scene.rotate(-this.rotX * degToRad, 0, 0, 1);
        this.scene.translate(0, -0.15, -0.71);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.7, 0.7, 0.3);
        this.scene.rotate(-this.rotX * degToRad, 0, 0, 1);
        this.scene.rotate(-this.speed, 0, 0, 1)
        this.myLeftFrontWheel.display();
        this.scene.popMatrix();

        //right front wheel
        this.scene.pushMatrix();
        this.scene.translate(-1.5, -0.95, 0.71);
        this.scene.rotate(-this.rotX * degToRad, 0, 0, 1);
        this.scene.translate(0, -0.15, -0.71);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.7, 0.7, 0.3);
        this.scene.rotate(-this.rotX * degToRad, 0, 0, 1);
        this.scene.rotate(-this.speed, 0, 0, 1)
        this.myRightFrontWheel.display();
        this.scene.popMatrix();

        //left rear wheel
        this.scene.pushMatrix();
        this.scene.translate(1.5, 0.75, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.7, 0.7, 0.3);
        this.scene.rotate(-this.speed, 0, 0, 1)
        this.myLeftRearWheel.display();
        this.scene.popMatrix();

        //right rear wheel
        this.scene.pushMatrix();
        this.scene.translate(1.5, -1.05, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.7, 0.7, 0.3);
        this.scene.rotate(-+this.speed, 0, 0, 1)
        this.myRightRearWheel.display();
        this.scene.popMatrix();

        //console.log(this.scene.currVehicleAppearance);
        if (this.scene.currVehicleAppearance == 'mercedes') {
            this.vehicleMaterialAppearanceM.apply();
        } else if (this.scene.currVehicleAppearance == 'scooby') {
            this.vehicleMaterialAppearanceS.apply();
        } else if (this.scene.currVehicleAppearance == 'a-team') {
            this.vehicleMaterialAppearanceA.apply();
        }

        //back trapezium cube
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.translate(1.28, 1.5, 0);
        this.scene.scale(4.05, 1, 2.1);
        this.myBackTrapezium.display();
        this.scene.popMatrix();

        //back
        this.scene.pushMatrix();
        this.scene.translate(2.8, 0, 0.75);
        this.scene.scale(1, 2.1, 2.1);
        this.myFront.display();
        this.scene.popMatrix();

        if (this.scene.currVehicleAppearance == 'mercedes') {
            this.vehicleMaterialAppearanceM.apply();
        } else if (this.scene.currVehicleAppearance == 'scooby') {
            this.vehicleMaterialAppearanceS.apply();
        } else if (this.scene.currVehicleAppearance == 'a-team') {
            this.vehicleMaterialAppearanceA.apply();
        }

        //backplaque
        this.scene.pushMatrix();
        this.scene.translate(3.31, 0, 0.73);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(2.1, 2.1, 1);
        if (this.scene.currVehicleAppearance == 'mercedes') {
            this.myBackPlaqueAppearanceM.apply();
        } else if (this.scene.currVehicleAppearance == 'scooby') {
            this.myBackPlaqueAppearanceS.apply();
        } else if (this.scene.currVehicleAppearance == 'a-team') {
            this.myBackPlaqueAppearanceA.apply();
        }
        this.myBackPlaque.display();
        this.scene.popMatrix();

        if (this.scene.currVehicleAppearance == 'mercedes') {
            this.vehicleMaterialAppearanceM.apply();
        } else if (this.scene.currVehicleAppearance == 'scooby') {
            this.vehicleMaterialAppearanceS.apply();
        } else if (this.scene.currVehicleAppearance == 'a-team') {
            this.vehicleMaterialAppearanceA.apply();
        }

        //front
        this.scene.pushMatrix();
        this.scene.translate(-2.6, 0, 0.2);
        this.scene.scale(0.5, 2.1, 1.2);
        this.myFront.display();
        this.scene.popMatrix();

        if (this.scene.currVehicleAppearance == 'mercedes') {
            this.vehicleMaterialAppearanceM.apply();
        } else if (this.scene.currVehicleAppearance == 'scooby') {
            this.vehicleMaterialAppearanceS.apply();
        } else if (this.scene.currVehicleAppearance == 'a-team') {
            this.vehicleMaterialAppearanceA.apply();
        }

        //front grid
        this.scene.pushMatrix();
        this.scene.translate(-2.86, 0, 0.45);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(2.1, 1.7, 1.5);
        if (this.scene.currVehicleAppearance == 'mercedes') {
            this.myGridAppearanceM.apply()
        } else if (this.scene.currVehicleAppearance == 'scooby') {
            this.myGridAppearanceS.apply()
        } else if (this.scene.currVehicleAppearance == 'a-team') {
            this.myGridAppearanceA.apply()
        }

        this.myGrid.display();
        this.scene.popMatrix();

        if (this.scene.currVehicleAppearance == 'mercedes') {
            this.vehicleMaterialAppearanceM.apply();
        } else if (this.scene.currVehicleAppearance == 'scooby') {
            this.vehicleMaterialAppearanceS.apply();
        } else if (this.scene.currVehicleAppearance == 'a-team') {
            this.vehicleMaterialAppearanceA.apply();
        }

        //middle
        this.scene.pushMatrix();
        this.scene.translate(-0.01, 0, 0.8);
        this.scene.scale(1.45, 2.1, 2.3);
        this.myFront.display();
        this.scene.popMatrix();

        //middleBack
        this.scene.pushMatrix();
        this.scene.translate(1.77, 0, 1.25);
        this.scene.scale(2.6, 2.1, 1)
        this.myFront.display();
        this.scene.popMatrix();

        //middleFront
        this.scene.pushMatrix();
        this.scene.translate(-1.5, 0, 1.05);
        this.scene.scale(2.7, 2.1, 0.5);
        this.myFront.display();
        this.scene.popMatrix();

        //windshield
        this.scene.pushMatrix();
        this.scene.translate(-0.91, 0, 1.63);
        this.scene.rotate(-63.8 * degToRad, 0, 1, 0);
        this.scene.scale(0.8, 2.1, 2);
        this.myWindowAppearance.apply();
        this.myWindshield.display();
        this.scene.popMatrix();

        /*	//cabin top
	this.scene.pushMatrix();
//	this.scene.translate(x,y,z);
	this.scene.translate(-0.915,0 ,2);
//	this.scene.rotate(Math.PI,0,1,0);
	//this.scene.rotate(-64.5*degToRad,0,1,0);
//	this.scene.rotate(180*degToRad,0,1,0);
	this.scene.scale(0.0,2.1,2);
	 this.vehicleMaterialAppearance.apply();
	this.myWindshield.display();
	this.scene.popMatrix();
*/

        //right front window
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(1.15, 1.15, 1);
        this.scene.translate(-0.64, 1.24, -1.053);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.myWindowAppearance.apply();
        this.trap.display();
        this.scene.popMatrix();

        //right rear window
        this.scene.pushMatrix();
        this.scene.translate(1.8, 0, -0.2);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(-1.15, 1.15, 1);
        this.scene.translate(-0.64, 1.24, -1.053);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.myWindowAppearance.apply();
        this.trap.display();
        this.scene.popMatrix();

        //left front window
        this.scene.pushMatrix();
        this.scene.scale(-1, 1, 1);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(1.15, 1.15, 1.001);
        this.scene.translate(-0.64, 1.24, -1.053);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.myWindowAppearance.apply();
        this.trap.display();
        this.scene.popMatrix();

        //left rear window
        this.scene.pushMatrix();
        this.scene.translate(1.8, 0, -0.2);
        this.scene.scale(-1, 1, 1);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(-1.15, 1.15, 1.001);
        this.scene.translate(-0.64, 1.24, -1.053);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.myWindowAppearance.apply();
        this.trap.display();
        this.scene.popMatrix();

        //skylight
        this.scene.pushMatrix();
        this.scene.translate(1.53, -0.05, 2.01);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.scale(0.7, 0.7, 0.7);
        this.myWindowAppearance.apply()
        this.mySpareWheelCover.display();
        this.scene.popMatrix();

        //spare wheel cover
        this.scene.pushMatrix();
        this.scene.translate(3.631, -0.05, 0.67);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(0.7, 0.7, 0.7);
        this.mySpareWheelCoverAppearance.apply();
        this.mySpareWheelCover.display();
        this.scene.popMatrix();

        if (this.scene.currVehicleAppearance == 'mercedes') {
            this.vehicleMaterialAppearanceM.apply();
        } else if (this.scene.currVehicleAppearance == 'scooby') {
            this.vehicleMaterialAppearanceS.apply();
        } else if (this.scene.currVehicleAppearance == 'a-team') {
            this.vehicleMaterialAppearanceA.apply();
        }

        //triangular Prism front of front wheels
        this.scene.pushMatrix();
        this.scene.translate(1, 0, -0.8);
        this.scene.scale(0.7, 1, 0.8);
        if (this.scene.currVehicleAppearance == 'mercedes') {
            this.vehicleMaterialAppearanceM.apply();
        } else if (this.scene.currVehicleAppearance == 'scooby') {
            this.vehicleMaterialAppearanceS.apply();
        } else if (this.scene.currVehicleAppearance == 'a-team') {
            this.vehicleMaterialAppearanceA.apply();
        }
        this.myTriangularPrism.display();
        this.scene.popMatrix();

        //triangular Prism back of front wheels
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.translate(2.6, 0, -2.2);
        this.scene.scale(0.7, 1, 0.8);
        if (this.scene.currVehicleAppearance == 'mercedes') {
            this.vehicleMaterialAppearanceM.apply();
        } else if (this.scene.currVehicleAppearance == 'scooby') {
            this.vehicleMaterialAppearanceS.apply();
        } else if (this.scene.currVehicleAppearance == 'a-team') {
            this.vehicleMaterialAppearanceA.apply();
        }
        this.myTriangularPrism.display();
        this.scene.popMatrix();

        //triangular Prism front of rear wheels
        this.scene.pushMatrix();
        this.scene.translate(4.0, 0, -0.8);
        this.scene.scale(0.7, 1, 0.8);
        if (this.scene.currVehicleAppearance == 'mercedes') {
            this.vehicleMaterialAppearanceM.apply();
        } else if (this.scene.currVehicleAppearance == 'scooby') {
            this.vehicleMaterialAppearanceS.apply();
        } else if (this.scene.currVehicleAppearance == 'a-team') {
            this.vehicleMaterialAppearanceA.apply();
        }
        this.myTriangularPrism.display();
        this.scene.popMatrix();

        //triangular Prism back of rear wheels
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.translate(2.6, 0, 0.8);
        this.scene.scale(0.7, 1, 0.8);
        if (this.scene.currVehicleAppearance == 'mercedes') {
            this.vehicleMaterialAppearanceM.apply();
        } else if (this.scene.currVehicleAppearance == 'scooby') {
            this.vehicleMaterialAppearanceS.apply();
        } else if (this.scene.currVehicleAppearance == 'a-team') {
            this.vehicleMaterialAppearanceA.apply();
        }
        this.myTriangularPrism.display();
        this.scene.popMatrix();

        //right front lights
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.scene.translate(0.8, 0.75, 2.9);
        this.scene.scale(0.25, 0.15, 0.1);
        this.myLightAppearance.apply();
        this.myLight.display();
        this.scene.popMatrix();
        //left front lights
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.scene.translate(0.8, -0.75, 2.90);
        this.scene.scale(0.25, 0.15, 0.1);
        this.myLightAppearance.apply();
        this.myLight.display();
        this.scene.popMatrix();

        //right mirror
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.scene.translate(1.6, 1.15, 1.6);
        this.scene.scale(0.025, 0.015, 0.1);
        this.myMirrorInst.display();
        this.scene.popMatrix();

        //left mirror
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.scene.translate(1.6, -1.18, 1.6);
        this.scene.scale(0.025, 0.015, 0.1);
        this.myMirrorInst.display();
        this.scene.popMatrix();

    }
}
;