import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ILoginDto } from '../../../../shared/types/dto/login-dto';
import { api } from '../../constants/api-config';
import { ITokenDto } from '../../../../shared/types/dto/token-dto';

export const userApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: api.userApi.base }),
  reducerPath: 'user-api',
  endpoints: (build) => ({
    register: build.mutation<void, ILoginDto>({
        query: (credentials) => ({
            url: api.userApi.routes.register,
            method: 'POST',
            body: credentials,
        }),
    }),
    login: build.mutation<ITokenDto, ILoginDto>({
        query: (credentials) => ({
          url: api.userApi.routes.login,
          method: 'POST',
          body: credentials,
        }),
      }),

  }),
})

export const { useRegisterMutation, useLoginMutation } = userApi;
