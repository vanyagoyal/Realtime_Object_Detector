img = "";
status = "";
objects = [];

function preload(){
    //img = loadImage('dog_cat.jpg');
}

function setup(){
    //creating canvas
    canvas = createCanvas(380 , 380);
    canvas.center();

    webcam = createCapture(VIDEO);
    webcam.size(380 , 380);
    webcam.hide();

    object_detector = ml5.objectDetector('cocossd' , modelloaded);
    document.getElementById("status").innerHTML = "Status :- Detecting Objects";
}

function draw(){
    image(webcam , 0 , 0 , 380 , 380);

    if (status != " "){
        r = random(255);
        g = random(255);
        b = random(255);
        object_detector.detect(webcam , gotResult);
        for (i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number").innerHTML = "Number Of Objects Detected : " + objects.length;
            fill(r , g , b);
            percentage = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percentage + "%" , objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke(r , g , b);
            strokeWeight(2);
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }
    }
}

function modelloaded(){
    console.log("coco ssd model loaded!!");
    status = true;
}

function gotResult(error , result){
    if(error){
        console.log(error);
    }
        console.log(result);
        objects = result;
}