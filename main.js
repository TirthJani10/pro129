Sholay="";
Naacho_Naacho="";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
leftWristScore = 0;
song_sholay = "";

function preload(){
    Sholay = loadSound("Sholay.mp3");
    Naacho_Naacho = loadSound("Naacho.mp3");
}

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);
}


function draw(){
    image(video,0,0,600,530);

    song_sholay = Sholay.isPlaying()
    console.log(song_sholay);

    if(leftWristScore > 0.2) {
        fill("lime");
        stroke("black");
        circle(leftWristX,leftWristY,20);
        Naacho_Naacho.stop()
        if(song_sholay == false) {
            Sholay.play()
        }
        else {
            document.getElementById("song_id").innerHTML = "Song : Sholay";
        }
    }
}
function modelLoaded() {
    console.log("model loaded!");
}
function gotPoses(results) {
    if (results.length > 0) {
       console.log(results);

        leftWristScore = results[0].pose.keypoints[9].score;
        console.log("score left wrist = " + leftWristScore);

       leftWristX = results[0].pose.leftWrist.x;
       leftWristY = results [0].pose.leftWrist.y;
       console.log('left wrist x position = ' + leftWristX + ', left wrist y position = ' + leftWristY);
   
       rightWristX = results[0].pose.rightWrist.x;
       rightWristY = results [0].pose.rightWrist.y;
       console.log('right wrist x position = ' + rightWristX + ', right wrist y position = ' + rightWristY);
    }
   }