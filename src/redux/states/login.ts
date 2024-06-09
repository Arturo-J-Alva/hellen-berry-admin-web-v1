import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginState, PersonalData } from "../interfaces";

export const UserEmptyState: LoginState = {
  personalData: null,
  isLogged: null,
  idUser: "",
  token: "",
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
    updateToken: (state, action: PayloadAction<string>) => ({
      ...state,
      token: action.payload,
      isLogged: true,
    }),
  },
});

export const {
  createUser,
  modifyUser,
  resetUserState,
  updateIdUser,
  updateToken,
} = userSlice.actions;

export default userSlice.reducer;
