//#region credits

//////////////////////////////////////////////////////////////////////////
//                       //                                             //
//   -~=Manoylov AC=~-   //      Spherical text magnification           //
//                       //                                             //
//////////////////////////////////////////////////////////////////////////
//                                                                      //
// Inspired by:                                                         //
//    Jared Tarbell's "Spherical Magnification" Artwork.                //
//    http://levitated.net/daily/levTextSphere.html                     //
//////////////////////////////////////////////////////////////////////////
//                                                                      //
// Controls                                                             //
//    mouse                                                             //
//       move: lens effect                                              //
//       down: change lens amount                                       //
//                                                                      //
//    keyboard                                                          //
//        'a': grid randomize                                           //
//        'z': lens amount randomize                                    //
//        'x': chars position randomize                                 //
//        'c': normal chars position & lens amount                      //
//////////////////////////////////////////////////////////////////////////
//                                                                      //
// Contacts:                                                            //
//    http://manoylov.tumblr.com/                                       //
//    https://codepen.io/Manoylov/                                      //
//    https://www.openprocessing.org/user/23616/                        //
//    https://www.facebook.com/epistolariy                              //
//////////////////////////////////////////////////////////////////////////
//
// without additional features this code will be much shorter

//#endregion

//bools for button
var isRandShiftPos = false;
var isRandLensAmount = false;

//lensParamenter
var lensParams = {
    radius: 450,
    magAmount: 2,
    magAddition: 1
};

//border Parameters
var horizontalBoder;
var verticalBorder;

//font
var fontForChar = 'Arial';

//helper
var charsArr = [];
var gridSurf;
var employees;
var logo;

//Json Arrays
var employeesJson;
var employeesIIT = [];
var employeesIITFitted = [];
var employeesIITname = [];
var employeesIITimage = [];

//row and Col Counter
var rowCount = 1;
var colCount = 1;
var rowCountOld;
var colCountOld;



//Helper Classes
// Point Class
function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.reset = function (x, y) {
    this.constructor(x, y);
};



//private helper methods
function JsonLoaded(data) {
    "use strict";
    employeesIIT = data.IIT;
    employees = employeesIIT.length;
    for (var i = employeesIIT.length; i < 80; i++) {
        append(employeesIIT, { "name": "", "image": "person.png" });
    }
}

function fillEmployeesArray() {
    employeesIITname = [];
    employeesIITimage = [];
    employeesIITFitted.forEach(function (element) {
        append(employeesIITname, element.name);
        append(employeesIITimage, loadImage("images/" + element.image));
    });
}

function randomizeArray(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}

function initSetupsForCharsGrid(randomize) {
    charsArr.length = 0;
    centersText = ["Center"];

    if (randomize) {
        randomizeArray(employeesIITFitted);
    }

    fillEmployeesArray();

    if (!gridSurf) {
        gridSurf = new GridCorners(new Point(horizontalBoder, verticalBorder), new Point(width - horizontalBoder, height - verticalBorder), colCount, rowCount);
    } else {
        gridSurf.reset(new Point(horizontalBoder, verticalBorder), new Point(width - horizontalBoder, height - verticalBorder), colCount, rowCount);
    }

    // for visually centering text in chars rect
    var posForCenterText = ~~((gridSurf.rowCount - 1) / 2) * gridSurf.colCount - 1 + ~~((gridSurf.colCount - centersText.length) / 2);


    gridSurf.traverse(function (x, y, index) {
        if (index > posForCenterText && centersText.length) {
            charsArr.push(new CharNode(x + (isRandShiftPos ? random(-10, 10) : 0), y + (isRandShiftPos ? random(-10, 10) : 0), centersText.shift(), logo, baseTextSize, fontForChar));
            charsArr[index].clr = '#d1460e';
            charsArr[index].lensRadius = isRandLensAmount ? random(300, 600) : lensParams.radius;
        } else {
            charsArr.push(new CharNode(x + (isRandShiftPos ? random(-10, 10) : 0), y + (isRandShiftPos ? random(-10, 10) : 0), employeesIITname.shift(), employeesIITimage.shift(), baseTextSize, fontForChar));
            charsArr[index].lensRadius = isRandLensAmount ? random(300, 600) : lensParams.radius;
        }
    });
}

function calcRowCol() {
    colCountOld = colCount;
    rowCountOld = rowCount;
    var ratio = windowWidth / windowHeight;

    if (ratio > 1.9) { //vier differenz
        if (employees < 5) {
            colCount = 5;
            rowCount = 1;
            fillArray(4);
        } else if (employees < 21) {
            colCount = 7;
            rowCount = 3;
            fillArray(20);
        } else if (employees < 45) {
            colCount = 9;
            rowCount = 5;
            fillArray(44);
        } else if (employees < 77) {
            colCount = 11;
            rowCount = 7;
            fillArray(76);
        } else {
            colCount = 13;
            rowCount = 9;
            fillArray(117);
        }
    } else if (ratio > 1.2) { //zwei differenz
        if (employees < 15) {
            colCount = 5;
            rowCount = 3;
            fillArray(14);
        } else if (employees < 45) {
            colCount = 7;
            rowCount = 5;
            fillArray(44);
        } else if (employees < 63) {
            colCount = 9;
            rowCount = 7;
            fillArray(62);
        } else {
            colCount = 11;
            rowCount = 9;
            fillArray(98);
        }
    } else if (ratio > 0.85) {
        if (employees < 9) {
            colCount = rowCount = 3;
            fillArray(8);
        } else if (employees < 25) {
            colCount = rowCount = 5;
            fillArray(24);
        }
        else if (employees < 49) {
            colCount = rowCount = 7;
            fillArray(48);
        } else {
            colCount = rowCount = 9;
            fillArray(80);
        }

    } else if (ratio > 0.56) {
        if (employees < 15) {
            colCount = 3;
            rowCount = 5;
            fillArray(14);
        } else if (employees < 45) {
            colCount = 5;
            rowCount = 7;
            fillArray(44);
        } else if (employees < 63) {
            colCount = 7;
            rowCount = 9;
            fillArray(62);
        } else {
            colCount = 9;
            rowCount = 11;
            fillArray(98);
        }
    } else {
        if (employees < 0.45) {
            colCount = 1;
            rowCount = 5;
            fillArray(4);
        } else if (employees < 21) {
            colCount = 3;
            rowCount = 7;
            fillArray(20);
        } else if (employees < 45) {
            colCount = 5;
            rowCount = 9;
            fillArray(44);
        } else if (employees < 77) {
            colCount = 7;
            rowCount = 11;
            fillArray(76);
        } else {
            colCount = 9;
            rowCount = 13;
            fillArray(117);
        }
    }
    if (ratio > 1) {
        baseTextSize = (windowHeight - 2 * verticalBorder) / (rowCount * 6.5);
    } else {
        baseTextSize = (windowWidth - 2 * horizontalBoder) / (colCount * 6.5);
    }
    if (rowCountOld != rowCount || colCountOld != colCount) {
        return true;
    }
    return false;
} //return true when colCount or rowCount has changed

function fillArray(lengthToBe) {
    employeesIITFitted = employeesIIT.slice(0, lengthToBe);
}



//p5js Methods
function preload() {
    "use strict";
    employeesJson = loadJSON("employees.json", JsonLoaded);
    logo = loadImage("images/IIT_logo.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    windowResized();
    lensParams.radius = 450;
    translate((windowWidth - width) / 2, (windowHeight - height) / 2);
    initSetupsForCharsGrid(true);
}

function draw() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    lensParams.magAmount = (lensParams.magAmount + lensParams.magAddition) / 2;

    charsArr.forEach(function (charNodeItem) { charNodeItem.calcNewPos().drawLine(); });
    charsArr.forEach(function (charNodeItem) { charNodeItem.drawChar(); });
}



//Action Handler
function mousePressed() {
    lensParams.magAddition = 2.5;
}

function mouseReleased() {
    lensParams.magAddition = 1;
}

function keyPressed() {
    switch (key.toLowerCase()) {
        case 'a':
            {
                initSetupsForCharsGrid(true);
                break;
            }
        case 'x': {
            isRandShiftPos = true;
            gridSurf.traverse(function (x, y, index) {
                charsArr[index].setPos(x + random(-10, 10), y + random(-10, 10));
            });
            break;
        }
        case 'z': {
            isRandLensAmount = true;
            gridSurf.traverse(function (x, y, index) {
                charsArr[index].lensRadius = random(300, 600);
            });
            break;
        }
        case 'c': {
            isRandLensAmount = false;
            isRandShiftPos = false;
            gridSurf.traverse(function (x, y, index) {
                charsArr[index].setPos(x, y);
                charsArr[index].lensRadius = lensParams.radius;
            });
            break;
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    verticalBorder = windowHeight / 5;
    horizontalBoder = windowWidth / 5;
    if (calcRowCol()) {
        initSetupsForCharsGrid(true);
    } else {
        initSetupsForCharsGrid(true);
    }
}
