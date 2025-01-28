import { BaseQueryFn, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { api } from '../constants/api-config';
import { ITokenDto } from '../../../shared/types/dto/token-dto';
import { logout } from '../store/slices/user-slice';

export const fetchBaseQueryWithReauth = (baseUrl: string) => {
    const baseQuery = fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('access_token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    });

    const baseQueryWithReauth: BaseQueryFn = async (args, store, extraOptions) => {
        let result = await baseQuery(args, store, extraOptions);
        
        if (result.error && result.error.status === 401) {
    
            const refreshToken = localStorage.getItem('refresh_token');
    
            if (refreshToken) {
                const refreshResult = await baseQuery(
                    {
                        url: `${api.userApi.routes.refresh}`,
                        method: 'POST',
                        body: { refreshToken: refreshToken }
                    },
                    store,
                    extraOptions
                );
    
                if (refreshResult.data) {
                    localStorage.setItem('access_token', (refreshResult.data as ITokenDto).access);
                    result = await baseQuery(args, store, extraOptions);
                } else {
                    console.error('Failed to refresh token:', refreshResult.error);
                    store.dispatch(logout());
                }
            } else {
                console.warn('No refresh token found. Logging out...');
                store.dispatch(logout());
            }
        }
    
        return result;
    };    

    return baseQueryWithReauth;
}