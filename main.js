img = ""
status = ""
objects = [];
song=""
function setup() {
    canvas = createCanvas(380, 380)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    video.size(380,380)
    objectDetector = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "Status= Detecting Objects"
}

function preload() {
   song=loadSound("Alarm.mp3")

}


function draw() {
    image(video, 0, 0, 380, 380)
    if (status != "") {
        r=random(255)
        g=random(255)
        b= random(255)
        objectDetector.detect(video, gotResult)
        for (i = 0; i < objects.length; i++) {
            fill(r,g,b)
            document.getElementById("status").innerHTML = "Status= Object Detected"
           
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15)
            noFill()
            stroke(r,g,b)
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
            if(objects[i].label== person){
                document.getElementById("baby_found_or_not").innerHTML = "Baby found"
                song.stop()
            }else {
                document.getElementById("baby_found_or_not").innerHTML = "Baby  not found"
                song.play()
            }
        }
        
    }
}

function modelLoaded() {
    console.log("Model is loaded")
    status = true

}

function gotResult(error, result) {
    if (error) {
        console.log(error)
    }
    console.log(result)
    objects = result
}