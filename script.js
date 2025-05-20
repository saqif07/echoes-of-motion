
let angle = 0;
let symmetry = 8; 
let speedSlider, complexitySlider, colorPicker;
let shapes = [];
let audio = document.getElementById("ambientAudio");
let shapePicker = document.getElementById("shapePicker");

function drawPattern() {
    let size = map(sin(frameCount * 0.02), -1, 1, 50, 200);
    
    switch (shapePicker.value) {
        case "circle":
            ellipse(0, size, size, size);
            break;
        case "square":
            rect(-size / 2, size, size, size);
            break;
        case "triangle":
            triangle(-size / 2, size, size / 2, size, 0, -size);
            break;
    }
}


document.addEventListener("click", () => {
    if (audio) {
        audio.play().catch(error => console.error("Playback error:", error));
    } else {
        console.error("Ambient audio file not found!");
    }
});
document.getElementById("playAudio").addEventListener("click", () => {
    if (audio) {
        audio.play();
    }
});


function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent("canvasContainer");

    colorPicker = select("#colorPicker");
    speedSlider = select("#speedSlider");
    complexitySlider = select("#complexitySlider");

    // Clear canvas button functionality
    select("#clearCanvas").mousePressed(() => {
        shapes = []; // Reset drawn elements
        background(colorPicker.value());
    });
}

function draw() {
    translate(width / 2, height / 2);
    rotate(angle);

    let animationSpeed = speedSlider.value() * 0.01;
angle += animationSpeed;

    let complexity = complexitySlider.value();
    background(colorPicker.value());

    stroke(255);
    noFill();

    for (let i = 0; i < complexity; i++) {
        push();
        rotate((PI * 2 / complexity) * i);
        drawPattern();
        pop();
    }

    for (let s of shapes) {
        s.display();
    }
}

function mouseDragged() {
    let shapeSize = map(abs(mouseX - pmouseX), 0, width, 10, 50);
    shapes.push(new MovingShape(mouseX - width / 2, mouseY - height / 2, shapeSize));
}

class MovingShape {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }

    display() {
        fill(255, 150);
        ellipse(this.x, this.y, this.size);
    }
}

function drawPattern() {
    let size = map(sin(frameCount * 0.02), -1, 1, 50, 200);
    ellipse(0, size, size, size);
}// Audio integration
let audio = document.getElementById("ambientAudio");


};

// Adjust volume with slider
document.getElementById("volumeSlider").addEventListener("input", (event) => {
    audio.volume = event.target.value / 100;


});

});
