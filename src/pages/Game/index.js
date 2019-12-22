import * as React from 'react';
import { View, StatusBar, TouchableOpacity, Text } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';

// Components
import { Bird, Physics, Wall } from '~/components';

// Config
import Constants from '~/constants';
import Styles from '~/constants/styles';

// Functions
import { generatePipes, randomBetween } from '~/functions';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.gameEngine = null;
    this.entities = this.setupWorld();

    this.state = {
      running: true
    }
  }

  setupWorld = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;

    let bird = Matter.Bodies.rectangle(Constants.MAX_WIDTH / 4, Constants.MAX_HEIGHT / 2, 50, 50);
    let floor = Matter.Bodies.rectangle(Constants.MAX_WIDTH / 2, Constants.MAX_HEIGHT - 25, Constants.MAX_WIDTH, 50, { isStatic: true });
    let ceiling = Matter.Bodies.rectangle(Constants.MAX_WIDTH / 2, 25, Constants.MAX_WIDTH, 50, { isStatic: true });

    let [pipe1Height, pipe2Height] = generatePipes();
    let pipe1 = Matter.Bodies.rectangle(Constants.MAX_WIDTH - (Constants.PIPE_WIDTH / 2), pipe1Height / 2, Constants.PIPE_WIDTH, pipe1Height, { isStatic: true });
    let pipe2 = Matter.Bodies.rectangle(Constants.MAX_WIDTH - (Constants.PIPE_WIDTH / 2), Constants.MAX_HEIGHT - (pipe2Height / 2), Constants.PIPE_WIDTH, pipe2Height, { isStatic: true });

    let [pipe3Height, pipe4Height] = generatePipes();

    let pipe3 = Matter.Bodies.rectangle(Constants.MAX_WIDTH * 2 - (Constants.PIPE_WIDTH / 2), pipe3Height / 2, Constants.PIPE_WIDTH, pipe3Height, { isStatic: true });
    let pipe4 = Matter.Bodies.rectangle(Constants.MAX_WIDTH * 2 - (Constants.PIPE_WIDTH / 2), Constants.MAX_HEIGHT - (pipe4Height / 2), Constants.PIPE_WIDTH, pipe4Height, { isStatic: true });

    Matter.World.add(world, [bird, floor, ceiling, pipe1, pipe2, pipe3, pipe4]);

    Matter.Events.on(engine, "collisionStart", (event) => {
      let pairs = event.pairs;

      this.gameEngine.dispatch({ type: "game-over" });
    })

    return {
      physics: { engine: engine, world: world },
      bird: { body: bird, size: [50, 50], color: 'red', renderer: Bird },
      floor: { body: floor, size: [Constants.MAX_WIDTH, 50], color: 'green', renderer: Wall },
      ceiling: { body: ceiling, size: [Constants.MAX_WIDTH, 50], color: 'green', renderer: Wall },
      pipe1: { body: pipe1, size: [Constants.PIPE_WIDTH, pipe1Height], color: 'green', renderer: Wall },
      pipe2: { body: pipe2, size: [Constants.PIPE_WIDTH, pipe2Height], color: 'green', renderer: Wall },
      pipe3: { body: pipe3, size: [Constants.PIPE_WIDTH, pipe3Height], color: 'green', renderer: Wall },
      pipe4: { body: pipe4, size: [Constants.PIPE_WIDTH, pipe4Height], color: 'green', renderer: Wall },
    };
  }

  onEvent = (e) => {
    if (e.type === "game-over") {
      this.setState({
        running: false
      })
    }
  }

  reset = () => {
    this.gameEngine.swap(this.setupWorld());
    this.setState({
      running: true
    })
  }

  render() {
    return (
      <View style={Styles.container}>
        <GameEngine
          ref={(ref) => { this.gameEngine = ref; }}
          style={Styles.gameContainer}
          systems={[Physics]}
          running={this.state.running}
          onEvent={this.onEvent}
          entities={this.entities}
        >
          <StatusBar hidden={true} />
        </GameEngine>
        {!this.state.running && (
          <TouchableOpacity onPress={this.reset} style={Styles.fullScreenButton}>
            <View style={Styles.fullScreen}>
              <Text style={Styles.gameOverText}>
                Game Over
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

export default Game;
