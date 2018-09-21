class MyInterface extends CGFinterface {

    /**
	 * MyInterface
	 * @constructor
	 */
    constructor() {
        super();
        var dat = this;
    }

    /**
	 * init
	 * @param {CGFapplication} application
	 */
    init(application) {
        // call CGFinterface init
        super.init(application);

        // init GUI. For more information on the methods, check:
        //  http://workshop.chromeexperiments.com/examples/gui

        this.gui = new dat.GUI();

        this.gui.add(this.scene, 'doSomething');

        var group = this.gui.addFolder("Luzes");
        group.open();

        group.add(this.scene, 'Luz1');
        group.add(this.scene, 'Luz2');

        group.add(this.scene, 'Luz3');

        group.add(this.scene, 'Luz4');
        group.add(this.scene, 'Luz5');

        var axis = this.gui.add(this.scene, 'showAxis');
        this.gui.add(this.scene, 'currVehicleAppearance', this.scene.vehicleAppearanceList).name('texture');

        var velocidade = this.gui.add(this.scene, 'velocidade', -100, 100).listen();
        var height = this.gui.add(this.scene, 'height', 0, 10).listen();

        var update = function() {
            requestAnimationFrame(update);

        };

        update();

        console.log(this.scene.speed);
        this.initKeys();
        return true;
    }
    ;
    initKeys() {
        this.scene.gui = this;
        this.processKeyboard = function() {}
        ;
        this.activeKeys = {};
    }
    processKeyDown(event) {
        this.activeKeys[event.code] = true;
    }
    ;processKeyUp(event) {
        this.activeKeys[event.code] = false;
    }
    ;isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }

}
;