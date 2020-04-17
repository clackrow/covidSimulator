class Person {

  constructor() {
    this.pos = createVector(random(width), random(0, 400));
    this.maxVel = 1;
    this.vel = createVector(random(-this.maxVel, this.maxVel), random(-this.maxVel, this.maxVel));

    this.infected = false;
    this.alive = true;
    this.imune = false;
    this.isolated = false;

    this.infectionTime = 0;

    if (random(0, 100) < elderPercentage) {
      this.elder = true;
    } else {
      this.elder = false;
    }
  }

  show() {
    if (this.alive) {
      strokeWeight(1);
      if (this.elder) {
        stroke(0);
        fill(255);
      }
      if (this.infected) {
        if (this.elder) {
          stroke(255);
        } else {
          stroke(0);
        }
        fill(255, 0, 0);
      }
      if (this.imune) {
        if (this.elder) {
          stroke(255);
        } else {
          stroke(0);
        }
        fill(0, 255, 0);
      }
      if (!this.infected && !this.elder && !this.imune) {
        stroke(0);
        fill(0, 200, 200);
      }

      ellipse(this.pos.x, this.pos.y, 10);
    }
  }

  move() {
    if (this.alive) {
      this.pos.add(this.vel);
      if (this.pos.x > width || this.pos.x < 0) {
        this.vel.x *= -1;
      }
      if (this.pos.y > 400 || this.pos.y < 0) {
        this.vel.y *= -1;
      }
    }
  }

  infect(other) {
    let d = other.pos.dist(this.pos);
    if (d < infectionRadius && this.infected && this.alive && !other.imune && other.alive && !this.isolated) {
      if (random(0, 5) <= 1) {
        other.infected = true;
      }
    }
  }

  endInfection() {
    if(!this.alive){
      this.infected = false;
      this.imune = false;
    }
    if(this.imune){
      this.infected = false;
      this.alive = true;
    }
    if (this.infected && this.alive) {
      this.infectionTime++;
      if (this.infectionTime > 500) {
        this.closure();
        this.infectionTime = 0;
      }
    }
  }

  closure() {
    if (this.elder) {
      if (random(0, 100) < mortalityElder) {
        this.alive = false;
      } else {
        this.imune = true;
      }
    }
    if (!this.elder) {
      if (random(0, 100) < mortalityYoung) {
        this.alive = false;
      } else {
        this.imune = true;
      }
    }
  }

  distancing(other) {
    if (other.alive && this.alive && this.pos.y > 30 && !other.isolated) {
      let d = other.pos.dist(this.pos);
      if (d < SD) {
        this.desire = createVector();
        this.desire = p5.Vector.sub(this.pos, other.pos);
        this.actual = this.vel.copy();
        this.force = p5.Vector.sub(this.desire, this.actual);
        this.force.normalize();
        this.force.mult(0.2);
        this.vel.add(this.force);
        this.vel.normalize();
      }
    }
  }

  elderIsolation() {
    if (this.elder && !this.infected) {
      let chance = random(0, 100);
      if(chance < elderRate){
        this.isolated = true;
      }
    }
  }

  testMe(){
    if(days%2 == 0 && this.infected && days > 1){
      let chance = random(0, 100);
      if(chance < testRate){
        this.isolated = true;
      }
    }
  }

  isolateMe(){
    if(this.isolated &&  !this.infected && !this.cured){
      // if(this.pos.x <= 85 && this.pos.x <= 92){
      //   this.pos.x += 5;
      // } else {
      //   this.pos.x -= 5;
      // }
      if(this.pos.y <= 520){
        this.pos.y += 5;
      } else {
        this.pos.y -= 5;
      }
    }

    if(this.isolated && !this.cured){
      // if(this.pos.x <= 315){
      //   this.pos.x += 5;
      // } else {
      //   this.pos.x -= 5;
      // }
      if(this.pos.y <= 520){
        this.pos.y += 5;
      } else {
        this.pos.y -= 5;
      }
    }
  }

}
