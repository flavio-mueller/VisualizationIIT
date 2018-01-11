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
var baseTextSize = 20;
var border = 300;

var fontForChar = 'Arial';
var fontForSpecialChar = 'Arial Black';
var centersText = ['IIT'];
var textForRandomChars = ["FLAVIOMUELLER"];

var charsArr = [];
var gridSurf;

function setup() {
    createCanvas(windowWidth, windowHeight);
    translate((windowWidth - width) / 2, (windowHeight - height) / 2);
    initSetupsForCharsGrid(7, 7, centersText[0], textForRandomChars[0]);
}

function draw() {
    background(0);
    lensParams.magAmount = (lensParams.magAmount + lensParams.magAddition) / 2;

    charsArr.forEach(function (charNodeItem) { charNodeItem.calcNewPos().drawLine(); });
    charsArr.forEach(function (charNodeItem) { charNodeItem.drawChar(); });
}

function mousePressed() {
    lensParams.magAddition = 3;
}

function mouseReleased() {
    lensParams.magAddition = 1;
}

//function keyPressed() {
//    switch (key.toLowerCase()) {
//        case 'a': {
//            initSetupsForCharsGrid(random(5, 35), random(5, 35), centersText[~~random(centersText.length)], textForRandomChars[~~random(textForRandomChars.length)]);
//            break;
//        }
//        case 'x': {
//            isRandShiftPos = true;
//            gridSurf.traverse(function (x, y, index) {
//                charsArr[index].setPos(x + random(-5, 5), y + random(-5, 5));
//            });
//            break;
//        }
//        case 'z': {
//            isRandLensAmount = true;
//            gridSurf.traverse(function (x, y, index) {
//                charsArr[index].lensRadius = random(30, 120);
//            });
//            break;
//        }
//        case 'c': {
//            isRandLensAmount = false;
//            isRandShiftPos = false;
//            gridSurf.traverse(function (x, y, index) {
//                charsArr[index].setPos(x, y);
//                charsArr[index].lensRadius = lensParams.radius;
//            });
//            break;
//        }
//    }
//}

function initSetupsForCharsGrid(rowCount, colCount, centerText, strForRandomChars) {
    rowCount = ~~rowCount;
    colCount = ~~colCount;
    charsArr.length = 0;
    centerText = centersText;/*centerText.split('');*/

    // for properly colCount size for centering text in horizontal position
    if (colCount != centerText.length && (colCount - centerText.length) % 2 != 0) {
        ++colCount;
    }
    if (colCount < centerText.length) {
        colCount = centerText.length;
    }

    // for properly rowCount size for centering text in vertical position
    if (rowCount % 2 == 0) {
        ++rowCount;
    }

    if (!gridSurf) {
        gridSurf = new GridCorners(new Point(border, border), new Point(width - border, height - border), colCount, rowCount);
    } else {
        gridSurf.reset(new Point(border, border), new Point(width - border, height - border), colCount, rowCount);
    }

    // for visually centering text in chars rect
    var posForCenterText = ~~((gridSurf.rowCount - 1) / 2) * gridSurf.colCount - 1 + ~~((gridSurf.colCount - centerText.length) / 2);

    gridSurf.traverse(function (x, y, index) {
        if (index > posForCenterText && centerText.length) {
            charsArr.push(new CharNode(x + (isRandShiftPos ? random(-5, 5) : 0), y + (isRandShiftPos ? random(-5, 5) : 0), centerText.shift(), baseTextSize + 80, fontForSpecialChar));
            charsArr[index].clr = '#F00';
            charsArr[index].lensRadius = isRandLensAmount ? random(30, 120) : lensParams.radius;
        } else {
            charsArr.push(new CharNode(x + (isRandShiftPos ? random(-5, 5) : 0), y + (isRandShiftPos ? random(-5, 5) : 0), "Flavio Mueller", baseTextSize, fontForChar));
            charsArr[index].lensRadius = isRandLensAmount ? random(20, 80) : lensParams.radius;
        }
    });
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
