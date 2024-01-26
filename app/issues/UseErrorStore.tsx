import { create } from 'zustand';

type IntialState = {
  isErr: boolean;
  errMsg: string;
  setErrMsg: (err: string) => void;
  setIsErr: () => void;
};

export const useErrorStore = create<IntialState>()(set => ({
  isErr: false,
  errMsg: '',
  setErrMsg: (err: string) => set(state => ({ errMsg: err })),
  setIsErr: () => set(state => ({ isErr: !state.isErr })),
}));
