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

var isRandShiftPos = false;
var isRandLensAmount = false;
var lensParams = {
    radius: 450,
    magAmount: 2,
    magAddition: 1
};
var baseTextSize;
var baseTextSizeMultiplier = 0.011;
var horizontalBoder;
var verticalBorder;

var fontForChar = 'Arial';
var fontForSpecialChar = 'Arial Black';
var centersText = ['IIT'];
var textForRandomChars = ["FLAVIOMUELLER"];

var charsArr = [];
var gridSurf;

var img;
var img2;
var logo;
var employeesJson;
var employeesIIT = [];
var employeesIITFitted = [];
var employeesIITname = [];
var employeesIITimage = [];

var rowCount = 1;
var colCount = 1;
var employees;
var rowCountOld;
var colCountOld;



function preload() {
    employeesJson = loadJSON("employees.json", JsonLoaded);
    logo = loadImage("images/IIT_logo.png");
    img2 = loadImage("images/FlavioMueller.jpg");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    baseTextSize = windowWidth * baseTextSizeMultiplier;
    verticalBorder = windowHeight / 5;
    horizontalBoder = windowWidth / 5;
    lensParams.radius = windowWidth / 4.26;
    translate((windowWidth - width) / 2, (windowHeight - height) / 2);
    initSetupsForCharsGrid(true);
}


function JsonLoaded(data) {
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

function draw() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    lensParams.magAmount = (lensParams.magAmount + lensParams.magAddition) / 2;

    charsArr.forEach(function (charNodeItem) { charNodeItem.calcNewPos().drawLine(); });
    charsArr.forEach(function (charNodeItem) { charNodeItem.drawChar(); });
}

function mousePressed() {
    lensParams.magAddition = 2;
}

function mouseReleased() {
    lensParams.magAddition = 1;
}

function keyPressed() {
    switch (key.toLowerCase()) {
        case 'a':
            {
                randomizeArray(employeesIITFitted);
                fillEmployeesArray();
                initSetupsForCharsGrid(true);
                break;
            }
        case 'x': {
            isRandShiftPos = true;
            gridSurf.traverse(function (x, y, index) {
                charsArr[index].setPos(x + random(-20, 20), y + random(-20, 20));
            });
            break;
        }
        case 'z': {
            isRandLensAmount = true;
            gridSurf.traverse(function (x, y, index) {
                charsArr[index].lensRadius = random(300, 700);
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


function initSetupsForCharsGrid() {
    charsArr.length = 0;
    centersText = ["Center"];

    if (calcRowCol()) {
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
            charsArr.push(new CharNode(x + (isRandShiftPos ? random(-20, 20) : 0), y + (isRandShiftPos ? random(-20, 20) : 0), centersText.shift(), loadImage("images/IIT_logo.png"), baseTextSize + baseTextSize * 4, fontForSpecialChar));
            charsArr[index].clr = '#d1460e';
            charsArr[index].lensRadius = isRandLensAmount ? random(300, 700) : lensParams.radius;
        } else {
            charsArr.push(new CharNode(x + (isRandShiftPos ? random(-20, 20) : 0), y + (isRandShiftPos ? random(-20, 20) : 0), employeesIITname.shift(), employeesIITimage.shift(), baseTextSize, fontForChar));
            charsArr[index].lensRadius = isRandLensAmount ? random(300, 700) : lensParams.radius;
        }
    });
}


function windowResized() {
    createCanvas(windowWidth, windowHeight);
    lensParams.radius = windowWidth / 4.26;
    verticalBorder = windowHeight / 5;
    horizontalBoder = windowWidth / 5;
    initSetupsForCharsGrid(true);
}


function calcRowCol() {
    colCountOld = colCount;
    rowCountOld = rowCount;
    var ratio = windowWidth / windowHeight;

    if (ratio > 1.7) { //vier differenz
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
        if (employees < 5) {
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

    if (rowCountOld != rowCount || colCountOld != colCount) {
        return true;
    }
    return false;
} //return true when colCount or rowCount has changed



function fillArray(lengthToBe) {
    employeesIITFitted = employeesIIT.slice(0, lengthToBe);
}


// Point Class
function Point(x, y) {
    this.x = x;
    this.y = y;
}
Point.prototype.reset = function (x, y) {
    this.constructor(x, y);
};

function randomChar(str) {
    var chars = str || "ABCDEFGHIJKLMNOPQRSTUVWXTZ";
    var rnum = Math.floor(Math.random() * chars.length);
    return chars.substring(rnum, rnum + 1);
}