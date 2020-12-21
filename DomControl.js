const defaultW = 200,
  defaultH = 200,
  defaultR = 45;
const defaultOct = 4,
  defaultPersistance = 0.5,
  defaultLac = 2.30;

class DomControl {
  constructor() {
    this.ui = createDiv();
    this.ui.position(width + 20, 0);
    this.colorCheckbox = createCheckbox("Colored", true);

    this.ui.child(this.colorCheckbox);
    this.ui.child(createP("Drag the screen to move around the noise"));

    this.seedSlider = this.addSlider("Seed", -10000, 10000, 0);
    this.wSlider = this.addSlider("Width", 1, width, defaultW);
    this.hSlider = this.addSlider("Height", 1, height, defaultH);
    this.rSlider = this.addSlider("Noise Scale", 5, 100, defaultR);
    this.octSlider = this.addSlider("Octaves", 1, 20, defaultOct);
    this.perSlider = this.addSlider("Persistance", 0.0, 1.0, defaultPersistance, 0.01);
    this.lacSlider = this.addSlider("Lacunarity", 1, 10, defaultLac, 0.01);

    this.json = createElement('pre', 'Loading...');
    this.ui.child(this.json);
  }

  addSlider(txt, min, max, def, inc = 1) {
    const sldr = createSlider(min, max, def, inc);
    this.labelWith(txt, sldr);
    return sldr;
  }

  labelWith(txt, sldr) {
    const temp_div = createDiv();
    const span = createSpan(" : " + txt);
    temp_div.child(sldr);
    temp_div.child(span);
    this.ui.child(temp_div);
  }

  setUpdate(cb) {
    this.seedSlider.input(cb);
    this.wSlider.input(cb);
    this.hSlider.input(cb);
    this.rSlider.input(cb);
    this.octSlider.input(cb);
    this.perSlider.input(cb);
    this.lacSlider.input(cb);
    this.colorCheckbox.changed(cb);
  }

  seed() {
    return this.seedSlider.value();
  }

  width() {
    return this.wSlider.value();
  }

  height() {
    return this.hSlider.value();
  }

  scale() {
    return this.rSlider.value();
  }

  octaves() {
    return this.octSlider.value();
  }

  persistance() {
    return this.perSlider.value();
  }

  lacunarity() {
    return this.lacSlider.value();
  }
}