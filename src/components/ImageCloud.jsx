/* eslint-disable */
import { Cloudinary, Transformation } from '@cloudinary/url-gen';
import {
  AdvancedImage,
  placeholder,
  accessibility,
  responsive,
} from '@cloudinary/react';

//  actions
import { thumbnail, scale } from '@cloudinary/url-gen/actions/resize';
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';
import { source } from '@cloudinary/url-gen/actions/overlay';
import { image } from '@cloudinary/url-gen/qualifiers/source';
import {
  brightness,
  brightnessHSB,
  opacity,
} from '@cloudinary/url-gen/actions/adjust';
import { Position } from '@cloudinary/url-gen/qualifiers';
import { compass } from '@cloudinary/url-gen/qualifiers/gravity';
import { text } from '@cloudinary/url-gen/qualifiers/source';
import { TextStyle } from '@cloudinary/url-gen/qualifiers/textStyle';

const ImageCloud = () => {
  const cId = new Cloudinary({
    cloud: {
      cloudName: 'khriztianmoreno',
    },
  });

  const myImage = cId
    .image('_MG_4014')
    .resize(thumbnail().width(940).height(550).gravity('face'))
    .roundCorners(byRadius(20))
    .overlay(
      source(
        text('Make It Real is awesome', new TextStyle('arial', 28)).textColor(
          'blue'
        )
      ).position(new Position().gravity(compass('north')).offsetY(20))
    )
    .overlay(
      source(
        image('km_site/Asset_15').transformation(
          new Transformation()
            .resize(scale(80))
            .adjust(opacity(60))
            .adjust(brightness(200))
        )
      ).position(
        new Position().gravity(compass('south_east')).offsetX(10).offsetY(5)
      )
    );

  return (
    <div>
      <AdvancedImage cldImg={myImage} plugins={[placeholder()]} />
    </div>
  );
};

export default ImageCloud;
