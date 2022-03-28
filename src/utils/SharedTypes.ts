import { Dispatch, AnyAction } from 'redux';

export type DispatchFunction = (d: Dispatch<AnyAction>) => void;
