import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
    user: null,
    token: null,
    isLoading: false,
    status: null,
}

export const registerUser = createAsyncThunk('auth/registerUser', async({ username, password}) => {
    try {
        const { data } = await axios.post('/auth/register', {
            username,
            password,
        })
        if(data.token) {
            window.localStorage.setItem('token', data.token)
        }
        return data
    } catch (error) {
        console.log(error)
    }
})

export const loginUser = createAsyncThunk('auth/loginUser', async({ username, password}) => {
    try {
        const { data } = await axios.post('/auth/login', {
            username,
            password,
        })
        if(data.token) {
            window.localStorage.setItem('token', data.token)
        }
        return data
    } catch (error) {
        console.log(error)
    }
})

export const getme = createAsyncThunk('auth/me', async() => {
    try {
        const { data } = await axios.get('/auth/me')
        return data
    } catch (error) {
        console.log(error)
    }
})


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null
            state.isLoading = false
            state.status = null
        }
    },
    extraReducers: (builder) => {
        // Register
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
                state.status = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.status = action.payload.message
                state.user = action.payload.user
                state.token = action.payload.token
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = action.payload.message
                state.isLoading = false
            })
        
        // Login
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
                state.status = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.status = action.payload.message
                state.user = action.payload.user
                state.token = action.payload.token
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = action.payload.message
                state.isLoading = false
            })
        // GetMe
            .addCase(getme.pending, (state) => {
                state.isLoading = true
                state.status = null
            })
            .addCase(getme.fulfilled, (state, action) => {
                state.isLoading = false
                state.status = null
                state.user = action.payload?.user
                state.token = action.payload?.token
            })
            .addCase(getme.rejected, (state, action) => {
                state.status = action.payload.message
                state.isLoading = false
            })
    }
})

export const checkIsAuth = (state) => Boolean(state.auth.token)

export const {logout} = authSlice.actions

export default authSlice.reducer