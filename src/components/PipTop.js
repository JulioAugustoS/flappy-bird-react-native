import * as React from 'react';
import { Image } from 'react-native';

// Images
import Images from '~/assets/Images';

const PipeTop = (props) => {
  const width = props.body.bounds.max.x - props.body.bounds.min.x;
  const height = props.body.bounds.max.y - props.body.bounds.min.y;
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;

  return (
    <Image
      style={{
        position: 'absolute',
        top: y,
        left: x,
        width: width,
        height: height
      }}
      resizeMode="stretch"
      source={Images.pipeTop}
    />
  );
}

export default PipeTop;
