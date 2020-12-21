let myNoise, domControl;
let camX = 0,
  camY = 0;

function setup() {
  createCanvas(600, 600);

  domControl = new DomControl();
  domControl.setUpdate(updateNoise);

  noSmooth();
  pixelDensity(1);

  updateNoise();
}

function mouseDragged() {
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    camX -= movedX / 100;
    camY -= movedY / 100;
    updateNoise();
  }
}

function updateNoise() {
  myNoise = new Noise(camX, camY, domControl.width(), domControl.height(), domControl.seed(), domControl.scale(), domControl.octaves(), domControl.persistance(), domControl.lacunarity());

  const noiseMap = myNoise.generate();

  if (domControl.colorCheckbox.checked()) {
    Noise.drawColored(noiseMap);
  } else {
    Noise.drawGrayscale(noiseMap);
  }

  domControl.json.html(JSON.stringify(myNoise, null, 4));
}

function draw() {

}