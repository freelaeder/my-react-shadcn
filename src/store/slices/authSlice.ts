import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "@/store";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { UserRes } from "@/api/auth/types.ts";

export interface AuthState {
    auth: Partial<UserRes>;
    token: string | null;
}

export const authSlice = createSlice({
    name: 'auth', // Optional slice name
    initialState: {
        auth: {},
        token: null
    } as AuthState, // Initial state type assertion
    reducers: {
        saveAuth(state: Draft<AuthState>, action: PayloadAction<UserRes>) {
            state.auth = action.payload;
        },
        clearAuth(state: Draft<AuthState>) {
            state.auth = {};
            state.token = '';
            localStorage.removeItem('token');
        },
        saveToken(state: Draft<AuthState>, action: PayloadAction<string>) {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        },
    }
});

// Export actions and selectors
export const { saveAuth, clearAuth, saveToken } = authSlice.actions;
export const selectAuth = (state: AppState) => state.auth.auth;
export const selectToken = (state: AppState) => state.auth.token;

// Persist reducer configuration
export const authReducer = persistReducer({
    key: 'auth', // Key for persist storage
    storage: storage, // Storage method (localStorage, AsyncStorage, etc.)
}, authSlice.reducer);

