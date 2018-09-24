var degToRad = Math.PI / 180.0;

var TERRAIN_DIVISIONS = 1;
var TERRAIN_WIDTH = 50.0;
var TERRAIN_HEIGHT = 50.0;
var VEHIC_HALFWIDTH = 1.8;
var VEHIC_HEIGHT = 2.5;
var VEHIC_HALFLENGTHF = 2.86;
var VEHIC_HALFLENGTHR = 3.3;
var NEAR_MAGNET = 0.5;
var LOW_CONST = 2;
var JOINT_FACTOR = 1;
var BASE_FACTOR = 0.1;
var FACTOR_DOWN = 0.3;
var FACTOR_UP = 0.3;
var LENGTH_ARM = 3;

class LightingScene extends CGFscene {
    constructor() {
        super();
        this.isAxis = false;
        this.vehicX = 0;
        this.vehicZ = 0;
        this.vehicY = 0;
        this.vehicRot = 0;
        this.vehicflx = this.vehicX + VEHIC_HALFLENGTHF;
        this.vehicflz = this.vehicZ - VEHIC_HALFWIDTH;
        this.vehicfrx = this.vehicX + VEHIC_HALFLENGTHF;
        this.vehicfrz = this.vehicZ + VEHIC_HALFWIDTH;
        this.vehicrlx = this.vehicX - VEHIC_HALFLENGTHR;
        this.vehicrlz = this.vehicZ - VEHIC_HALFWIDTH;
        this.vehicrrx = this.vehicX - VEHIC_HALFLENGTHR;
        this.vehicrrz = this.vehicZ + VEHIC_HALFWIDTH;
        this.jointAngle = 0;
        this.baseAngle = 0;
        this.speedfactor = 0.1;
        this.anglefactor = 4;
        this.anglePressed = false;
        this.wheelAngle = 0;
        this.moving = false;
        this.islocked = false;
        this.rotVehic = 0;
        this.luzesUtilizadas = 5;
        var attached = false;
        this.craneX = 5.5;
        this.craneY = 2.5;
        this.craneZ = 3.2;
        this.tempx = 0;
        this.tempz = 0;

        //Interface
        this.Luz1 = true;
        this.Luz2 = true;
        this.Luz3 = true;
        this.Luz4 = true;
        this.Luz5 = true;
        this.eixos = false;
        this.speed = 0;
        this.velocidade = 10 * this.speed;
        this.height = (4 - VEHIC_HEIGHT);
        this.vehicleAppearances = [];
        this.vehicleAppearances.push("/resources/images/back.png");
        this.vehicleAppearances.push("/resources/images/front.png");
        this.vehicleAppearances.push("/resources/images/robotbody.png");
        this.vehicleAppearances.push("/resources/images/metalAppearance2.png");
        this.vehicleAppearances.push("/resources/images/robothead2.png");
        this.vehicleAppearances.push("/resources/images/robotbody2.png");
        this.vehicleAppearances.push("/resources/images/metalAppearance3.png");
        this.vehicleAppearances.push("/resources/images/robothead3.png");
        this.vehicleAppearances.push("/resources/images/robotbody3.png");

        this.currVehicleAppearance = 'mercedes';
        this.vehicleAppearanceList = ['mercedes', 'scooby', 'a-team'];

        this.TERRAIN_MAP = [[6, 6, 6, 5, 4, 4, 4, 4, 4, 4, 4], [5, 5, 5, 5, 3, 1, 1, 1, 1, 1, 3], [3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 2], [3, 0, 0, 0, 0, 0, 0, 3, 6, 3, 2], [3, 0, 0, 0, 0, 0, 0, 3, 6, 3, 2], [3, 0, 0, 3, 1, 0, 0, 3, 4, 3, 2], [3, 0, 0, 3, 4, 4, 4, 3, 3, 3, 2], [3, 0, 0, 3, 3, 3, 3, 1, 0, 0, 3], [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3], [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3], [5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]];

        //example for nrDivs = 7 -> grid of 8x8 vertices
        this.altimetry = [[2.0, 3.0, 2.0, 4.0, 2.5, 2.4, 2.3, 1.3], [2.0, 3.0, 2.0, 4.0, 7.5, 6.4, 4.3, 1.3], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 2.0, 4.0, 2.5, 2.4, 0.0, 0.0], [0.0, 0.0, 2.0, 4.0, 3.5, 2.4, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]];

    }
    ;init(application) {
        super.init(application);

        this.initCameras();

        this.initLights();

        this.gl.clearColor(0.529, 0.808, 0.922, 1.0);
        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.axis = new CGFaxis(this);

        // Scene elements
        this.terrain = new MyTerrain(this,(this.TERRAIN_MAP[0].length) - 1,this.TERRAIN_MAP);
        this.vehicle = new MyVehicle(this,this.vehicX,this.vehicZ,this.wheelAngle);
        this.myCrane = new MyCrane(this,0,0,0,0,0,0);

        // Materials
        this.materialDefault = new CGFappearance(this);

        this.materialA = new CGFappearance(this);
        this.materialA.setAmbient(0.3, 0.3, 0.3, 1);
        this.materialA.setDiffuse(0.6, 0.6, 0.6, 1);
        this.materialA.setSpecular(0, 0.2, 0.8, 1);
        this.materialA.setShininess(120);

        this.materialB = new CGFappearance(this);
        this.materialB.setAmbient(0.3, 0.3, 0.3, 1);
        this.materialB.setDiffuse(0.6, 0.6, 0.6, 1);
        this.materialB.setSpecular(0.8, 0.8, 0.8, 1);
        this.materialB.setShininess(120);

        this.materialFloor = new CGFappearance(this);
        this.materialFloor.setAmbient(0.3, 0.25, 0.2, 1);
        this.materialFloor.setDiffuse(0.4, 0.3, 0.2, 1);
        this.materialFloor.setSpecular(0.5, 0.3, 0.1, 1);
        this.materialFloor.setShininess(160);

        this.materialWall = new CGFappearance(this);
        this.materialWall.setAmbient(0.8, 0.7, 0.6, 1);
        this.materialWall.setDiffuse(0.7, 0.6, 0.5, 1);
        this.materialWall.setSpecular(1, 0.5, 0.75, 1);
        this.materialWall.setShininess(80);

        //update period
        this.setUpdatePeriod(100);

    }
    ;update(currTime) {
        this.velocidade = 10 * this.speed;

        if (this.pickingSite() || this.moving) {
            this.PickAndDrop();
        }
        ;this.updateVehicle();
        this.updateCrane();
        this.checkKeys();
    }
    ;initCameras() {
        this.camera = new CGFcamera(0.4,0.1,500,vec3.fromValues(30, 30, 30),vec3.fromValues(0, 0, 0));
    }
    ;initLights() {
        this.setGlobalAmbientLight(0, 0, 0, 1.0);

        // Positions for four lights
        this.lights[0].setPosition(4, 6, 1, 1);
        this.lights[0].setVisible(false);

        this.lights[0].setAmbient(0, 0, 0, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setSpecular(1.0, 1.0, 0.0, 1.0);
        this.lights[0].enable();

        this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
        this.lights[1].setVisible(false);

        this.lights[1].setAmbient(0, 0, 0, 1);
        this.lights[1].setSpecular(1.0, 1.0, 1.0, 1.0);
        this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[1].enable();

        this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
        this.lights[2].setVisible(false);
        this.lights[2].setAmbient(0, 0, 0, 1);
        this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
        this.lights[2].setConstantAttenuation(0.0);
        this.lights[2].setLinearAttenuation(1);
        this.lights[2].setQuadraticAttenuation(0.0);
        this.lights[2].enable();

        this.lights[3].setPosition(4.0, 6.0, 5.0, 1.0);
        this.lights[3].setVisible(false);

        this.lights[3].setAmbient(0, 0, 0, 1);
        this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[3].setSpecular(1.0, 1.0, 0.0, 1.0);

        this.lights[3].enable();

        //luz quadrante oposto
        this.lights[4].setPosition(-5, -7.8, -5.0, 1.0);
        this.lights[4].setVisible(false);
        this.lights[4].setAmbient(0.5, 0.3, 0.7, 1);
        this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[4].setSpecular(1.0, 1.0, 0.0, 1.0);
        this.lights[4].enable();

        this.enableTextures(true);

        this.terrainAppearance = new CGFappearance(this);
        this.terrainAppearance.loadTexture("images/mapa3.png");
        //this.terrainAppearance.setTextureWrap("REPEAT", "REPEAT");

        this.floorAppearance = new CGFappearance(this);
        this.floorAppearance.loadTexture("../resources/images/floor.png");
        this.floorAppearance.setTextureWrap("REPEAT", "REPEAT");

        this.windowAppearance = new CGFappearance(this);
        this.windowAppearance.loadTexture("../resources/images/window.png");
        this.windowAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");

        this.slidesAppearance = new CGFappearance(this);
        this.slidesAppearance.loadTexture("../resources/images/slides.png");
        this.slidesAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");
        this.slidesAppearance.setDiffuse(0.8, 0.8, 0.8, 1);
        this.slidesAppearance.setSpecular(0.2, 0.2, 0.2, 1);
        this.slidesAppearance.setShininess(10);

        this.boardAppearance = new CGFappearance(this);
        this.boardAppearance.loadTexture("../resources/images/board.png");
        this.boardAppearance.setDiffuse(0.2, 0.2, 0.2, 1);
        this.boardAppearance.setSpecular(0.6, 0.6, 0.6, 1);
        this.boardAppearance.setShininess(120);

        this.cilinderAppearance = new CGFappearance(this);
        this.cilinderAppearance.loadTexture("images/stone_column.jpg");
        this.cilinderAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
        this.cilinderAppearance.setSpecular(0.6, 0.6, 0.6, 1);
        this.cilinderAppearance.setShininess(190);

        this.clock = new CGFappearance(this);
        this.clock.loadTexture("../resources/images/clock.png");
        this.clock.setDiffuse(0.9, 0.9, 0.9, 1);
        this.clock.setSpecular(0.6, 0.6, 0.6, 1);
        this.clock.setShininess(190);

    }
    ;updateLights() {
        for (var i = 0; i < this.lights.length; i++)
            this.lights[i].update();
    }

    display() {

        if (this.Luz1 == false) {
            this.lights[0].disable();
        } else
            this.lights[0].enable();

        if (this.Luz2 == false) {
            this.lights[1].disable();
        } else
            this.lights[1].enable();

        if (this.Luz3 == false) {
            this.lights[2].disable();
        } else
            this.lights[2].enable();

        if (this.Luz4 == false) {
            this.lights[3].disable();
        } else
            this.lights[3].enable();

        if (this.Luz5 == false) {
            this.lights[4].disable();
        } else
            this.lights[4].enable();

        // ---- BEGIN Background, camera and axis setup

        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        // Initialize Model-View matrix as identity (no transformation)
        this.updateProjectionMatrix();
        this.loadIdentity();

        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Update all lights used
        this.updateLights();

        // Draw axis
        if (this.isAxis) {

            this.axis.display();
        }

        //activar material default
        this.materialDefault.apply();

        // ---- END Background, camera and axis setup

        // ---- BEGIN Scene drawing section

        this.materialDefault.apply();

        // Terrain
        this.pushMatrix();
        this.rotate(-Math.PI / 2, 1, 0, 0);
        this.translate(7.5, 4, 0);
        this.scale(TERRAIN_WIDTH, TERRAIN_HEIGHT, 0.2);
        this.materialDefault.apply();
        this.terrainAppearance.apply();
        this.terrain.display();
        this.popMatrix();

        //vehicle

        this.pushMatrix();

        //   this.translate(this.tempx, 0, this.tempz);
        this.rotate(this.rotVehic, 0, 1, 0);
        // this.translate(-this.tempx, 0, -this.tempz);

        this.translate(this.vehicX, 0, this.vehicZ);
        this.rotate(this.vehicRot, 0, 1, 0);
        this.translate(0, 0.71 + this.vehicY, 0);
        this.rotate(-90 * degToRad, 1, 0, 0);
        this.vehicle.display();
        this.popMatrix();

        // Crane
        this.pushMatrix();
        this.scale(2, 2, 2);
        this.translate(this.craneX, this.craneY, this.craneZ);
        this.materialDefault.apply();
        this.rotate(Math.PI * 6 / 7, 0, 1, 0);
        this.scale(1.2, 1.2, 1.2);
        this.myCrane.display();
        this.popMatrix();

        // ---- END Scene drawing section
    }
    ;doSomething() {// console.log("Doing something...");
    }
    ;showAxis() {
        if (!this.isAxis) {

            this.isAxis = true;
        } else
            this.isAxis = false;
    }
    ;getAlt(x, z) {

        var alt;
        var tmp = x;
        x = z + 25;
        z = tmp + 25;
        x /= 5;
        z /= 5;
        x = Math.trunc(x);
        z = Math.trunc(z);
        alt = (this.TERRAIN_MAP[x][z] + this.TERRAIN_MAP[x + 1][z + 1] + this.TERRAIN_MAP[x + 1][z] + this.TERRAIN_MAP[x][z + 1]) / 4;
        return alt;
    }

    insideBounds() {

        var newflx = this.vehicflx + this.speed * Math.cos(this.vehicRot);
        var newflz = this.vehicflz + this.speed * Math.sin(this.vehicRot);
        var newfrx = this.vehicfrx + this.speed * Math.cos(this.vehicRot);
        var newfrz = this.vehicfrz + this.speed * Math.sin(this.vehicRot);
        var newrlx = this.vehicrlx + this.speed * Math.cos(this.vehicRot);
        var newrlz = this.vehicrlz + this.speed * Math.sin(this.vehicRot);
        var newrrx = this.vehicrrx + this.speed * Math.cos(this.vehicRot);
        var newrrz = this.vehicrrz + this.speed * Math.sin(this.vehicRot);

        if (!(this.getAlt(newflx, newflz) && this.getAlt(newfrx, this.vehicfrz) && this.getAlt(newrlx, newrlz) && this.getAlt(newrrx, newrrz))) {

            return 1;
        }
    }

    updateCrane() {

        if (this.myCrane.arm2rot + this.jointAngle >= -3 && this.myCrane.arm2rot + this.jointAngle < 50) {
            //-25
            this.myCrane.arm2rot += this.jointAngle;
        }

        if (this.myCrane.rotBase + this.baseAngle >= 0 && this.myCrane.rotBase + this.baseAngle <= 3.00) {
            this.myCrane.rotBase += this.baseAngle;
        }

        this.baseAngle = 0;
        this.jointAngle = 0;

    }

    /* pullUp() {
           while (this.vehicY < this.myCrane.magnetz) {
            this.vehicY -= FACTOR_UP;
                    }
    }

    Drop() {
        while (this.vehicY > 0) {        
            this.vehicY -= FACTOR_DOWN;
        }
    }*/

    PickAndDrop() {

        // PullUp();
        if (this.myCrane.rotBase == 0 && this.vehicY <= 4.5) {
            this.islocked = true;
            //1º desce magnet
            //depois sobe magnet e cARRO
            this.vehicY += FACTOR_UP;

        } else if (this.myCrane.rotBase == 0) {
            this.vehicY = 4.5;
            this.myCrane.rotBase += BASE_FACTOR;
        }//move();
        else if (this.myCrane.rotBase < 3.00 && this.vehicY == 4.5) {
            this.moving = true;
            this.myCrane.rotBase += BASE_FACTOR;
            this.vehicZ -= Math.cos(this.myCrane.rotBase)+0.45;
            this.vehicX -= Math.sin(this.myCrane.rotBase)*0.9;
    

        }//Drop();

        else if (this.myCrane.rotBase > 2.999 && this.vehicY > 0) {
            //1º desce magnet e carro
            this.vehicY -= FACTOR_DOWN;
            //depois sobe magnet
        }//moveBack();
        else if (this.vehicY <= 0.002 && this.myCrane.rotBase > 0) {
            console.log("inicio");
            if (this.islocked == true) {
                this.speed = 0;
                this.vehicY = 0;
                this.islocked = false;
             }
           
            if (!this.islocked) {
  
                this.myCrane.rotBase -= BASE_FACTOR;
                if (this.myCrane.rotBase < 0.02) {
                    this.myCrane.rotBase = 0;
                    this.moving = false;
                }
            }
   
        }
    }

  
    updateVehicle() {
        this.vehicle.updateWheels(-this.wheelAngle, this.speed, this.anglePressed);

        if (!this.islocked) {
            //if (this.insideBounds()) {  //O X e o Z estão mal e consequentemente tudo o resto depois vai estar mal
            this.vehicX -= this.speed * Math.cos(this.vehicRot);
            this.vehicZ += this.speed * Math.sin(this.vehicRot);
        }
    }

    pickingSite() {

        if (this.vehicX > 20 && this.vehicZ > 10 && this.vehicZ < 12 && this.vehicX < 22) {
            return 1;
        }
    }

    low() {
        //SE z da parte de baixo da roda < LOW_CONST
        return 1;
    }

    showCoords() {
        console.log("x=" + this.vehicX + "\tz=" + this.vehicZ + "\ty=" + this.vehicY);
    }
/*
    droppingSite() {
        if (this.vehicX > -5 && this.vehicZ > -5 && this.vehicZ < 5 && this.vehicX < 5) {
            console.log("DROPPING site");
            return 1;
        }
    }
*/
    checkKeys() {
        // var text = "Keys pressed: ";
        var keysPressed = false;
        if (this.gui.isKeyPressed("KeyP")) {

            if (this.pickingSite()) {

                this.speed = 0;
                this.PickAndDrop();
            }
            // text += " P ";
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyL")) {
            if (this.droppingSite() && this.low()) {
                //  this.Drop();
                this.islocked = false;
            }
            // text += " L ";
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("ArrowUp")) {
            this.jointAngle = JOINT_FACTOR;
            this.myCrane.magnetz += LENGTH_ARM * (1 - Math.sin(degToRad * this.myCrane.arm2rot));
            this.height = ((this.myCrane.magnetz - VEHIC_HEIGHT) / 10);

            //text += " ^ ";
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("ArrowDown")) {
            this.jointAngle = -JOINT_FACTOR;
            this.myCrane.magnetz -= LENGTH_ARM * (1 - Math.sin(degToRad * this.myCrane.arm2rot));
            this.height = ((this.myCrane.magnetz - VEHIC_HEIGHT) / 10);
            //text += " v ";

            keysPressed = true;
        }
        if (this.gui.isKeyPressed("ArrowRight")) {
            this.baseAngle = -BASE_FACTOR;
            //text += " -> ";
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("ArrowLeft")) {
            this.baseAngle = BASE_FACTOR;
            // text += " <- ";
            keysPressed = true;
        }
        if (!this.islocked && this.gui.isKeyPressed("KeyW")) {
            //text += " W ";
            this.speed += this.speedfactor;
            keysPressed = true;
        }
        if (!this.islocked && this.gui.isKeyPressed("KeyS")) {
            //text += " S ";
            this.speed -= this.speedfactor;
            keysPressed = true;
        }
        if (!this.islocked && this.gui.isKeyPressed("KeyA")) {
            this.anglePressed = true;
            //text += " A ";
            this.wheelAngle += this.anglefactor;
            this.vehicRot += this.anglefactor / 10 * this.speed;
            keysPressed = true;
        }
        if (!this.islocked && this.gui.isKeyPressed("KeyD")) {
            this.anglePressed = true;
            //text += " D ";
            this.wheelAngle -= this.anglefactor;
            this.vehicRot -= this.anglefactor / 10 * this.speed;
            //  console.log
            keysPressed = true;
        }
        if (!this.gui.isKeyPressed("KeyA") && !this.gui.isKeyPressed("KeyD")) {
            this.wheelAngle = 0;
            this.anglePressed = false;
        }
        // if (keysPressed)
        //   console.log(text);
    }

}
;