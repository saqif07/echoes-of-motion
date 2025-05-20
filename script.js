let angle = 0;
let symmetry = 8; 
let speedSlider, complexitySlider, colorPicker, shapePicker;
let shapes = [];
let audio;
let fft; // For sound-reactive animation

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent("canvasContainer");

    colorPicker = select("#colorPicker");
    speedSlider = select("#speedSlider");
    complexitySlider = select("#complexitySlider");
    shapePicker = document.getElementById("shapePicker");

    audio = document.getElementById("ambientAudio");

    fft = new p5.FFT(); // Initialize frequency analysis

    select("#clearCanvas").mousePressed(() => {
        shapes = [];
        background(colorPicker.value());
    });

    document.addEventListener("click", () => {
        if (audio) {
            audio.play().catch(error => console.error("Playback error:", error));
        }
    });

    document.getElementById("volumeSlider").addEventListener("input", (event) => {
        if (audio) {
            audio.volume = event.target.value / 100;
        }
    });
}

function draw() {
    translate(width / 2, height / 2);
    rotate(angle);

    let spectrum = fft.analyze();
    let bassLevel = spectrum[10]; // Get low frequencies
    let animationSpeed = map(bassLevel, 0, 255, 0.01, 0.1);
    angle += animationSpeed; // Sync animation speed with music

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
