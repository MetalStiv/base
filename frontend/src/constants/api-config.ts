interface ApiConfig {
    base: string,
    routes: Record<string, string>
}

const transactionApi: ApiConfig = {
    base: 'http://localhost:3016/',
    routes: {
        getTransactions: 'getTransactions',
        postTransaction: 'postTransaction',
        deleteTransaction: 'deleteTransaction'
    }
}

const userApi: ApiConfig = {
    base: 'http://localhost:3015/',
    routes: {
        register: 'register',
        login: 'login',
        refreshToken: 'refreshToken',
    }
}

export const api: Record<string, ApiConfig> = {
    transactionApi,
    userApi
}