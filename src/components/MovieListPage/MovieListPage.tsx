import React, {FC, useEffect, useState} from 'react';
import styles from './MovieListPage.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {fetchMoviesList, receiveMoorMovies} from "../../app/reducers/movies.reducer";
import MovieItem from "../MovieItem/MovieItem";
import InfiniteScroll from "react-infinite-scroll-component";
import FilmLoader from "../FilmLoader/FilmLoader";
import ScrollToTop from 'react-scroll-to-top';

interface MovieListPageProps {
}

const MovieListPage: FC<MovieListPageProps> = () => {
    const dispatch = useDispatch();
    const {results, totalPages} = useSelector((state: any) => state.movies.popular);
    const {searchResults, searchTotalPages, query} = useSelector((state: any) => state.movies.search);
    const [page, setPage]: [number, any] = useState(1);
    const [hasMorePages, setHasMorePages]: [boolean, any] = useState(true);
    const [moviesList, setMoviesList] = useState([]);

    useEffect(() => {
        if (searchResults) {
            setMoviesList(searchResults);

            return;
        }

        if (searchResults?.length === 0) {
            setMoviesList([]);

            return;
        }

        setMoviesList(results)
    }, [results, searchResults]);

    useEffect(() => {
        dispatch(receiveMoorMovies({query, page}));
        dispatch(fetchMoviesList(page));
    }, [dispatch, page, query]);

    useEffect(() => {
        if (searchTotalPages) {
            setHasMorePages(searchTotalPages > page);
            return;
        }
        setHasMorePages(totalPages > page);
    }, [dispatch, page, totalPages, searchTotalPages]);

    const receiveMoreFilms = () => {
        setTimeout(() => setPage(page + 1), 2000);
    };


    return (

        <>
            <InfiniteScroll next={receiveMoreFilms}
                            hasMore={hasMorePages}
                            className={styles.MovieListPage}
                            loader={<FilmLoader/>}
                            dataLength={moviesList.length}>
                {moviesList.length ? moviesList.map((film: any, index: number) => (
                    <MovieItem key={index}
                               id={film.id}
                               title={film.title}
                               img={film.poster_path}
                               overview={film.overview}
                               vote={film.vote_average}
                               date={film.release_date}
                               genres={film.genre_ids}
                    />
                )) : <div className={styles.searchError}><h1>Поиск не дал Результата.</h1></div>}
            </InfiniteScroll>
            <ScrollToTop className={styles.ToTop} smooth top={600} color={"#fff"}
                         style={{background: "rgb(0 0 0 / 48%)"}}/>

        </>
    )
};

export default MovieListPage;

