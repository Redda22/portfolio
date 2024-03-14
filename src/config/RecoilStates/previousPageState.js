import { atom } from 'recoil';

export const previousPageState = atom({
  key: 'previousPageState',
  default: false,
});
