let angle = 0;
let symmetry = 8; 
let speedSlider, complexitySlider, colorPicker, shapePicker;
let shapes = [];
let fft; // For sound-reactive animation

// ✅ Declare audio only once
let audio;

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent("canvasContainer");

    colorPicker = select("#colorPicker");
    speedSlider = select("#speedSlider");
    complexitySlider = select("#complexitySlider");
    shapePicker = document.getElementById("shapePicker");

    audio = document.getElementById("ambientAudio"); // ✅ Only declared here

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
