img = "";
status = "";
objects = [];
song = "";


function setup(){ 
    canvas = createCanvas(400 , 420);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400,420)
    video.hide();
    objectDetector = ml5.objectDetector("cocossd" , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";


}

function preload(){
    
    song = loadSound("alert.mp3");

}

function draw(){
    image(video , 0 , 0 , 400 , 420); 

    if(status != "")
    { 
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video , gotResults);
        for (i =0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : OObject Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are :"+objects.length;

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x +15 , objects[i].y +15 );
            noFill();
            stroke(r,g,b);
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
            if(objects[i].label == "person")
            {
                song.stop();
                document.getElementById("status").innerHTML = "Status : Baby Found ";
            }
            else{
                song.play();
                document.getElementById("status").innerHTML = "Status : Baby Not Found ";

            }
            

        }

        if(objects.length == 0){
            song.stop();
            document.getElementById("status").innerHTML = "Status : Baby Found ";
        
        }

    }
    
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(video , gotResults);

}

function gotResults(error , results) {
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

