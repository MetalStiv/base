import { createApi } from '@reduxjs/toolkit/query/react'
import { ITransactionDto } from '../../../../shared/types/dto/transaction-dto';
import { IIdDto } from '../../../../shared/types/dto/id-dto';
import { api } from '../../constants/api-config';
import { fetchBaseQueryWithReauth } from '../../helpers/fetch-base-query-with-reauth';

export const transactionsApi = createApi({
  baseQuery: fetchBaseQueryWithReauth(api.transactionApi.base),
  reducerPath: 'transactions-api',
  tagTypes: ['TRANSACTIONS'],
  endpoints: (build) => ({
    getTransactions: build.query<ITransactionDto[], void>({
      query: () => api.transactionApi.routes.getTransactions,
      providesTags: ['TRANSACTIONS']
    }),
    postTransaction: build.mutation<void, ITransactionDto>({
      query: (transaction) => ({
        url: api.transactionApi.routes.postTransaction,
        method: 'POST',
        body: transaction,
      }),
      invalidatesTags: ['TRANSACTIONS']
    }),
    deleteTransaction: build.mutation<void, IIdDto>({
      query: (transaction) => ({
        url: api.transactionApi.routes.deleteTransaction,
        method: 'DELETE',
        body: transaction,
      }),
      invalidatesTags: ['TRANSACTIONS']
    }),
  }),
})

export const { useGetTransactionsQuery, usePostTransactionMutation, useDeleteTransactionMutation } = transactionsApi;
