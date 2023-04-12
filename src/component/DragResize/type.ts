export type IPropsEdit = {
  width: number;
  height: number;
  children: React.ReactNode
}

export type IPropsItem = {
  id: string;
  enableDirection?: Array<Direction>;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  maxWidth?: number;
  maxHeight?: number
}

export type IPropsGuide = {
  width: number;
  height: number;
  currentItem?: CurrentItem
}

export type Direction = 'TOP_LEFT' | 'TOP_MIDDLE' | 'TOP_RIGHT' | 'MIDDLE_LEFT' | 'MIDDLE_RIGHT' | 'BOTTOM_LEFT' | 'BOTTOM_MIDDLE' | 'BOTTOM_RIGHT';

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

export type CurrentItem = {
  id: string;
  width: number;
  height: number;
  x: number;
  y: number;
}

export type OnMove = (item: CurrentItem) => void;
