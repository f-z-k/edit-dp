export type IPropsBox = {
  width: number;
  height: number;
  children: React.ReactNode
}

export type Direction = 'TOP_LEFT' | 'TOP_MIDDLE' | 'TOP_RIGHT' | 'MIDDLE_LEFT' | 'MIDDLE_RIGHT' | 'BOTTOM_LEFT' | 'BOTTOM_MIDDLE' | 'BOTTOM_RIGHT';

export type IProps = {
  enableDirection?: Array<Direction>;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  maxWidth?: number;
  maxHeight?: number
}

export type ActionType = 'MOVE' | 'RESIZE' | 'ROTATE' | '';

export type CursorType = 'nw-resize' | 'n-resize' | 'ne-resize' | 'w-resize' | 'e-resize' | 'sw-resize' | 's-resize' | 'se-resize'

const baseStyle = {
  position: 'absolute',
  width: '8px',
  height: '8px',
  // background: '#ffffff',
  border: '1px solid #333',
  boxShadow: '0 0 2px #bbb',
} as const;
export const directionStyle: { [key in Direction]?: React.CSSProperties } = {
  TOP_LEFT: {
    ...baseStyle,
    top: '-5px',
    left: '-5px',
    cursor: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 32 32" ><path d="M 16,5 L 12,10 L 14.5,10 L 14.5,22 L 12,22 L 16,27 L 20,22 L 17.5,22 L 17.5,10 L 20, 10 L 16,5 Z" stroke-linejoin="round" stroke-width="1.2" fill="black" stroke="white" style="transform:rotate(45deg);transform-origin: 16px 16px"></path></svg>')`,
    // cursor: 'nw-resize'
  },
  TOP_MIDDLE: {
    ...baseStyle,
    top: '-5px',
    left: 'calc(50% - 4px)',
    cursor: 'n-resize',
  },
  TOP_RIGHT: {
    ...baseStyle,
    top: '-5px',
    right: '-5px',
    cursor: 'ne-resize'
  },
  MIDDLE_LEFT: {
    ...baseStyle,
    top: 'calc(50% - 4px)',
    left: '-5px',
    cursor: 'w-resize'
  },
  MIDDLE_RIGHT: {
    ...baseStyle,
    top: 'calc(50% - 4px)',
    right: '-5px',
    cursor: 'e-resize'
  },
  BOTTOM_LEFT: {
    ...baseStyle,
    bottom:' -5px',
    left: '-5px',
    cursor: 'sw-resize'
  },
  BOTTOM_MIDDLE: {
    ...baseStyle,
    bottom: '-5px',
    left: 'calc(50% - 4px)',
    cursor: 's-resize'
  },
  BOTTOM_RIGHT: {
    ...baseStyle,
    bottom: '-5px',
    right: '-5px',
    cursor: 'se-resize'
  }
};
