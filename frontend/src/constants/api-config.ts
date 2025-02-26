interface ApiConfig {
    base: string,
    routes: Record<string, string>
}

const transactionApi: ApiConfig = {
    base: 'http://178.208.72.167:3016/',
    routes: {
        getTransactions: 'getTransactions',
        postTransaction: 'postTransaction',
        deleteTransaction: 'deleteTransaction'
    }
}

const userApi: ApiConfig = {
    base: 'http://178.208.72.167:3015/',
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