import { configureStore } from '@reduxjs/toolkit'

import { blogApi } from './features/blogs/blogsApi'
import authApi from './features/auth/authApi'
import authReducer from './features/auth/authSlice'

import commentApi from './features/comments/commentApi'





export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [blogApi.reducerPath]: blogApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [commentApi.reducerPath]: commentApi.reducer,
        auth: authReducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(blogApi.middleware, authApi.middleware, commentApi.middleware),

})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization