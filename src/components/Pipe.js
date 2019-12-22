import * as React from 'react';
import { View, Image } from 'react-native';

// Images
import Images from '~/assets/Images';

const Pipe = (props) => {
  const width = props.body.bounds.max.x - props.body.bounds.min.x;
  const height = props.body.bounds.max.y - props.body.bounds.min.y;
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;

  const pipeRatio = 160 / width;
  const pipeHeight = 33 * pipeRatio;
  const pipeIterations = Math.ceil(height / pipeHeight);

  return (
    <View
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: width,
        height: height,
        overflow: 'hidden',
        flexDirection: 'column'
      }}>
      {Array.apply(null, Array(pipeIterations)).map(( item, index) => {
        return (
          <Image
            style={{
              width: width,
              height: pipeHeight
            }}
            key={index}
            resizeMode="stretch"
            source={Images.pipeCore}
          />
        );
      })}
    </View>
  );
}

export default Pipe;
