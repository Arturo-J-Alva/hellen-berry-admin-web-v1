import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginState, PersonalData } from "../interfaces";

export const UserEmptyState: LoginState = {
  personalData: null,
  isLogged: null,
  idUser: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: UserEmptyState,
  reducers: {
    createUser: (state, action: PayloadAction<PersonalData>) => ({
      ...state,
      personalData: action.payload,
    }),
    modifyUser: (state, action: PayloadAction<Partial<PersonalData>>) => ({
      ...state,
      personalData: state.personalData
        ? {
            ...state.personalData,
            ...action.payload,
          }
        : null,
    }),
    resetUserState: () => UserEmptyState,
    //
    updateIdUser: (state, action: PayloadAction<string>) => ({
      ...state,
      idUser: action.payload,
    }),
    loggedIn: (state) => ({
      ...state,
      isLogged: true,
    }),
    loggedOut: (state) => ({
      ...state,
      isLogged: false,
    }),
  },
});

export const {
  createUser,
  modifyUser,
  resetUserState,
  updateIdUser,
  loggedIn,
  loggedOut
} = userSlice.actions;

export default userSlice.reducer;
