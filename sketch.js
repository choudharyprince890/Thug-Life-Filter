let capture;
let posenet = null
let specs,cigar,chian;

let pose, skeleton

function setup(){
    createCanvas(800, 500);
    capture = createCapture(VIDEO)
    capture.hide();

    posenet = ml5.poseNet(capture, modelLoaded)
    posenet.on('pose', receivedPoses)

    specs = loadImage('images/spects.png')
    cigar = loadImage('images/cigar.png')
    chain = loadImage('images/chain.png')
}

function receivedPoses(poses){
    console.log(poses);

    if (poses.length > 0){
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;

    }
}

function modelLoaded(){
    console.log('Model has Loaded.................................')
}

function draw(){
    image(capture,0,0)
    fill(255,0,0) 
    if(pose){
        for(let i=0;i<pose.keypoints.length; i++){
            ellipse(pose.keypoints[i].position.x, pose.keypoints[i].position.y,10)
        }
        stroke(255,0,0)
        strokeWeight(5)
        for(let j =0;j<skeleton.length;j++){
            line(skeleton[j][0].position.x, skeleton[j][0].position.y, skeleton[j][1].position.x, skeleton[j][1].position.y)
        }

        image(specs,pose.nose.x-50,pose.nose.y-70,100,100)
        image(chain,pose.nose.x-50,pose.nose.y+80,100,100)
        image(cigar,pose.nose.x-95,pose.nose.y+35,100,100)
    }
}