import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getListPolicy, getListVersion } from "../../actions/apiCall/newsService";


const initialState = {
    policies: null,
    policy: null,
    versions: null,
    version: null,
    connectInternet: false, 
    loading: false
}

export const getVerionsAPI = createAsyncThunk(
    'filter/getVerionsAPI',
    async () => {
        const request = await getListVersion()
        return request.data
    }
)

export const getPoliciesAPI = createAsyncThunk(
    'filter/getPoliciesAPI',
    async () => {
        const request = await getListPolicy()
        return request.data
    }
)

const utilitiesSlice = createSlice({
    name: 'utilities',
    initialState,
    reducers: {
        setVerion: (state, action) => {
            const result = state.versions.filter(version => version.id === action.payload)
            state.version = result[0]
        },
        setPlicy: (state, action) => {
            const result = state.policies.filter(policy => policy.id === action.payload)
            state.policy = result[0]
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        updateConnectionInternet: (state, action) => {
            state.connectInternet = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getVerionsAPI.fulfilled, (state, action) => {
            state.versions = [...action.payload]
            state.loading = false
        })
        builder.addCase(getPoliciesAPI.fulfilled, (state, action) => {
            state.policies = [...action.payload]
            state.loading = false
        })
    }
})

export const utilitiesAction = utilitiesSlice.actions

export const utilitiesSelect = {
    getVersions: (state, action) => state.utilities.versions,
    getVersion: (state, action) => state.utilities.version,

    getPolicies: (state, action) => state.utilities.policies,
    getPolicy: (state, action) => state.utilities.policy,

    getLoading: (state, action) => state.utilities.loading,
    getConnectionInternet: (state, action) => state.utilities.connectInternet
}

export default utilitiesSlice.reducer