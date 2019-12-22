import * as React from 'react';
import { View, StatusBar, TouchableOpacity, Text, Image } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';

// Images
import Images from '~/assets/Images';

// Components
import { Bird, Physics, Floor } from '~/components';

// Config
import Constants from '~/constants';
import Styles from '~/constants/styles';

// Functions
import { resetPipes } from '~/functions';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.gameEngine = null;
    this.entities = this.setupWorld();

    this.state = {
      running: true,
      score: 0
    }
  }

  setupWorld = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;

    world.gravity.y = 0.0;

    let bird = Matter.Bodies.rectangle(Constants.MAX_WIDTH / 2, Constants.MAX_HEIGHT / 2, Constants.BIRD_WIDTH, Constants.BIRD_HEIGHT);

    let floor1 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT - 25,
      Constants.MAX_WIDTH + 4,
      50,
      { isStatic: true }
    );

    let floor2 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH + (Constants.MAX_WIDTH / 2),
      Constants.MAX_HEIGHT - 25,
      Constants.MAX_WIDTH + 4,
      50,
      { isStatic: true }
    );

    Matter.World.add(world, [bird, floor1, floor2]);
    Matter.Events.on(engine, 'collisionStart', (event) => {
      let pairs = event.pairs;

      this.gameEngine.dispatch({ type: "game-over"});
    });

    return {
      physics: { engine: engine, world: world },
      floor1: { body: floor1, renderer: Floor },
      floor2: { body: floor2, renderer: Floor },
      bird: { body: bird, pose: 1, renderer: Bird}
    };
  }

  onEvent = (e) => {
    if (e.type === "game-over") {
      this.setState({
        running: false
      })
    } else if (e.type === "score") {
      this.setState({
        score: this.state.score + 1
      });
    }
  }

  reset = () => {
    resetPipes();
    this.gameEngine.swap(this.setupWorld());
    this.setState({
      running: true,
      score: 0
    })
  }

  render() {
    return (
      <View style={Styles.container}>
        <Image
          source={Images.background}
          style={Styles.backgroundImage}
          resizeMode="stretch"
        />
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
        <Text style={Styles.score}>{this.state.score}</Text>
        {!this.state.running && (
          <TouchableOpacity onPress={this.reset} style={Styles.fullScreenButton}>
            <View style={Styles.fullScreen}>
              <Text style={Styles.gameOverText}>Se Fudeu</Text>
              <Text style={Styles.gameOverSubText}>Tente novamente!</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

export default Game;
