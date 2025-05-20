let angle = 0;
let symmetry = 8; 
let speedSlider, complexitySlider, colorPicker, shapePicker;
let shapes = [];
let audio;

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent("canvasContainer");

    colorPicker = select("#colorPicker");
    speedSlider = select("#speedSlider");
    complexitySlider = select("#complexitySlider");
    shapePicker = document.getElementById("shapePicker");

    audio = document.getElementById("ambientAudio");

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

    let animationSpeed = speedSlider.value() * 0.005;
    angle += animationSpeed;

    let complexity = complexitySlider.value();
    background(colorPicker.value());

    // Dynamic border color cycling effect
    let borderColors = [color(255, 100, 100), color(100, 255, 100), color(100, 100, 255)];  
    let currentColor = borderColors[int(frameCount / 20) % borderColors.length];

    stroke(currentColor); // Changes the border color dynamically
    noFill();

    for (let i = 0; i < complexity; i++) {
        push();
        rotate((PI * 2 / complexity) * i);
        ellipse(0, 0, 100, 100); // Simple animated shape for visualization
        pop();
    }
}
