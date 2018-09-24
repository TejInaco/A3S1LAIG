/**
 * MyTriangularPrism
 * @param gl {WebGLRenderingContext}
 * @constructor
 */




class MyTriangularPrism extends CGFobject
{

	constructor(scene)	{

		super(scene);
		

 		this.initBuffers();


		this.myTriangularTop = new MyIsoscelesRightTriangle(this.scene);
		this.myTriangularTop.initBuffers;

		this.myTriangularPrism = new MyIsoscelesRightPrism(this.scene, 3, 10);
		this.myTriangularPrism.initBuffers;

	};
	

	
	


	
	display(){

	

	
//triangular Prism Back of rear wheels
	this.scene.pushMatrix();
//	this.scene.translate(x,y,z);
	this.scene.translate(-5,-1.05 ,2.05);
	this.scene.rotate(-Math.PI/2,1,0,0);
	this.scene.scale(1,1,2.1)

	this.myTriangularPrism.display();
	this.scene.popMatrix();


//add triangular tops
	this.scene.pushMatrix();
//	this.scene.translate(x,y,z);
	this.scene.translate(-5,-1.05 ,2.05);
	this.scene.rotate(-Math.PI/2,1,0,0);
	this.scene.scale(1,1,2.1)

	this.myTriangularTop.display();
	this.scene.popMatrix();

	//add triangular tops
	this.scene.pushMatrix();
//	this.scene.translate(x,y,z);
	this.scene.translate(-5,1.05 ,2.05);
	this.scene.rotate(-Math.PI/2,1,0,0);
	this.scene.scale(1,1,2.1)

	this.myTriangularTop.display();
	this.scene.popMatrix();

	}
};