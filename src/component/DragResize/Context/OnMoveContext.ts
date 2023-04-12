import { createContext } from 'react';
import { OnMove } from './../type';
export const onMoveContext = createContext<OnMove | null>(null);
