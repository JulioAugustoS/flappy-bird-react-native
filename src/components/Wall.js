import * as React from 'react';
import { View } from 'react-native';

const Wall = (props) => {
  const width = props.size[0];
  const height = props.size[1];
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;

  return (
    <View
      style={{
        position: 'absolute',
        top: y,
        left: x,
        width: width,
        height: height,
        backgroundColor: props.color
      }}
    />
  );
}

export default Wall;
