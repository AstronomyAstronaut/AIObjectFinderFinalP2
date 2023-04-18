status = "";
objects = [];

function setup(){
    canvas = createCanvas(340, 340);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(340, 340);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("object_name").value;
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}

function gotResults(error, results){
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(video, 0, 0, 340, 340);

    if(status != "")
    {   r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResults);
        for(i = 0; i < objects.length; i++)
        {
        document.getElementById("status").innerHTML = "Status : Object Detected";

        fill(r, g, b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
        noFill();
        stroke(r, g, b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        if(objects[i].label == object_name)
        {
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("object_status").innerHTML = object_name + "Found";
            
        }
        else
        {
            document.getElementById("object_status").innerHTML = object_name + "Not Found";
           
        }
        
    }
    }
}