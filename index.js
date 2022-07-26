var color = ["green", "red", "yellow", "blue"];
var finalarr = [];
var userarr = [];
var level = 0;
var started = false;

$(document).keyup(function() {
    if (!started) {
        $("#level-title").html("Level " + level);
        sequence();
        started = true;
    }
});



function sequence() {
    userarr = [];
    level++;
    $("#level-title").html("Level " + level);
    boolvalue = false;
    var tile = Math.floor(Math.random() * 4);
    var randomcolor = color[tile];
    finalarr.push(randomcolor);
    $("#" + randomcolor).fadeOut(100).fadeIn(100);
    playSound(randomcolor);
}


$(".btn").click(function() {
    var clickedcolor = $(this).attr("id");
    userarr.push(clickedcolor);
    animatePress(clickedcolor);
    playSound(clickedcolor);
    currentPattern(userarr.length - 1)
});


function playSound(name) {
    var voice = new Audio("sounds/" + name + ".mp3");
    voice.play();
}

function animatePress(currentcolor) {
    $("#" + currentcolor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentcolor).removeClass("pressed");
    }, 100);
}

function currentPattern(currentvalue) {
    if (finalarr[currentvalue] === userarr[currentvalue]) {
        console.log("Success");

        if (userarr.length === finalarr.length) {
            setTimeout(function() {
                sequence();
            }, 1000);
        }
    } else {
        $("#level-title").html("Game is over, press any key to restart");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver() {
    level = 0;
    finalarr = [];
    userarr = [];
    started = false;
}