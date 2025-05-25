import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
    id?: string;
    text?: string;
    completed?: boolean;
}

const initialState: AuthState = {
};

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        onLogin(state, action) {
            state.token = action.payload.token;
            state.id = action.payload.id;
            state.userType = action.payload.userType;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            console.log('Login successful:', action.payload);
            useAsyncStorage('authv1').setItem(JSON.stringify({
                token: action.payload.token,
                id: action.payload.id,
                userType: action.payload.userType,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
            }));
        },
        onLogout(state) {
            state.id = undefined;
            state.text = undefined;
            state.completed = undefined;
        },
        getAuth(state) {
            return state;
        }
    }
})

export const { onLogin, onLogout } = auth.actions;

// Selector to get auth state
export const selectAuth = (state: any) => state.auth;
export default auth.reducer;