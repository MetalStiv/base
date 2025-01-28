import { createSlice } from '@reduxjs/toolkit';
import { IJwtData } from '../../../../shared/types/jwt-data';
import { userApi } from './user-api';
import jwt_decode from "jwt-decode";
import { ApplicationState } from '../store';

interface IUserState {
  id: string,
  email: string,
}

const initialState: IUserState = { 
    id: '',
    email: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');

      return {
        id: '',
        email: '',
      }
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        const jwtData = jwt_decode(payload.access) as IJwtData;

        return {
            ...state,
            id: jwtData.id,
            email: jwtData.email
        }
      },
    )
  },
})

export const { logout } = userSlice.actions;
export const selectUserId = (state: ApplicationState) => state.userSlice.id;

export default userSlice.reducer;