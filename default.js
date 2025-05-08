/*
RV's Workout Planner
*/

// the value is actually the most important, it allows for switching through different
// types of exercises, when they click the forward button for example; it adds +1 to this value and
// switches the image and exercise name to correspond itThis variable is utilized by far the most
// throughout the programit also is used for finding the out of bounds, when this value is out of
// the list length it will set it to 0 to go back to inital exercise, and if its below the list length it will
// make the value equal to the list length - 1 to go back one square
var value = 0;

// a square's dimensions, it's easier to distinguish it in a variable
// then entering 50 each time for a button.
var squareDimensions = 50;

// the select button dimensions
var selectButtonDimensionsX = 200;
var selectButtonDimensionsY = 50;

// where the select button coordinates are for the rectangle, text is done manually since
// text aligns differently than shapes
var selectButtonX = 100;
var selectButtonY = 400;

// the dimensions of the pullButton and all buttons in the main menu, if this value changes
// all the following dimensions in the main menu will also change.
var pullButtonDimensionsX = 275;
var pullButtonDimensionsY = 50;

// this is where the pullButton is in the menu and the rest of the buttons
// ex: push, isolation, complete plan correspond with, they are in increments
// of +35 from this y axis.
var pullButtonX = 60;
var pullButtonY = 125;

// where the right button coordinates are for the square
var rightButtonSquareX = 310;
var rightButtonSquareY = 400;

// where the left button coordinates are for the square
var leftButtonSquareX = 40;
var leftButtonSquareY = 400;

// coordinates of where the x button is going to be, these coordinates are the top left and 15 away from
// the x and y
var exitButtonX = 15;
var exitButtonY = 15;

// the image list push corresponds to the name of the exerciseFor example, imageListPush[0] is the image for pushExercises[0] and all the
// exercise and image lists correspond with eachother
var imageListPush =['https://training.fit/wp-content/uploads/2018/11/bankdruecken-flachbank-langhantel.png','https://training.fit/wp-content/uploads/2020/02/bankdruecken-kurzhantel-schraeg.png','https://training.fit/wp-content/uploads/2020/03/kniebeugen-langhantel.png','https://training.fit/wp-content/uploads/2020/02/negativ-liegestuetze.png','https://training.fit/wp-content/uploads/2020/02/dips.png'];
var pushExercises = ['Bench Press','Incline Dumbbell Press','Barbbell Squats','Decline Push-ups','Dips'];

// image list pull corresponds with pull exercises and contains all the data for the images and all the exercise names for each category
var imageListPull = ['https://training.fit/wp-content/uploads/2020/02/klimmzuege-maschine-unterstuetzt.png','https://training.fit/wp-content/uploads/2020/02/rudern-kabelzug-800x448.png','https://training.fit/wp-content/uploads/2020/02/latzug.png','https://training.fit/wp-content/uploads/2020/02/rudern-kurzhantel.png','https://training.fit/wp-content/uploads/2020/02/rudern-tstange-800x448.png'];
var pullExercises = ['Assisted Pull Up','Seated Cable Row','Lateral Pulldowns','Single Arm Dumbbell Row','T-Bar Row'];

// all isolation exercises are stored alongside their image here
var imageListIsolation = ['https://training.fit/wp-content/uploads/2020/03/trizepsdruecken-kabelzug.png','https://training.fit/wp-content/uploads/2018/12/bizepscurls.png','https://training.fit/wp-content/uploads/2020/03/schulterdruecken-kurzhanteln.png','https://training.fit/wp-content/uploads/2020/03/seitenheben-kurzhanteln.png','https://training.fit/wp-content/uploads/2020/02/fliegende-kabelzug.png']
var isolationExercises = ['Cable Tricep Pushdowns','Biceps Curl','Dumbbell Shoulder Press','Lateral Raise','Cable Chest Fly'];

// the user fills up the list by clicking the select button in the program
// and then when the user clicks 'Complete Plan' in the UI; it displays whatever
// is in this listEach exercise still corresponds with its image counterpart
var imageUserSelectedExercises = [];
var userSelectedExercises = [];

var currentImage;
var currentText;
var selection; 
var selectionImage;

var isPullMenu = false;
var isPushMenu = false;
var isIsolationMenu = false;
var isCompletePlanMenu = false;
var isMainMenu = false;

var numberOfWorkout = 0;

// initial start function that contains the starting code
function start(){
    // start mouse click method and direct it with the buttonClick function that contains event
    mouseClickMethod(buttonClick);
    
    // all menus are directed through this one function (ex: pullMenu, isolationMenu) and is the first GUI displayed
    mainMenu();
    
    // Instructions on how to use program used by printing onto console, if this
    // was made to be a GUI, I believe it would be a hassle to click 'Continue' everytime
    // this menu pops up; console makes it less intrusive on the user
    
    println("--------------------------------------------------------------------------");
    println("How to use RV's Workout Planner:")
    println("");
    println("You can see above that all types of exercises are")
    println("split into multiple different categories (ex: push, pull, isolation)")
    println("Select any of the following categories and and you can select whatever");
    println("exercise you want from there by clicking the forward and back buttons");
    println("it will be added to your workout plan, you can also see your list in the console");
    println("You are NOT allowed to select the same exercise over and over again");
    println("Once you are done selecting, click the red X in the top left corner");
    println("and select 'Complete Plan' this will generate the entire workout for");
    println("you and you can scroll through each one with the forward and back button");
    println("--------------------------------------------------------------------------");
}

// this is the backend of the entire program and handles the mouse events through this one function
function buttonClick(e){
    // for any of these menus, it can use these button dimensions
    // the only menu that doesn't work is for complete plan menu
    // where you cant use the select button is the complete plan menu
    // as that menu doesn't require the select button.
    if(isPushMenu || isIsolationMenu || isPullMenu || isCompletePlanMenu){
        
        // Exercises Forward Button Click Detector
        if(e.getX() >= rightButtonSquareX && e.getX() <= squareDimensions + rightButtonSquareX && e.getY() >= rightButtonSquareY && e.getY() <= squareDimensions + rightButtonSquareY){
            value++;
        
        // if statement is for each type of menu and uses the length of the imageList
        // pull, push, isolation and if it exceeds that length it sets the value back to 0
        // (value is a global variable and is used for all arrays for adding text or images)
            if(isPullMenu){
                if(value >= imageListPull.length){
                    value = 0;
                }
                frameSetup(imageListPull[value], pullExercises[value]);
            } else if(isIsolationMenu){
                if(value >= imageListIsolation.length){
                    value = 0;
                }
                frameSetup(imageListIsolation[value], isolationExercises[value]);
            } else if(isPushMenu){
                if(value >= imageListPush.length){
                    value = 0;
                }
                frameSetup(imageListPush[value], pushExercises[value]);
            } else if (isCompletePlanMenu){
                if(value >= imageUserSelectedExercises.length){
                    value = 0;
                }
                frameSetup(imageUserSelectedExercises[value], userSelectedExercises[value]);
            }
        }
    
            // Exercises Back Button Click Detector
            // if the value goes below 0, it removes 1 from the image list length
            // and returns length - 1 to go back one element
            // the imageListPull corresponds to the pullExercises list
            // ex: imageListPull[1] is the image for pullExercises[1]
            if(e.getX() >= leftButtonSquareX && e.getX() <= squareDimensions + leftButtonSquareX && e.getY() >= leftButtonSquareY && e.getY() <= squareDimensions + leftButtonSquareY){
                value--;
            
                if(isPullMenu){
                    if(value < 0){
                        value = imageListPull.length - 1;
                    }
                    frameSetup(imageListPull[value], pullExercises[value]);
                } else if(isPushMenu){
                    if(value < 0){
                        value = imageListPush.length - 1;
                    }
                    frameSetup(imageListPush[value], pushExercises[value]);
                } else if(isIsolationMenu){
                    if(value < 0){
                        value = imageListIsolation.length - 1;
                    }
                    frameSetup(imageListIsolation[value], isolationExercises[value]);
                } else if (isCompletePlanMenu){
                    if(value < 0){
                        value = imageUserSelectedExercises.length - 1;
                    }
                    frameSetup(imageUserSelectedExercises[value], userSelectedExercises[value]);
                }
            }
            
             // Select Button Click Detector
            if(isPushMenu || isIsolationMenu || isPullMenu){
                if(e.getX() >= selectButtonX && e.getX() <= selectButtonDimensionsX + selectButtonX && e.getY() >= selectButtonY && e.getY() <= selectButtonDimensionsY + selectButtonY){
                    if(isPullMenu) {
                        selection = pullExercises[value];
                        selectionImage = imageListPull[value];
                    } else if(isPushMenu) {
                        selection = pushExercises[value];
                        selectionImage = imageListPush[value];
                    } else if(isIsolationMenu) {
                        selection = isolationExercises[value];
                        selectionImage = imageListIsolation[value];
                    }
                
                    if(!userSelectedExercises.includes(selection)){
                        userSelectedExercises.push(selection);
                        imageUserSelectedExercises.push(selectionImage);
                    } else {
                        var appearsAlreadyBackground = new Rectangle(selectButtonDimensionsX, selectButtonDimensionsY);
                        appearsAlreadyBackground.setPosition(selectButtonX,selectButtonY);
                        appearsAlreadyBackground.setColor("green");
                        add(appearsAlreadyBackground);
                        
                        var appearsAlreadyText = new Text("Already is in list!", "20pt Arial");
                        appearsAlreadyText.setPosition(selectButtonX + 4,435);
                        appearsAlreadyText.setColor("black");
                        add(appearsAlreadyText);
                        
                        setTimer(function(){remove(appearsAlreadyBackground)}, 1000);
                        setTimer(function(){remove(appearsAlreadyText)}, 1000);
                    }
                }
            }
        }    
    
    // this if statement contains all the buttons for the main menu, like traversing through
    // different menus and all of these click detectors follow the same template of code and is a easy way
    // to set up the main menu, below i put how I made it
    // how it's made:
    // first it has a if statement that gets the dimensions and coordinates of each button (like the width, height, etc.)
    // then it removes everything on the canvas and loads the function of whatever menu
    // is being opened
    if(isMainMenu){
        // Pull Button Click Detector
        // Rafael Pereira helped me with the logic of creating one button, then I was able to create the rest through it.
        // it was a great help towards the creation of the project
        if(e.getX() >= pullButtonX && e.getX() <= pullButtonDimensionsX + pullButtonX && e.getY() >= pullButtonY && e.getY() <=pullButtonDimensionsY + pullButtonY){
            removeAll();
            pullMenu();
        }
        
        // Push Button Click Detector
        if(e.getX() >= pullButtonX && e.getX() <= pullButtonDimensionsX + pullButtonX &&e.getY() >= pullButtonY + 75 && e.getY() <=pullButtonDimensionsY + pullButtonY + 75){
            removeAll();
            pushMenu();
        }
        
        // Isolation Button Click Detector
        if(e.getX() >= pullButtonX && e.getX() <= pullButtonDimensionsX + pullButtonX && e.getY() >= pullButtonY + 150 && e.getY() <=pullButtonDimensionsY + pullButtonY + 150){
            removeAll();
            isolationMenu();
        }
        
        // Complete Plan Button Click Detector
        if(e.getX() >= pullButtonX && e.getX() <= pullButtonDimensionsX + pullButtonX && e.getY() >= pullButtonY + 225 && e.getY() <=pullButtonDimensionsY + pullButtonY + 225){
            removeAll();
            completePlanMenu();
        }
    }
    
    // Exit Button Click Detector
    if(e.getX() >= exitButtonX && e.getX() <= (squareDimensions - 10) + exitButtonX && e.getY() >= exitButtonY && e.getY() <=(squareDimensions - 10) + exitButtonY){
        removeAll();
        mainMenu();
        
        // sets value of arrays to 0, to make sure each category starts at the default
        // exercise that is the first one in the lists.
        value = 0;
        
        // sets all booleans of menus to false to make sure the menus
        // that users are going through are being tracked and buttons that
        // aren't existent are being disabled
        isPushMenu = false;
        isPullMenu = false;
        isIsolationMenu = false;
        isCompletePlanMenu = false;
    }
}

/*
this function contains the actual setup of the image and the exercise name, it utilizes
parameters image and exerciseThe currentImage variable stores the image which is used
to remove the previous currentImage and same goes for currentText, it adds the exercisemname
and adds the image in the center of the canvas. it's the stuff that is consistent through every
single menu

adds the currentImage to the canvas with the following properties and
uses the parameter 'image' and adds whatever image is taken from the parameter

how to use this function:
frameSetup(image link goes first, exercise name entered here)

it removes the currentImage and currentText from the canvas and if I don't
do this then it'll keep the last image and text and just keep stacking on
eachother which ruins the visuals
*/
function frameSetup(image, exercise){
    if(currentImage && currentText){
        remove(currentImage);
        remove(currentText);
    }
    
    currentImage = new WebImage(image);
    currentImage.setSize(getWidth(), getHeight()/2);
    currentImage.setPosition(0, getHeight()/4);
    add(currentImage);
    
    currentText = new Text(exercise, "25pt Arial");
    var textWidth = currentText.getWidth();
    var centerX = (getWidth()- textWidth)/2;
    currentText.setColor("white");
    currentText.setPosition(centerX, getHeight()/4.7);
    add(currentText);
    
    clear();
    println("---------------------------")
    for(var i = 0; i < userSelectedExercises.length; i++){
        numberOfWorkout++;
        println(numberOfWorkout+". "+userSelectedExercises[i]);
    }
    println("---------------------------");
    numberOfWorkout = 0;
}

// this is just a rectangle that takes the width and height of the canvas
// then sets it to the coordinates 0,0 to fill up the entire canvas
// it's used in every menu function to make the background black
function blackBackground(){
    var blackBackground= new Rectangle(getWidth(),getHeight());
    blackBackground.setPosition(0,0);
    blackBackground.setColor("black");
    add(blackBackground);
}

// This function is the red X in the top left and is just the graphics for it, the event does most
// of the work and all the program; this just is the graphics side of it.
function exitButton(){
    var exitButtonSquare= new Rectangle(squareDimensions- 10,squareDimensions- 10);
    exitButtonSquare.setPosition(exitButtonX,exitButtonY);
    exitButtonSquare.setColor("red");
    add(exitButtonSquare);
    
    var exitText= new Text("x", "30pt Arial");
    exitText.setPosition(25,47);
    add(exitText);
}

// the graphics side for the select exercise button, these dimensions are taken and used in
// the if statements in the buttonClick event
function selectExerciseButton(){
    var selectButtonRectangle= new Rectangle(selectButtonDimensionsX,selectButtonDimensionsY);
    selectButtonRectangle.setPosition(selectButtonX,selectButtonY);
    selectButtonRectangle.setColor("lime");
    add(selectButtonRectangle);
    
    var selectText= new Text("Select", "30pt Arial");
    selectText.setPosition(selectButtonX+ 45, 440);
    add(selectText);
}

// this is the right button and pretty much every graphics panel utilizes
// the same exact code with one rectangle and one text, with just the dimensions
// and coordinates of everything being different and whatever is written on it
function rightButton(){
    var rightButtonSquare= new Rectangle(squareDimensions,squareDimensions);
    rightButtonSquare.setPosition(rightButtonSquareX,rightButtonSquareY);
    rightButtonSquare.setColor("lime");
    add(rightButtonSquare);
    
    var rightArrow= new Text(">", "30pt Arial");
    rightArrow.setPosition(325,440);
    add(rightArrow);
}

// same code as rightButton however the text is changed from > to < and is shifted
// on the x-axis
function leftButton(){
    var leftButtonSquare= new Rectangle(squareDimensions,squareDimensions);
    leftButtonSquare.setPosition(leftButtonSquareX, leftButtonSquareY);
    leftButtonSquare.setColor("lime");
    add(leftButtonSquare);
    
    var leftArrow= new Text("<", "30pt Arial");
    leftArrow.setPosition(53,440);
    add(leftArrow);
}

// since the buttons are already made, everything in the function is literally
// other procedures that I have createdI utilized top down design when
// creating this program as it removed a lot of unnecessary lines and just
// made it generally more readableThese procedures are continously used
// in the rest of the menus.
function pullMenu(){
    // sets background black through procedure
    blackBackground();
    
    // booleans to set the mainMenu to false (since the user exited the main menu)
    // and set the pullMenu to true since the user is currently in the pullMenu
    isMainMenu = false;
    isPullMenu = true;
    
    // initial image since the image only gets added when the value
    // is changed or a mouse click is detected in the buttons
    frameSetup(imageListPull[value], pullExercises[value]);
    
    // graphics side for each button
    leftButton();
    selectExerciseButton();
    rightButton();
    exitButton();
}

function pushMenu(){
    // sets background black through procedure
    blackBackground();
    
    // boolean for enabling pushMenu and disabling the mainMenu boolean
    isMainMenu = false;
    isPushMenu = true;
    
    // initial image
    frameSetup(imageListPush[value], pushExercises[value]);
    
    // graphics side for each button through procedure
    leftButton();
    selectExerciseButton();
    rightButton();
    exitButton();
}

function isolationMenu(){
    // sets background black through procedure
    blackBackground();
    
    // sets main menu to false and enables the isolation menu buttons
    isMainMenu = false;
    isIsolationMenu = true;
    
    // graphics side for what appears on the canvas
    frameSetup(imageListIsolation[value], isolationExercises[value]);
    leftButton();
    selectExerciseButton();
    rightButton();
    exitButton();
}

function completePlanMenu(){
    // sets background black through procedure
    blackBackground();
    
    // sets completePlan menu to true and disables mainMenu
    isMainMenu = false;
    isCompletePlanMenu = true;
    
    // select button is not necessary since there is nothing the user has to select
    // as this is where all the user selected exercises go and the userSelectedExercises
    // list is utilized for the creation of the frame and shows the visual to the user
    frameSetup(imageUserSelectedExercises[value], userSelectedExercises[value]);
    leftButton();
    rightButton();
    exitButton();
    
    // Indicates what page this is by saying "Your Workout Plan"
    var workoutPlanTitle = new Text("Your Workout Plan", "25pt Arial");
    workoutPlanTitle.setPosition(85,pullButtonY- 78);
    workoutPlanTitle.setColor("white");
    add(workoutPlanTitle);
}

function mainMenu(){
    // sets background black through procedure
    blackBackground();
    
    // sets mainMenu boolean to true, to indicate user has entered the main menu
    isMainMenu = true;
    
    // Program Title graphics side and just adds the text at the top indicating the name of the program
    var programTitle = new Text("RV's Workout Planner", "30pt Arial");
    programTitle.setPosition(4,pullButtonY - 40);
    programTitle.setColor("white")
    add(programTitle);
    
    // Pull Exercise Category Button graphics side (this template is used for the rest of the buttons)
    // the y-axis is just changed by adding in 35 increments and starting at 40 for the distance apart
    // from each other button; but the other buttons are mainly just copy pasted to save time on creation
    var pullButtonRectangle = new Rectangle(pullButtonDimensionsX,pullButtonDimensionsY);
    pullButtonRectangle.setPosition(pullButtonX, pullButtonY);
    pullButtonRectangle.setColor("lime");
    add(pullButtonRectangle);
    
    var pullButtonText = new Text("Pull Exercises", "30pt Arial");
    pullButtonText.setPosition(75,pullButtonY + 40);
    add(pullButtonText);
    
    // Push Exercise Category Button graphics side
    var pushButtonRectangle = new Rectangle(pullButtonDimensionsX,pullButtonDimensionsY);
    pushButtonRectangle.setPosition(pullButtonX, pullButtonY + 75);
    pushButtonRectangle.setColor("lime");
    add(pushButtonRectangle);
    
    var pushButtonText = new Text("Push Exercises", "30pt Arial");
    pushButtonText.setPosition(60,pullButtonY + 115);
    add(pushButtonText);

    // Isolation Exercise Category Button graphics side
    var isolationButtonRectangle = new Rectangle(pullButtonDimensionsX,pullButtonDimensionsY);
    isolationButtonRectangle.setPosition(pullButtonX, pullButtonY + 150);
    isolationButtonRectangle.setColor("lime");
    add(isolationButtonRectangle);
    
    var isolationButtonText = new Text("Isolation Exercises", "24pt Arial");
    isolationButtonText.setPosition(65,pullButtonY + 189);
    add(isolationButtonText);

    // Complete Workout Plan Button graphics side
    // the button doesn't appear until the user has selected atleast 1 exercise
    // by checking if it is undefined, because a error pops up if the user tries
    // to enter this menu it crashes the program and this is a way of fixing it.
    if(userSelectedExercises[0] != undefined){
        var workoutButtonRectangle = new Rectangle(pullButtonDimensionsX,pullButtonDimensionsY);
        workoutButtonRectangle.setPosition(pullButtonX, pullButtonY + 225);
        workoutButtonRectangle.setColor("lime");
        add(workoutButtonRectangle);
        
        var workoutButtonText = new Text("Complete Plan", "30pt Arial");
        workoutButtonText.setPosition(65,pullButtonY + 264);
        add(workoutButtonText);
    }
}
