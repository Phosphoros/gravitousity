import Vector2D from './vector';
import Attractor from './attractor';
import Particle from './particle';
import { clear } from './shapes';

import * as dat from 'dat.gui';

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
  private settings = {
    color: '#FFFFFF',
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
        this.attractors.push(new Attractor(e.offsetX, e.offsetY, this.settings.color, 5));
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
      }
    };

    document.onkeyup = (e) => {
      this.keyState[e.which] = false;
    };

    const gui = new dat.GUI();
    gui.addColor(this.settings, 'color');
    gui.add(this.settings, 'clearView');

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
        this.settings.color
      ));
    }

    // draw all attractors
    for (let i = 0; i < this.attractors.length; i++) {
      this.attractors[i].draw(this.ctx);
    }

    // calculate new accelerations and positions, draw particles or remove them if they step out of the viewport
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = 0; j < this.attractors.length; j++) {
        // remove particle, if out of viewport
        if (
          this.particles[i].position.x < 0 ||
          this.particles[i].position.x > this.width ||
          this.particles[i].position.y < 0 ||
          this.particles[i].position.y > this.height
        ) {
          this.particles.splice(i, 1);
        }

        const r = this.particles[i].position.distanceFrom(this.attractors[j].position);
        const ga = this
          .particles[i]
          .position
          .vectorTo(this.attractors[j].position)
          .unitVector()
          .multiply(this.attractors[j].m / (r * r));
        this.particles[i].acceleration = this.particles[i].acceleration.add(ga);
      }
      this.particles[i].position = this.particles[i].position.add(this.particles[i].acceleration);
      this.particles[i].draw(this.ctx);

    }
    this.ctx.clearRect(0, 0, 80, 40);
    this.ctx.fillStyle = '#3C6';
    this.ctx.fillText('particles: ' + this.particles.length, 10, 20);
    this.ctx.fillText('attractors: ' + this.attractors.length, 10, 30);
  }
}

const app = new App();

window.onload = () => {
  app.init();
}
