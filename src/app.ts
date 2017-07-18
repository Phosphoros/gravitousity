import Vector2D from './vector';
import Attractor from './attractor';
import Particle from './particle';
import { clear } from './shapes';

import * as dat from 'dat.gui';

export enum AppState {
  Stopped = 'stopped',
  Running = 'running'
}

export class App {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private offsetX = 0;
  private offsetY = 0;
  private mouse_x = 0;
  private mouse_y = 0;
  private attractors: Attractor[] = [];
  private particles: Particle[] = [];
  private mouseState: boolean;
  private keyState: boolean[] = [];
  private state = AppState.Stopped;
  private settings = {
    color: '#FFFFFF',
    mass: 1,
    clearView: () => {
      this.particles = [];
      this.attractors = [];
    }
  };

  public init() {
    this.canvas = <HTMLCanvasElement>document.getElementById('canvas');

    this.offsetX += this.canvas.scrollLeft - this.canvas.offsetLeft;
    this.offsetY += this.canvas.scrollTop - this.canvas.offsetTop;

    this.canvas.addEventListener('mousemove', (e) => {
      this.mouse_x = e.x + this.offsetX;
      this.mouse_y = e.y + this.offsetY;
    }, true);

    this.canvas.addEventListener('mousedown', (e) => {
      if (e.button === 1) {
        // this.attractors.push(new Attractor(e.offsetX, e.offsetY, this.settings.color, 5));
        this.particles.push(new Particle(
          this.mouse_x,
          this.mouse_y,
          0,
          0,
          this.settings.mass,
          this.settings.color
        ));
      }
    }, true);

    this.canvas.addEventListener('mouseup', (e) => {
      if (e.button === 0) {
        this.mouseState = false;
      }
    }, true);

    this.canvas.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        this.mouseState = true;
      }
    }, true);

    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;

    document.onkeydown = (e) => {
      this.keyState[e.which] = true;
      if (e.which === 65) { // press a
        this.attractors.push(new Attractor(this.mouse_x, this.mouse_y, this.settings.color, 5));
      } else if (e.which === 32) {
        this.state = this.state === AppState.Stopped ? AppState.Running : AppState.Stopped;
      }
    };

    document.onkeyup = (e) => {
      this.keyState[e.which] = false;
    };

    const gui = new dat.GUI();
    gui.addColor(this.settings, 'color');
    gui.add(this.settings, 'clearView');
    gui.add(this.settings, 'mass');

    // for (let k = 0; k < 1000; k++) {
    //   const x = Math.random() * this.width;
    //   const y = Math.random() * this.height;
    //   this.particles.push(new Particle(x, y, 0, 0, Math.random() * .1));
    // }

    this._draw();
  }

  private _draw() {
    requestAnimationFrame(this._draw.bind(this));
    clear(this.ctx, this.width, this.height);

    if (this.mouseState === true) {
      this.particles.push(new Particle(
        this.mouse_x,
        this.mouse_y,
        Math.floor((Math.random() * 20) - 10) * 0.02,
        Math.floor((Math.random() * 20) - 10) * 0.02,
        1,
        this.settings.color
      ));
    }

    // erase everything on backspace
    if (this.keyState[46] === true || this.keyState[8] === true) {
      this.particles = [];
      this.attractors = [];
    }

    // add new particle on pressing p
    if (this.keyState[80] === true) {
      this.particles.push(new Particle(
        this.mouse_x,
        this.mouse_y,
        Math.floor((Math.random() * 20) - 10) * 0.02, // randomize initial velocity
        Math.floor((Math.random() * 20) - 10) * 0.02,
        1,
        this.settings.color
      ));
    }

    // draw all attractors
    for (let i = 0; i < this.attractors.length; i++) {
      this.attractors[i].draw(this.ctx);
    }

    // calculate new accelerations and positions, draw particles or remove them if they step out of the viewport
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].draw(this.ctx);

      if (this.state === AppState.Running) {
        this.particles[i].position = this.particles[i].position.add(this.particles[i].velocity);
      }
      // remove particle, if out of viewport
      if (
        this.particles[i].position.x < 0 ||
        this.particles[i].position.x > this.width ||
        this.particles[i].position.y < 0 ||
        this.particles[i].position.y > this.height
      ) {
        this.particles.splice(i, 1);
        continue;
      }

      for (let j = 0; j < this.particles.length; j++) {
        if (i === j) {
          continue;
        }

        if (this.state === AppState.Running) {
          if (!this.particles[i] || !this.particles[j]) {
            continue;
          }
          const r = this.particles[i].position.distanceFrom(this.particles[j].position);
          if (r < Math.sqrt(this.particles[i].m / Math.PI) || r < Math.sqrt(this.particles[j].m / Math.PI)) {
            let biggerIndex, smallerIndex;
            if (this.particles[j].m >= this.particles[i].m) {
              biggerIndex = j;
              smallerIndex = i;
            } else {
              biggerIndex = i;
              smallerIndex = j;
            }

            const pa = this.particles[biggerIndex];
            const pb = this.particles[smallerIndex];

            pa.velocity = pa.velocity.add(pb.velocity.multiply(pb.m / pa.m))
            pa.m += pb.m;

            this.particles.splice(smallerIndex, 1);
            continue;
          } else {
            const ga = this
              .particles[i]
              .position
              .vectorTo(this.particles[j].position)
              .unitVector()
              .multiply(this.particles[j].m / (r * r));
            this.particles[i].velocity = this.particles[i].velocity.add(ga);
          }
        }
      }
    }
    this.ctx.clearRect(0, 0, 80, 40);
    this.ctx.fillStyle = '#3C6';
    this.ctx.fillText('particles: ' + this.particles.length, 10, 20);
    this.ctx.fillText('attractors: ' + this.attractors.length, 10, 30);
    this.ctx.fillText('state: ' + this.state, 10, 40);
  }
}

const app = new App();

window.onload = () => {
  app.init();
}
