import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { ApiState, LoginState } from "./interfaces";
import { apiSlice } from "./states/api";
import { userSlice } from "./states/login";

export interface AppStore {
  login: LoginState;
  api: ApiState;
}

const globalStore = configureStore<AppStore>({
  reducer: {
    login: userSlice.reducer,
    api: apiSlice.reducer,
  },
});

export const dispatchGlobal = (
  action: ThunkAction<unknown, AppStore, undefined, AnyAction>
) => globalStore.dispatch(action);

export default globalStore;
