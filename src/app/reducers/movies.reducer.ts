import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

interface IMovies {
    popular: {
        totalPages: number | null;
        results:any [];
    },
    search: {
        searchTotalPages: number | null;
        searchResults: any;
    },
    currentMovie: null;
};

const url = process.env.REACT_APP_URL;
const authToken = process.env.REACT_APP_AUTH_TOKEN;

const initialState = {
    popular: {
        totalPages: null,
        results: [],
    },
    search: {
        searchTotalPages: null,
        searchResults: null,
    },
    currentMovie: null
} as IMovies;

export const fetchMoviesList = createAsyncThunk(
    'movies/fetchMoviesList',
    async (page: number = 1) => {
        const response = await fetch(`${url}/3/movie/popular?api_key=${authToken}&page=${page}&language=ru`)
            .then(res => res.json())
            .then(json => json);

        return {
            totalPages: response.total_pages,
            results: response.results
        };
    }
)

export const fetchMovieDitails = createAsyncThunk(
    'movies/fetchMovieDitails',
    async (id: number) => {
        const response = await fetch(`${url}/3/movie/${id}?api_key=${authToken}&language=ru`)
            .then(res => res.json())
            .then(json => json);

        return response;
    }
)

export const searchMovies = createAsyncThunk(
    'movies/searchMovies',
    async ({query, page}: any) => {
        const response = await fetch(`${url}/3/search/movie?api_key=${authToken}&language=ru&include_adult=false&page=${page}&query=${query}`)
            .then(res => res.json())
            .then(json => json);

        return {
            totalPages: response.total_pages,
            results: response.results
        };
    }
)

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchMoviesList.fulfilled, (state, action) => {
            state.popular.results.push(...action.payload.results)
            state.popular.totalPages = action.payload.totalPages;
        });
        builder.addCase(fetchMovieDitails.fulfilled, (state, action) => {
            state.currentMovie = {...action.payload};
        });
        builder.addCase(searchMovies.fulfilled, (state, action) => {
            state.search.searchResults = [...action.payload.results]
            state.search.searchTotalPages = action.payload.totalPages;
        });
    },
})

export default moviesSlice.reducer