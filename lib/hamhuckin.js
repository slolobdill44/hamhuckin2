const Game = require("./game");
const GameView = require("./game_view");


const Hammo = require("./hammo");
const MovingObject = require("./moving_object");

document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById('game-canvas');
  const ctx = canvas.getContext("2d");
  // ctx.fillStyle = "#3D52D5";
  // ctx.fillRect(0, 0, canvas.width, canvas.height);


  const game = new Game();
  new GameView(game, ctx).start();

  // const hammo = new Hammo();
  // hammo.draw(ctx);
  // console.log(hammo);
  // hammo.rotate(ctx);

});
