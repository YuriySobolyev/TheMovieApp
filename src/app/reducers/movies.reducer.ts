import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

interface IMovies {
    popular: {
        totalPages: number | null;
        results: any [];
    },
    search: {
        searchTotalPages: number | null;
        searchResults: any;
        query: string;
    },
    favorites: any[],
    currentMovie: null;
    currentMovieVideo: null;
    recommendations: any[]
}

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
        query: "",
    },
    favorites: [],
    currentMovie: null,
    currentMovieVideo: null,
    recommendations: []
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

export const fetchMovieDetails = createAsyncThunk(
    'movies/fetchMovieDetails',
    async (id: number) => {
        return await fetch(`${url}/3/movie/${id}?api_key=${authToken}&language=ru`)
            .then(res => res.json())
            .then(json => json);
    }
)

export const fetchRecommendations = createAsyncThunk(
    'movies/fetchRecommendations',
    async (id: number) => {
        const response = await fetch(`${url}/3/movie/${id}/recommendations?api_key=${authToken}&language=ru&page=1`)
            .then(res => res.json())
            .then(json => json);

        return response.results;
    }
);

export const fetchMovieVideo = createAsyncThunk(
    'movies/fetchMovieVideo',
    async (id: number) => {
        return await fetch(`${url}/3/movie/${id}/videos?api_key=${authToken}`)
            .then(res => res.json())
            .then(json => json);
    }
)

export const searchMovies = createAsyncThunk(
    'movies/searchMovies',
    async (query: string) => {
        const response = await fetch(`${url}/3/search/movie?api_key=${authToken}&language=ru&include_adult=false&page=1&query=${query}`)
            .then(res => res.json())
            .then(json => json);

        return {
            totalPages: response.total_pages,
            results: response.results,
            query,
        };
    }
)

export const receiveMoorMovies = createAsyncThunk(
    'movies/receiveMoorMovies',
    async ({query, page = 2}: any) => {
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
        togleFavorites(state, action: any) {
            const filmExist = state.favorites.find((film: any) => {
                return film.id === action.payload.id;
            })
            if (filmExist) {
                state.favorites = state.favorites.filter((film: any) => {
                    return film.id !== filmExist.id;
                });
                return;
            }
            state.favorites.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMoviesList.fulfilled, (state, action) => {
            state.popular.results.push(...action.payload.results)
            state.popular.totalPages = action.payload.totalPages;
        });
        builder.addCase(fetchMovieDetails.fulfilled, (state, action) => {
            state.currentMovie = {...action.payload};
        });
        builder.addCase(fetchRecommendations.fulfilled, (state, action) => {
            state.recommendations = [...action.payload];
        });
        builder.addCase(fetchMovieVideo.fulfilled, (state, action) => {
            state.currentMovieVideo = {...action.payload};
        });
        builder.addCase(searchMovies.fulfilled, (state, action) => {
            state.search.searchResults = [...action.payload.results]
            state.search.searchTotalPages = action.payload.totalPages;
            state.search.query = action.payload.query;
        });
        builder.addCase(receiveMoorMovies.fulfilled, (state, action) => {
            state.search.searchResults.push(...action.payload.results);
            state.search.searchTotalPages = action.payload.totalPages;
        });
    },
})

export const {togleFavorites} = moviesSlice.actions;
export default moviesSlice.reducer