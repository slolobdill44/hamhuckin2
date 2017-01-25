const Asteroid = require('./asteroid');
const Util = require('./utils');

const Game = function () {
  this.asteroids = [];
  this.bullets = [];
  this.ships = [];

  this.addAsteroids();
};

Game.BG_COLOR = "#006494";
Game.DIM_X = 500;
Game.DIM_Y = 500;
Game.FPS = 32;
Game.NUM_ASTEROIDS = 10;

Game.prototype.addAsteroids = function() {

  for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
    const pos = Util.randomPos(Game.DIM_X);
    const vel = Util.randomVec(75);
    const ops = { };
    ops.pos = [pos.x, pos.y];
    ops.vel = vel;
    const asteroid = new Asteroid(ops);
    // console.log(asteroid);
    this.asteroids.push(asteroid);
  }
  return this.asteroids;
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, 500, 500); //wipe it down
  this.asteroids.forEach(function(a) {
    a.draw(ctx);
  });
  // console.log(this.asteroids);
};

Game.prototype.moveObjects = function() {
  this.asteroids.forEach(function(a) {
    a.move();
    // console.log(a.pos);

  });
};

module.exports = Game;
