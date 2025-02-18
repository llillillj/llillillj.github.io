interface Slider {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    key: string;
}

export const sliders: Slider[] = [
    {
      label: '分離重み',
      value: 1.5,
      min: 0,
      max: 5,
      step: 0.1,
      key: 'separationWeight'
    },
    {
      label: '整列重み',
      value: 1.0,
      min: 0,
      max: 5,
      step: 0.1,
      key: 'alignmentWeight'
    },
    {
      label: '結合重み',
      value: 1.0,
      min: 0,
      max: 5,
      step: 0.1,
      key: 'cohesionWeight'
    },
    {
      label: '分離距離',
      value: 20,
      min: 10,
      max: 100,
      step: 1,
      key: 'separationDistance'
    },
    {
      label: '整列距離',
      value: 50,
      min: 10,
      max: 200,
      step: 1,
      key: 'alignmentDistance'
    },
    {
      label: '結合距離',
      value: 100,
      min: 10,
      max: 300,
      step: 1,
      key: 'cohesionDistance'
    },
    {
      label: '最大速度',
      value: 0.5,
      min: 0.1,
      max: 2,
      step: 0.1,
      key: 'maxSpeed'
    }
  ]