/*
  获取 (x, y) 对应的偏移角度
  return 
*/
export const calculateCoordinateRad = (y: number, x: number): number => {
  let rad = Math.atan2(y, x);
  return rad;
  // return rad >= 0 ? rad : rad + Math.PI * 2;
};
/*
  获取度数
  rad 弧度
*/
export const radToAngle = (rad: number): number => {
  let degree = rad / (Math.PI / 180);
  return degree;
};
const angleToRadian = (angle: number) => {
  let rad = angle / 180 * Math.PI;
  return rad;
};
// 计算旋转后坐标
export const calculateRotatedPointCoordinate = (
  point: {
    x: number;
    y: number;
  },
  center: {
    x: number;
    y: number;
  },
  rotate: number
) => {
  let rad = angleToRadian(rotate);
  let sin = Number(Math.sin(rad).toFixed(2));
  let cos = Number(Math.cos(rad).toFixed(2));
  return {
    x: (point.x - center.x) * cos - (point.y - center.y) * sin + center.x,
    y: (point.x - center.x) * sin + (point.y - center.y) * cos + center.y,
  };
}
export const calculateGuide = (info: DOMRect) => {
  return {
    rowT: {
      y: info.y
    },
    rowM: {
      y: info.y + info.height / 2
    },
    rowB: {
      y: info.y + info.height
    },
    columnL: {
      x: info.x
    },
    columnM: {
      x: info.x + info.width / 2
    },
    columnR: {
      x: info.x + info.right
    },
  }
}
