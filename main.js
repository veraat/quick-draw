var quick_draw_data_set = ["cactus" , "tea cup" , "Sweater" , "Headphones", "Phone", "hand", "pencil" , "snowman" , "ant" ];
i = 0;
var drawn_sketch;
var con;
var tt;
var score =0;

var timer_counter = 0;
var how_quick = 90;

function preload() {
    classifier = ml5.imageClassifier("DoodleNet")
}

function setup(){
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white"); 
    canvas.mouseReleased(classifyCanvas)
    
}


function draw() {
    // check_sketch();
    strokeWeight(13);
    stroke(0);
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY)
    }
}

function classifyCanvas() {
    classifier.classify(canvas, gotResults);
    // check_sketch();
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    
    console.log(results);
    drawn_sketch = results[0].label;
    document.getElementById("Sketch").innerHTML = "Result:  " + drawn_sketch;
    con = Math.round(results[0].confidence*100);
    document.getElementById("confidence").innerHTML= "Confidence:  " + Math.round(results[0].confidence*100)+ " %";
}

function clearCanvas() {
    background("white"); 
}



function time(){ 
if (timer_counter != 400) {
timer_counter++;
  document.getElementById("ti").innerHTML = "Timer: " + timer_counter;
console.log(timer_counter);
}
  
else {
   timer_counter = 0;
   updateCanvas();
   clearCanvas();
   check_sketch();
//    console.log(con);
}
}



function check_sketch(){
    if (drawn_sketch == sketch) {
        
        if (con >= 100){
            score = score + 1000;
            document.getElementById("scor").innerHTML = "Score " + score;
        }

        else if (con >= 75){
               score = score +  750
               document.getElementById("scor").innerHTML = "Score " + score;
            }

        else if (con >= 50){
               score = score +  500
               document.getElementById("scor").innerHTML = "Score " + score;
            }

        else if (con >= 25){
               score = score +  250
               document.getElementById("scor").innerHTML = "Score " + score;
            }

        else if (con <= 25){
                if (con <= 0){
                    score = score + 10
                    document.getElementById("scor").innerHTML = "Score " + score;
                }
                else{
                    score = score +  100
                    document.getElementById("scor").innerHTML = "Score " + score;

                }
        }
        
    }
    else {
        score = score + 0
        document.getElementById("scor").innerHTML = "Score: " + score;
    }
}


function updateCanvas() {
    // background("white");  
    object_number = Math.floor(Math.random()* quick_draw_data_set.length + 1);
    console.log(quick_draw_data_set[object_number]);
    sketch = quick_draw_data_set[object_number];
    document.getElementById("draw").innerHTML = "Sketch to be drawn: " + sketch;
    setInterval(time , how_quick)
}

updateCanvas();