const regions = [{
    name: "Water Deep",
    height: 0.3,
    red: 37,
    green: 94,
    blue: 186
  },
  {
    name: "Water Shallow",
    height: 0.4,
    red: 54,
    green: 115,
    blue: 214
  },
  {
    name: "Sand",
    height: 0.45,
    red: 223,
    green: 224,
    blue: 123
  },
  {
    name: "Grass",
    height: 0.55,
    red: 83,
    green: 230,
    blue: 92
  },
  {
    name: "Grass 2",
    height: 0.6,
    red: 56,
    green: 161,
    blue: 63
  },
  {
    name: "Rock",
    height: 0.7,
    red: 122,
    green: 95,
    blue: 69
  },
  {
    name: "Rock 2",
    height: 0.9,
    red: 77,
    green: 59,
    blue: 41
  },
  {
    name: "Snow",
    height: 1.0,
    red: 247,
    green: 247,
    blue: 247
  }
];

class Noise {
  constructor(x, y, w, h, seed, noiseScale, octaves, persistance, lacunarity) {
    this.seed = seed;
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.noiseScale = noiseScale;
    this.octaves = octaves;
    this.persistance = persistance;
    this.lacunarity = lacunarity;
  }

  generate() {
    let noiseMap = [];
    randomSeed(this.seed);
    noiseSeed(this.seed);
    let octaveOffsets = [];

    for (let k = 0; k < this.octaves; k++) {
      const oX = random(-100000, 100000) + this.x;
      const oY = random(-100000, 100000) + this.y;
      octaveOffsets.push({
        x: oX,
        y: oY
      });
    }

    if (this.noiseScale <= 0)
      this.noiseScale = 0.0001;

    let maxNoiseHeight = -Infinity;
    let minNoiseHeight = Infinity;

    let halfWidth = floor(this.width / 2);
    let halfHeight = floor(this.height / 2);

    for (let i = 0; i < this.width; i++) {
      noiseMap.push([]);
      for (let j = 0; j < this.height; j++) {

        let amplitude = 1;
        let frequency = 1;
        let noiseHeight = 0;

        for (let k = 0; k < this.octaves; k++) {
          let sampleX = (i - halfWidth) / this.noiseScale * frequency + octaveOffsets[k].x;
          let sampleY = (j - halfHeight) / this.noiseScale * frequency + octaveOffsets[k].y;

          let perlinValue = noise(sampleX, sampleY) * 2 - 1;
          noiseHeight += perlinValue * amplitude;

          amplitude *= this.persistance;
          frequency *= this.lacunarity;
        }
        if (noiseHeight > maxNoiseHeight)
          maxNoiseHeight = noiseHeight;
        else if (noiseHeight < minNoiseHeight) {
          minNoiseHeight = noiseHeight;
        }
        noiseMap[i].push(noiseHeight);

      }
    }

    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        const current = noiseMap[i][j];
        const normalized = map(current, minNoiseHeight, maxNoiseHeight, 0, 1);
        noiseMap[i][j] = normalized;
      }
    }
    return noiseMap;
  }

  ///////////////////////////////////////////////////////
  static drawColored(noiseMap) {
    const w = noiseMap.length;
    const h = noiseMap[0].length;

    let tex = createGraphics(w, h);

    tex.loadPixels();
    for (let i = 0; i < w; i++) {
      for (let j = 0; j < h; j++) {

        let index = (i + j * w) * 4;
        const currentHeight = noiseMap[i][j];
        for (let region of regions) {
          if (currentHeight <= region.height) {
            tex.pixels[index++] = region.red;
            tex.pixels[index++] = region.green;
            tex.pixels[index++] = region.blue;
            break;
          }
        }

        tex.pixels[index] = 255;
      }
    }
    tex.updatePixels();
    scale(width / w, height / h);
    image(tex, 0, 0);
  }

  ///////////////////////////////////////////////////////
  static drawGrayscale(noiseMap) {
    const w = noiseMap.length;
    const h = noiseMap[0].length;

    let tex = createGraphics(w, h);

    tex.loadPixels();
    for (let i = 0; i < w; i++) {
      for (let j = 0; j < h; j++) {
        let index = (i + j * w) * 4;
        let c = 255 * noiseMap[i][j];
        tex.pixels[index++] = c;
        tex.pixels[index++] = c;
        tex.pixels[index++] = c;
        tex.pixels[index] = 255;
      }
    }
    tex.updatePixels();
    scale(width / w, height / h);
    image(tex, 0, 0);
  }
}