'use client';

import * as React from 'react';

export interface ToastData {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  action?: React.ReactNode;
}

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 5000;

type ActionType =
  | { type: 'ADD_TOAST'; toast: ToastData }
  | { type: 'UPDATE_TOAST'; toast: Partial<ToastData> & { id: string } }
  | { type: 'DISMISS_TOAST'; toastId: string }
  | { type: 'REMOVE_TOAST'; toastId: string };

let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

function addToRemoveQueue(toastId: string, dispatch: React.Dispatch<ActionType>) {
  if (toastTimeouts.has(toastId)) return;
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({ type: 'REMOVE_TOAST', toastId });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
}

function reducer(state: ToastData[], action: ActionType): ToastData[] {
  switch (action.type) {
    case 'ADD_TOAST':
      return [action.toast, ...state].slice(0, TOAST_LIMIT);
    case 'UPDATE_TOAST':
      return state.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t));
    case 'DISMISS_TOAST':
      return state.filter((t) => t.id !== action.toastId);
    case 'REMOVE_TOAST':
      return state.filter((t) => t.id !== action.toastId);
    default:
      return state;
  }
}

const listeners: Array<(state: ToastData[]) => void> = [];
let memoryState: ToastData[] = [];

function dispatch(action: ActionType) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}

export function toast(props: Omit<ToastData, 'id'>) {
  const id = genId();
  dispatch({ type: 'ADD_TOAST', toast: { id, duration: props.duration ?? 5000, ...props } });

  setTimeout(() => {
    dispatch({ type: 'DISMISS_TOAST', toastId: id });
  }, props.duration ?? 5000);

  return {
    id,
    dismiss: () => dispatch({ type: 'DISMISS_TOAST', toastId: id }),
    update: (data: Partial<ToastData>) =>
      dispatch({ type: 'UPDATE_TOAST', toast: { id, ...data } }),
  };
}

export function useToast() {
  const [state, setState] = React.useState<ToastData[]>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) listeners.splice(index, 1);
    };
  }, []);

  return {
    toasts: state,
    toast,
    dismiss: (toastId: string) => dispatch({ type: 'DISMISS_TOAST', toastId }),
  };
}
