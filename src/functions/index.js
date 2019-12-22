import Matter from 'matter-js';

import Constants from '~/constants';
import { Pipe, PipeTop } from '~/components';

export const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const generatePipes = () => {
  let topPipeHeight = randomBetween(100, (Constants.MAX_HEIGHT / 2) - 100);
  let bottomPipeHeight = Constants.MAX_HEIGHT - topPipeHeight - Constants.GAP_SIZE;

  let sizes = [topPipeHeight, bottomPipeHeight]

  if (Math.random() < 0.5) {
    sizes = sizes.reverse();
  }

  return sizes;
}

export const addPipesAtLocation = (x, world, entities, pipes) => {
  let [pipe1Height, pipe2Height] = generatePipes();

  let pipeTopWidth = Constants.PIPE_WIDTH + 20;
  let pipeTopHeight = (pipeTopWidth / 205) * 95;

  pipe1Height = pipe1Height - pipeTopHeight;

  let pipe1Top = Matter.Bodies.rectangle(
    x,
    pipe1Height + (pipeTopHeight / 2),
    pipeTopWidth,
    pipeTopHeight,
    { isStatic: true}
  );

  let pipe1 = Matter.Bodies.rectangle(
    x,
    pipe1Height / 2,
    Constants.PIPE_WIDTH,
    pipe1Height,
    { isStatic: true}
  );

  pipe2Height = pipe2Height - pipeTopHeight;

  let pipe2Top = Matter.Bodies.rectangle(
    x,
    Constants.MAX_HEIGHT - 50 - pipe2Height - (pipeTopHeight / 2),
    pipeTopWidth,
    pipeTopHeight,
    { isStatic: true}
  );

  let pipe2 = Matter.Bodies.rectangle(
    x,
    Constants.MAX_HEIGHT - 50 - (pipe2Height / 2),
    Constants.PIPE_WIDTH,
    pipe2Height,
    { isStatic: true}
  );

  Matter.World.add(world, [pipe1, pipe1Top, pipe2, pipe2Top]);

  entities["pipe" + (pipes + 1)] = {
    body: pipe1, renderer: Pipe, scored: false
  }

  entities["pipe" + (pipes + 2)] = {
    body: pipe2, renderer: Pipe, scored: false
  }

  entities["pipe" + (pipes + 1) + "Top"] = {
    body: pipe1Top, renderer: PipeTop, scored: false
  }

  entities["pipe" + (pipes + 2) + "Top"] = {
    body: pipe2Top, renderer: PipeTop, scored: false
  }

  pipes += 2;
}

export const resetPipes = () => {
  pipes = 0;
}
