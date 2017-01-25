/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	const GameView = __webpack_require__(4);
	
	
	const Hammo = __webpack_require__(2);
	const MovingObject = __webpack_require__(3);
	
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Hammo = __webpack_require__(2);
	
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(3);
	
	class Hammo extends MovingObject {
	  constructor(options = {}) {
	    options.src = "./assets/hammo.png";
	    super(options);
	    this.isWrappable = false;
	  }
	}
	
	// Hammo.SPEED = 15;
	
	module.exports = Hammo;


/***/ },
/* 3 */
/***/ function(module, exports) {

	class MovingObject {
	  constructor(options) {
	    this.pos = [75, 300];
	    this.vel = [7, 4];
	    this.src = options.src;
	    this.spinAngle = 1;
	    this.trajectoryAngle = 3;
	    this.gravity = .27;
	    this.startTime = (new Date()).getTime();
	  }
	
	  loadImage(ctx) {
	    const posX = this.pos[0];
	    const posY = this.pos[1];
	
	    const img = new Image();
	    img.src = this.src;
	    img.onload = function() {
	      ctx.drawImage(img, posX, posY);
	    };
	  }
	
	  collideWith(otherObject) {
	    // default do nothing
	  }
	
	  draw(ctx) {
	
	    const posX = this.pos[0];
	    const posY = this.pos[1];
	
	    // console.log(this.pos[0]);
	    const img = new Image();
	    img.src = this.src;
	
	    ctx.save();
	    ctx.translate(posX, posY);
	
	
	    ctx.rotate(this.spinAngle * Math.PI/180);
	    this.spinAngle += 5;
	    ctx.drawImage(img, -(img.width/2), -(img.width/2));
	    ctx.restore();
	  }
	
	  aimHammo() {
	
	  }
	
	  shootHammo(timeDelta) {
	    //timeDelta is number of milliseconds since last move
	    //if the computer is busy the time delta will be larger
	    //in this case the MovingObject should move farther in this frame
	    //velocity of object is how far it should move in 1/60th of a second
	    const posX = this.pos[0];
	    const posY = this.pos[1];
	
	
	    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
	    const offsetX = this.vel[0] * velocityScale;
	
	    const offsetY = this.vel[1] * velocityScale;
	
	    this.vel[0] -= this.gravity;
	
	
	    this.pos = [this.pos[0] + offsetY, this.pos[1] - offsetX];
	
	
	
	    //parabolic acceleration
	
	    // const time = ((new Date()).getTime() - this.startTime);
	    // const offsetY = this.vel[0] * Math.pow(time / 1000, 2);
	
	
	    // wrapping logic
	
	    // if (this.game.isOutOfBounds(this.pos)) {
	    //   if (this.isWrappable) {
	    //     this.pos = this.game.wrap(this.pos);
	    //   } else {
	    //     this.remove();
	    //   }
	    // }
	  }
	
	  remove() {
	    this.game.remove(this);
	  }
	}
	
	const NORMAL_FRAME_TIME_DELTA = 1000/60;
	
	module.exports = MovingObject;


/***/ },
/* 4 */
/***/ function(module, exports) {

	
	
	class GameView {
	  constructor(game, ctx) {
	    this.ctx = ctx;
	    this.game = game;
	  }
	
	  start() {
	    this.lastTime = 0;
	    //start the animation
	    requestAnimationFrame(this.animate.bind(this));
	  }
	
	  animate(time) {
	    // timeDelta averages 16.67
	    const timeDelta = time - this.lastTime;
	    this.game.step(timeDelta);
	    this.game.draw(this.ctx);
	
	    this.lastTime = time;
	
	    //every call to animate requests causes another call to animate
	    requestAnimationFrame(this.animate.bind(this));
	  }
	
	}
	
	module.exports = GameView;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map