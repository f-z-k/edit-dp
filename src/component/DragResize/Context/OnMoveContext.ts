import { createContext } from 'react';
type cb = (dom: HTMLDivElement) => void;
export const onMoveContext = createContext<cb | null>(null);
