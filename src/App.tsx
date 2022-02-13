import React from 'react';
import './App.scss';
import MovieHeader from './components/MovieHeader/MovieHeader';
import MovieListPage from "./components/MovieListPage/MovieListPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Favorites from "./components/Favorites/Favorites";
import MovieDetailsPage from "./components/MovieDetailPage/MovieDetailsPage";

function App() {
    return (
        <BrowserRouter>
            <MovieHeader/>
            <Routes>
                <Route path="/" element={<MovieListPage/>}/>
                <Route path="/favorites" element={<Favorites/>}/>
                <Route path="/movie/:id" element={<MovieDetailsPage/>}/>
                {/*<Route path="/ru" element={<Ru/>}/>*/}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
