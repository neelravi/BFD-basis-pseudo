import * as React from 'react';
import {
  s2,
  s2 as sceneJson,
  shperes as sceneJson2
} from '../../components/crystal-toolkit/scene/simple-scene';
import {
  CrystalToolkitScene,
  CrystalToolkitSceneProps
} from '../../components/crystal-toolkit/CrystalToolkitScene/CrystalToolkitScene';
import { CameraContextProvider } from '../../components/crystal-toolkit/CameraContextProvider';
import { ScenePosition } from '../../components/crystal-toolkit/scene/inset-helper';
import { AnimationStyle, Renderer } from '../../components/crystal-toolkit/scene/constants';
import { bezierScene } from '../../components/crystal-toolkit/scene/bezier-scene';
import { Story } from '@storybook/react';

export default {
  component: CrystalToolkitScene,
  title: 'Crystal Toolkit/CrystalToolkitScene'
};

const Template: Story<React.PropsWithChildren<CrystalToolkitSceneProps>> = (args) => (
  <CrystalToolkitScene {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  debug: false,
  animation: AnimationStyle.NONE,
  // axisView: select('Axis position', ['SW', 'SE', 'NW', 'NE', 'HIDDEN'], 'SW'),
  inletPadding: 10,
  inletSize: 100,
  data: sceneJson,
  sceneSize: 400,
  toggleVisibility: {},
  settings: {
    renderer: Renderer.WEBGL,
    extractAxis: false,
    zoomToFit2D: true
  }
};

export const AnimatedScene = Template.bind({});
AnimatedScene.args = {
  sceneSize: '30vw',
  animation: AnimationStyle.PLAY,
  settings: {
    staticScene: false,
    renderer: Renderer.WEBGL,
    extractAxis: false,
    isMultiSelectionEnabled: false,
    secondaryObjectView: true
  },
  data: s2,
  debug: false
};

export const LinkedCameras: Story<React.PropsWithChildren<CrystalToolkitSceneProps>> = (args) => (
  <CameraContextProvider>
    <>
      <CrystalToolkitScene
        axisView={ScenePosition.HIDDEN}
        sceneSize={150}
        data={sceneJson2}
      ></CrystalToolkitScene>
      <CrystalToolkitScene
        axisView={ScenePosition.HIDDEN}
        sceneSize={150}
        data={sceneJson}
      ></CrystalToolkitScene>
    </>
  </CameraContextProvider>
);

export const TubeScene = Template.bind({});
TubeScene.args = {
  sceneSize: '30vw',
  animation: AnimationStyle.NONE,
  settings: {
    staticScene: true,
    renderer: Renderer.WEBGL,
    extractAxis: false,
    isMultiSelectionEnabled: false,
    secondaryObjectView: true
  },
  data: bezierScene,
  debug: false
};
const TubeSceneDescription = `
  Use the Bezier type to create a tube made of two extruded bezier curves. Each tube
  is divided in two bezier curves. Each curve has three control points, but as the last control
  point of the first is the same as the first control point of the last control, we only have five
  control points for a bezier tube. Similarly, each curve has its own start radius and end radius,
  but as the intermediate radius is shared, the radius only has three elements. Finally, each
  curve has its own color.
`;
TubeScene.parameters = {
  docs: {
    storyDescription: TubeSceneDescription
  }
};
