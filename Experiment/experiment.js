/* Global Variables */
/* the developer should define variables and constants here */
/* We define a room with 3 walls, floor and ceiling */
/* We define a ball which bounces in the xy plane */
/* We define modifiable prameters : gravity, ball size, initial velocity */
/* We support draggable ball */
/* Scene Dimensions (in meters: at z = 0) */
var mySceneTLX;        /* Top Left corner X coordinate */
var mySceneTLY;        /* Top Left corner Y coordinate */
var mySceneBRX;        /* Bottom Right corner X coordinate */
var mySceneBRY;        /* Bottom Right corner Y coordinate */
var mySceneW;          /* Scene Width */
var mySceneH;          /* Scene Height */
var myCenterX;         /* Scene Center X coordinate */
var myCenterY;         /* Scene Center Y coordinate */

/* Room Variables */
var leftB;              /* Left Barrier */
var rightB;             /* Right Barrier */
var bottomB;            /* Bottom Barrier */
var topB;               /* Top Barrier */
var backB=-5.0;         /* Back Barrier */
var wallThickness;      /* Wall Thickness */

/* Room Objects */
var myFloor;            /* Floor */
var myCeiling;          /* Ceiling */
var myBack;             /* Back */
var myRight;            /* Right */
var myLeft;             /* Left */

var PosX, Xdefault, Xmin, Xmax, Xstep;
var mag1,mag2;

/******************* End of Interaction functions ***********************/



//****************************************************************** */
function initialiseControlVariables()
{
}


function initialiseControls()
{
    initialiseControlVariables();
    /* Create Input Panel */
}
/******************* End of GUI control objects code ***********************/








/******************* Load Experiment objects code ***********************/

var helpContent;
function initialiseHelp()
{
    helpContent="";
    helpContent = helpContent + "<h2> Rotating Magnets experiment help</h2>";
    helpContent = helpContent + "<h3>About the experiment</h3>";
    helpContent = helpContent + "<p>The experiment is about showing natural working of magnets</p>";
    helpContent = helpContent + "<p>This experiment do not need any initial setup except magnet positions. As you can see there are two magnets on the table of which one magnet is made fixed at the center on its axis, other one being free to move horizontally.</p>";
    helpContent = helpContent + "<h3>The animation stage</h3>";
    helpContent = helpContent + "<p>In the animation stage, you do not have to click on start button !</p>";
    helpContent = helpContent + "<p>You can simply drag the free to move magnet and observe the fixed magnet which is free to rotate on its axis.</p>";
    helpContent = helpContent + "<p>The two magnets will behave according to natural physics law.</p>";
    helpContent = helpContent + "<h2>Happy Experimenting !</h2>";
    PIEupdateHelp(helpContent);
}

var infoContent;
function initialiseInfo()
{
    infoContent =  "";
    infoContent = infoContent + "<h2>Rotating magnets experiment concepts</h2>";
    infoContent = infoContent + "<h3>About the experiment</h3>";
    infoContent = infoContent + "<p>The experiment shows force of magnet on other magnet.</p>";
    infoContent = infoContent + "<h3>Passing through Stages</h3>";
    infoContent = infoContent + "<p>First of all declaration of color codes:</p>";
    infoContent = infoContent + "<ul><li>Red &nbsp: North Pole of Bar magnet</li>";
    infoContent = infoContent + "<li>Blue : South Pole of Bar magnet</li></ul>";    
    infoContent = infoContent + "<p>Now as South pole of free magnet comes nearer to fixed one, the fixed magnet's North pole will attract towards it and South pole will repel it.</p>";
    infoContent = infoContent + "<p>So gradually as magnet comes nearer the fixed magnet will rotate towards it, try you hands on it !</p>";
    infoContent = infoContent + "<h2>Happy Experimenting ! </h2>";
    PIEupdateInfo(infoContent);
}

function initialiseScene()
{
    /* Initialise Scene Variables */
    mySceneTLY = 10;
    mySceneTLX = -20;
    mySceneBRX = 20;
    mySceneBRY = -10;
    mySceneW   = (mySceneBRX - mySceneTLX);
    mySceneH   = (mySceneTLY - mySceneBRY);
    myCenterX  = (mySceneTLX + mySceneBRX) / 2.0;
    myCenterY  = (mySceneTLY + mySceneBRY) / 2.0;

}

function initialiseOtherVariables()
{
    /* Initialise variables */
    wallThickness = 0.20;

    /* Barriers */
    leftB=mySceneTLX;
    rightB=mySceneBRX;
    bottomB=mySceneBRY;
    topB=mySceneTLY;
}

function initialiseRoom()
{
    var geometry = new THREE.BoxGeometry( mySceneW * 2, wallThickness, 100);
    var material = new THREE.MeshLambertMaterial( {color: 0xeeeeee} );
    myFloor  = new THREE.Mesh( geometry, material );
    // myFloor.lookAt(new THREE.Vector3(0,1,0));
    myFloor.position.set(myCenterX, bottomB - (wallThickness / 2), 0.0);
    myFloor.receiveShadow = true;
    PIEaddElement(myFloor);
    /* Left */
    geometry = new THREE.BoxGeometry( wallThickness, mySceneH * 2, 100 );
    material = new THREE.MeshLambertMaterial( {color: 0xaa0000} );
    myLeft = new THREE.Mesh( geometry, material );
    myLeft.position.set(leftB-(wallThickness/2), myCenterY, 0.0);
    myLeft.receiveShadow = true;
    PIEaddElement(myLeft);
    /* Right */
    geometry = new THREE.BoxGeometry( wallThickness, mySceneH * 2, 100 );
    material = new THREE.MeshLambertMaterial( {color: 0xaa0000} );
    myRight = new THREE.Mesh( geometry, material );
    myRight.position.set(rightB+(wallThickness/2), myCenterY, 0.0);
    myRight.receiveShadow = true;
    PIEaddElement(myRight);
    
    // background
    var texture = new THREE.TextureLoader().load('DrStrange.jpg');
    geometry = new THREE.BoxGeometry(mySceneW * 2,mySceneH*2,wallThickness );
    material = new THREE.MeshLambertMaterial( {color: 0x000044} );
    var myback = new THREE.Mesh( geometry, material );
    myback.position.set(myCenterX, myCenterY, -20);
    myback.receiveShadow = true;
    PIEaddElement(myback);
    PIErender();
}

function addBase(x,y,z)
{
    var geometry = new THREE.BoxGeometry( 0.5,10, 0.5);
    var material = new THREE.MeshLambertMaterial( {color: 0x111111} );
    var table  = new THREE.Mesh( geometry, material );
    // myFloor.lookAt(new THREE.Vector3(0,1,0));
    table.position.set(x, y, z);
    table.receiveShadow = true;
    PIEaddElement(table);
}

function mag2drag(element, newpos)
{
    if(newpos.x>=0 && newpos.x<=3.75)
    {
        mag2.position.x=newpos.x-7.5;
        mag1.rotation.y = Math.PI - Math.abs(newpos.x-7.5)*((Math.PI/2)/3.75);
    } 
    PIErender();
}





function loadExperimentElements()
{


  var geometry;
  var material;
  var loader;
  var texture;

    PIEsetExperimentTitle("Rotating Magnet");
    PIEsetDeveloperName("Shivang Joshi");

    /* initialise help and info content */
    initialiseHelp();
    initialiseInfo();

    /* initialise Scene & Room */
    initialiseScene();
    initialiseOtherVariables();
    initialiseRoom();

    //***************** Table ******************************************************/
    geometry = new THREE.BoxGeometry( 18, wallThickness, 12);
    material = new THREE.MeshLambertMaterial( {color: 0x333333} );
    var table  = new THREE.Mesh( geometry, material );
    // myFloor.lookAt(new THREE.Vector3(0,1,0));
    table.position.set(myCenterX, myCenterY, 0.0);
    table.receiveShadow = true;
    var lm = new THREE.LineBasicMaterial({color:0x000000});
    var borders = new THREE.Line(geometry,lm);
    table.add(borders);
    PIEaddElement(table);
    addBase(6,-5,5);addBase(-6,-5,5);
    addBase(6,-5,-5);addBase(-6,-5,-5);
    /***************************************************************************** */
    geometry = new THREE.ConeGeometry(0.07,2,10);
    material = new THREE.MeshLambertMaterial({color: 0x000000});
    var needle = new THREE.Mesh(geometry,material);
    needle.position.set(myCenterX,myCenterY ,0);
    needle.receiveShadow = false;
    needle.castShadow = false;
    PIEaddElement(needle);
    /******************************************************************** */
    
    /******************* Magnets *************************************** */
    geometry = new THREE.BoxGeometry(0.8,0.2,1.5);
    var materialN = new THREE.MeshLambertMaterial({color:0xff0000});
    var materialS = new THREE.MeshLambertMaterial({color:0x0000aa});

    var mag1N = new THREE.Mesh(geometry,materialN);
    mag1N.position.set(myCenterX,myCenterY+0.2,-0.75);
    var mag1S=new THREE.Mesh(geometry,materialS);
    mag1S.position.set(myCenterX,myCenterY+0.2,0.75);
    mag1 = new THREE.Group();
    mag1.add(mag1N);
    mag1.add(mag1S);
    mag1.position.set(0,0,0);
    PIEaddElement(mag1);

    var mag2N = new THREE.Mesh(geometry,materialN);
    mag2N.position.set(myCenterX,myCenterY+0.2,-0.75);
    var mag2S=new THREE.Mesh(geometry,materialS);
    mag2S.position.set(myCenterX,myCenterY+0.2,0.75);
    mag2 = new THREE.Group();
    mag2.add(mag2N);
    mag2.add(mag2S);
    mag2.position.set(-7.5,0,0);
    mag2.rotation.y+=Math.PI/2;
    PIEaddElement(mag2);
    PIEdragElement(mag2N);
    PIEsetDrag(mag2N,mag2drag);

    /******************* Magnets END *********************************** */



    //initialiseControls();
    //PIEsetAreaOfInterest(mySceneTLX, mySceneTLY, mySceneBRX, mySceneBRY);
    PIEadjustCamera(myCenterX,10,17);
    PIEturnCamera(myCenterX,myCenterY,0);
    var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 ); // soft white light
    PIEaddElement(light);
    PIErender();
}
/******************* End of Load Experiment objects code ***********************/

function resetExperiment()
{
    /* initialise Other Variables */
    initialiseOtherVariables();
    mag2.position.set(-7.5,0,0);
    mag1.position.set(0,0,0);
    mag1.rotation.y=0;
    PIErender();
} 

function updateExperimentElements(t, dt)
{
    //line.geometry.setDrawRange(0,drawCount+(t%1000));
    //line.geometry.attributes.position.needsUpdate = true;
    PIErender();
}

/******************* Update (animation changes) code ***********************/
