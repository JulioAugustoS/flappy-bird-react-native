import { StyleSheet } from 'react-native';
import Constants from '~/constants';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e1e1'
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGHT
  },
  gameContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  fullScreenButton: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left : 0,
    right: 0,
    backgroundColor: 'black',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  gameOverText: {
    color: 'white',
    fontSize: 48,
    fontFamily: '04b_19'
  },
  gameOverSubText: {
    color: 'white',
    fontSize: 24,
    fontFamily: '04b_19'
  },
  score: {
    position: 'absolute',
    color: 'white',
    fontSize: 72,
    top: 50,
    left: Constants.MAX_WIDTH / 2 - 30,
    textShadowColor: '#444444',
    textShadowOffset: {
      width: 2,
      height: 2
    },
    textShadowRadius: 2,
    fontFamily: '04b_19'
  }
});

export default Styles;
