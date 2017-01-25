const Hammo = require("./hammo");

class Game {
  constructor() {
    this.hammo = [];

    this.addHammo();
  }

  addHammo() {
    for (let i = 0; i < Game.NUM_HAMMO; i++) {
      this.hammo.push(new Hammo());
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = "#3D52D5";
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.hammo.forEach((object) => {
      object.draw(ctx);
    });
  }

  allObjects() {
    return [].concat(this.hammo);
  }


  moveObjects(delta) {
     this.allObjects().forEach((object) => {
       object.shootHammo(delta);
     });
   }

  step(delta) {
    this.moveObjects(delta);
  }
}


Game.DIM_X = 500;
Game.DIM_Y = 500;
Game.NUM_HAMMO = 1;


module.exports = Game;
