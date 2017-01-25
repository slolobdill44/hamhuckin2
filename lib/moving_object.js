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
