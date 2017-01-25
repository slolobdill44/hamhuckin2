const GameView = function (game, ctx) {
  this.ctx = ctx;
  this.game = game;
};

GameView.prototype.start = function() {
  const that = this;
  window.setInterval(function() {
    that.game.draw(that.ctx);
    that.game.moveObjects();
  }, 20);
};

module.exports = GameView;
