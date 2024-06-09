import { createSlice } from '@reduxjs/toolkit';
import { ApiState } from '../interfaces';

export const ApiStateInit: ApiState = {
  numberRequest: 0,
};

export const apiSlice = createSlice({
  name: 'api',
  initialState: ApiStateInit,
  reducers: {
    startRequest: state => ({
      numberRequest: state.numberRequest + 1,
    }),
    endRequest: state => ({
      numberRequest: Math.max(state.numberRequest - 1, 0),
    }),
  },
});

export const {startRequest, endRequest} = apiSlice.actions;

export default apiSlice.reducer;
