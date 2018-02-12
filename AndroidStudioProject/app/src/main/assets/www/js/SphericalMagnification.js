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

//lensParamenter
var lensParams = {
    radius: 450,
    magAmount: 2,
    magAddition: 0
};

//border Parameters
var horizontalBoder;
var verticalBorder;

//font
var fontForChar = 'Arial';
var baseTextSize = 20;

//helper
var charsArr = [];
var centersText = [];
var gridSurf;
var employees;
var logo;

//Json Arrays
var employeesIIT = [];
var employeesIITFitted = [];
var employeesIITname = [];
var employeesIITimage = [];

//row and Col Counter
var rowCount = 1;
var colCount = 1;
var rowCountOld;
var colCountOld;

var icons = ["augmented_virtual_mixed_reality.png","computer_graphics.png","computer_graphics2.png","design_and_technology.png","game_design_and_gamification.png","human_computer_interaction.png","information_visualization.png","interaction_design.png","requirements_engineering.png","user_centered_design.png","visual_analytics.png"];



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
    "use strict";
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
            charsArr.push(new CharNode(x, y, centersText.shift(), logo, baseTextSize, fontForChar));
            charsArr[index].clr = '#d1460e';
            charsArr[index].lensRadius = lensParams.radius;
        } else {
            charsArr.push(new CharNode(x,y, employeesIITname.shift(), employeesIITimage.shift(), baseTextSize, fontForChar));
            charsArr[index].lensRadius = lensParams.radius;
        }
    });
}

function calcRowCol() {
    "use strict";
    colCountOld = colCount;
    rowCountOld = rowCount;
    var ratio = windowWidth / windowHeight;

    if (ratio > 2.1) { //vier differenz
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
        } else if (employees < 35) {
            colCount = 7;
            rowCount = 5;
            fillArray(34);
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
        } else if (employees < 35) {
            colCount = 5;
            rowCount = 7;
            fillArray(34);
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
    if (ratio > 1) {
        baseTextSize = (windowHeight - 2 * verticalBorder) / (rowCount * 6.5);
    } else {
        baseTextSize = (windowWidth - 2 * horizontalBoder) / (colCount * 6.5);
    }
    if (rowCountOld !== rowCount || colCountOld !== colCount) {
        return true;
    }
    return false;
} //return true when colCount or rowCount has changed

function fillArray(lengthToBe) {
    employeesIITFitted = employeesIIT.slice(0, lengthToBe);
}


function mousePressed() {
    lensParams.magAddition = 1.5;
}

function mouseReleased() {
    lensParams.magAddition = 0;
}



//p5js Methods
function preload() {
    "use strict";
    employeesIIT = loadEmployees();
        employees = employeesIIT.length;
        for (var i = employeesIIT.length; i < 80; i++) {
            append(employeesIIT, { "name": "icon", "image": random(icons)});
        }
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

function loadEmployees() {
    return [
               {
                 "name": "Doris Agotai",
                 "image": "agotai_doris.jpg"
               },
               {
                 "name": "Jonas Oesch",
                 "image": "oesch_jonas.jpg"
               },
               {
                 "name": "Moritz Dietsche",
                 "image": "dietsche_moritz.jpg"
               },
               {
                 "name": "Ulrike Schock",
                 "image": "schock_ulrike.jpg"
               },
               {
                 "name": "Filip Schramka",
                 "image": "schramka_filip.jpg"
               },
               {
                 "name": "Fabian Schwander",
                 "image": "schwander_fabian.jpg"
               },
               {
                 "name": "Alireza Shojaifar",
                 "image": "shojaifar_alireza.jpg"
               },
               {
                 "name": "Melanie Stade",
                 "image": "stade_melanie.jpg"
               },
               {
                 "name": "Ronnie Schaniel",
                 "image": "schanniel_ronnie.jpg"
               },
               {
                 "name": "Kathrin Köbel",
                 "image": "koebel_kathrin.jpg"
               },
               {
                 "name": "Samuel Fricker",
                 "image": "fricker_samuel.jpg"
               },
               {
                 "name": "Simon Schubiger",
                 "image": "schubiger_simon.jpg"
               },
               {
                 "name": "Yuliyan Maksimov",
                 "image": "maksimov_yuliyan.jpg"
               },
               {
                 "name": "Katja Lapadula",
                 "image": "lapadula_katja.jpg"
               },
               {
                 "name": "Fiona Nüesch",
                 "image": "nuesch_fiona.jpg"
               },
               {
                 "name": "Matej Zmitko",
                 "image": "zmitko_matej.jpg"
               },
               {
                 "name": "Norbert Seyff",
                 "image": "seyff_norbert.jpg"
               },
               {
                 "name": "Fabian Affolter",
                 "image": "affolter_fabian.jpg"
               },
               {
                 "name": "Andrea Zirn",
                 "image": "zirn_andrea.jpg"
               },
               {
                 "name": "Dustin Wüest",
                 "image": "wueest_dustin.jpg"
               },
               {
                 "name": "Philipp Lüthi",
                 "image": "luethi_philipp.jpg"
               },
               {
                 "name": "Thibault Gagnaux",
                 "image": "gagnaux_thibault.jpg"
               },
               {
                 "name": "Flavio Müller",
                 "image": "mueller_flavio.jpg"
               }
             ];

}