const MovingObject = require("./moving_object");

class Hammo extends MovingObject {
  constructor(options = {}) {
    options.src = "./assets/hammo.png";
    super(options);
    this.isWrappable = false;
  }
}

// Hammo.SPEED = 15;

module.exports = Hammo;
