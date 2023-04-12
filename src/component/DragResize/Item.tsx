import React, { useContext, useRef, useState } from 'react';
import { editContext } from './Context/EditContext';
import { onMoveContext } from './Context/OnMoveContext';
import GuideLine from './GuideLine';
import { directionStyle, Direction, IPropsItem, ActionType, CursorType } from './type';
import { calculateCoordinateRad, radToAngle, calculateRotatedPointCoordinate, calculateGuide } from './tool';
import './index.css';
const Index = function (props: IPropsItem) {
  let {
    enableDirection = ['TOP_LEFT', 'TOP_MIDDLE', 'TOP_RIGHT', 'MIDDLE_LEFT', 'MIDDLE_RIGHT', 'BOTTOM_LEFT', 'BOTTOM_MIDDLE', 'BOTTOM_RIGHT'],
    id
  } = props;
  let initEvent = useRef<React.MouseEvent>(); // 初始event
  let initDirection = useRef<Direction | string>(''); // 初始方向
  let actionType = useRef<ActionType>('');
  let defaultAngle: Record<Direction, number> = {
    TOP_MIDDLE: 0,
    TOP_RIGHT: 45,
    MIDDLE_RIGHT: 90,
    BOTTOM_RIGHT: 135,
    BOTTOM_MIDDLE: 180,
    BOTTOM_LEFT: 225,
    MIDDLE_LEFT: 270,
    TOP_LEFT: 315,
  };
  let editDom = useContext(editContext);
  let onMoveCb = useContext(onMoveContext);
  let dom = useRef<HTMLDivElement>();
  let [width, setWidth] = useState<number>(props.width || 200);
  let [height, setHeight] = useState<number>(props.height || 200);
  let [positionX, setPositionX] = useState<number>(props.x || 0);
  let [positionY, setPositionY] = useState<number>(props.y || 0);
  let [rotate, setRotate] = useState<number>(0);
  let [isActive, setIsActive] = useState<Boolean>(true);
  const onMouseDown = (event: React.MouseEvent, type: ActionType, direction?: Direction) => {
    event.stopPropagation();
    if (direction) {
      initDirection.current = direction;
    }
    initEvent.current = event;
    actionType.current = type;
    bindEvents();
  };
  const onMouseup = (event: MouseEvent) => {
    event.stopPropagation();
    initDirection.current = '';
    actionType.current = '';
    unBindEvents();
  };
  const onMousemove = (event: MouseEvent) => {
    let diffX = event.clientX - (initEvent.current?.clientX || 0);
    let diffY = event.clientY - (initEvent.current?.clientY || 0);
    if (initEvent.current && initDirection.current && actionType.current === 'RESIZE' && editDom) {
      // 编辑器盒子
      const editRect = editDom.getBoundingClientRect();
      // 中心点
      const center = {
        x: positionX + width / 2,
        y: positionY + height / 2,
      };
      // 当前点击点
      const initPoint = {
        x: initEvent.current.clientX - editRect.left,
        y: initEvent.current.clientY - editRect.top,
      };
      // 获取对称点的坐标
      const symmetricPoint = {
        x: center.x - (initPoint.x - center.x),
        y: center.y - (initPoint.y - center.y),
      };
      // 实时点坐标
      const currentPoint = {
        x: event.clientX - editRect.left,
        y: event.clientY - editRect.top,
      };
      const newCenterPoint = {
        x: currentPoint.x + (symmetricPoint.x - currentPoint.x) / 2,
        y: currentPoint.y + (symmetricPoint.y - currentPoint.y) / 2,
      };
      let topLeftPoint = calculateRotatedPointCoordinate(currentPoint, newCenterPoint, -rotate);
      let bottomRightPoint = calculateRotatedPointCoordinate(symmetricPoint, newCenterPoint, -rotate);
      const newwidth = bottomRightPoint.x - topLeftPoint.x;
      const newheight = bottomRightPoint.y - topLeftPoint.y;
      if (initDirection.current?.indexOf('TOP') > -1) {
        setHeight(Math.abs(newheight));
        setPositionY(topLeftPoint.y);
      }
      if (initDirection.current?.indexOf('BOTTOM') > -1) {
        setHeight(Math.abs(newheight));
      }
      if (initDirection.current?.indexOf('LEFT') > -1) {
        setWidth(Math.abs(newwidth));
        setPositionX(topLeftPoint.x);
      }
      if (initDirection.current?.indexOf('RIGHT') > -1) {
        setWidth(Math.abs(newwidth));
      }
    } else if (initEvent.current && !initDirection.current && actionType.current === 'MOVE') {
      let _positionY = positionY + diffY;
      let _positionX = positionX + diffX;
      setPositionX(_positionX);
      setPositionY(_positionY);
      onMoveCb && onMoveCb({id, width, height, x: _positionX, y: _positionY})
    } else if (initEvent.current && !initDirection.current && actionType.current === 'ROTATE' && dom.current) {
      const startX = initEvent.current.clientX;
      const startY = initEvent.current.clientY;
      const rect = dom.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const currentX = event.clientX;
      const currentY = event.clientY;
      // 旋转前的角度
      const rotateBefore = radToAngle(calculateCoordinateRad(centerY - startY, startX - centerX));
      // 旋转后的角度
      const rotateAfter = radToAngle(calculateCoordinateRad(centerY - currentY, currentX - centerX));
      setRotate(() => {
        let tmp = 0;
        if (rotateBefore - rotateAfter < 0) {
          tmp = rotate + (360 + rotateBefore - rotateAfter);
        } else {
          tmp = rotate + rotateBefore - rotateAfter;
        }
        if (tmp > 360) {
          return (tmp = tmp % 360);
        } else {
          return tmp;
        }
      });
    }
  };
  const bindEvents = () => {
    document.addEventListener('mouseup', onMouseup);
    document.addEventListener('mousemove', onMousemove);
  };
  const unBindEvents = () => {
    document.removeEventListener('mouseup', onMouseup);
    document.removeEventListener('mousemove', onMousemove);
  };
  // 方向
  const renderDirection = () => {
    const directionDom = enableDirection.map((direction) => {
      return (
        <span
          key={direction}
          style={{
            ...directionStyle[direction],
            cursor: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 32 32"><path d="M 16,5 L 12,10 L 14.5,10 L 14.5,22 L 12,22 L 16,27 L 20,22 L 17.5,22 L 17.5,10 L 20, 10 L 16,5 Z" stroke-linejoin="round" stroke-width="1.2" fill="black" stroke="white" style="transform:rotate(${defaultAngle[direction] + rotate}deg);transform-origin: 16px 16px"></path></svg>') 16 16, auto`,
            // cursor: directionCursor[direction]
          }}
          onMouseDown={(event) => {
            onMouseDown(event, 'RESIZE', direction);
          }}
        ></span>
      );
    });
    return <>{directionDom}</>;
  };
  return (
    <div
      className="dragResize-item"
      data-id={id}
      style={{
        width,
        height,
        border: '1px solid #1677ff',
        position: 'relative',
        transform: `translate(${positionX}px, ${positionY}px) rotate(${rotate}deg)`,
        transformOrigin: 'center, center',
      }}
      onMouseDown={(event) => {
        onMouseDown(event, 'MOVE');
      }}
      ref={(ele) => ele && (dom.current = ele)}
    >
      {/* <GuideLine width={width} height={height} x={positionX} y={positionY} /> */}
      <div>
        {renderDirection()}
        <span
          className="dragResize-rotate"
          onMouseDown={(event) => onMouseDown(event, 'ROTATE')}
        ></span>
      </div>
    </div>
  );
};
export default Index;
