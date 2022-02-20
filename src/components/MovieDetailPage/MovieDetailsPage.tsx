import React, {FC, useEffect} from 'react';
import styles from './MovieDetailsPage.module.scss';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchMovieDetails, fetchMovieVideo, fetchRecommendations} from "../../app/reducers/movies.reducer";
import MovieVideoPage from "../MovieVideoPage/MovieVideoPage";
import MovieItem from "../MovieItem/MovieItem";

interface MovieDetailPageProps {
}

const MovieDetailsPage: FC<MovieDetailPageProps> = () => {
    const {id}: any = useParams();
    const dispatch = useDispatch();
    const details = useSelector((state: any) => state.movies.currentMovie);
    const imgUrlBase = process.env.REACT_APP_IMG_URL;
    const recommendations = useSelector(
        (state: any) => state.movies.recommendations
    );

    useEffect(() => {
        dispatch(fetchMovieDetails(id));
        dispatch(fetchMovieVideo(id));
        dispatch(fetchRecommendations(id));
    }, [dispatch, id]);

    const displayRecommendations = recommendations?.slice(0, 3).map(
        (film: any, index: number) => {
            return (
                <div className={styles.RecMovie}><MovieItem key={index}
                                                            id={film.id}
                                                            title={film.title}
                                                            img={film.poster_path}
                                                            overview={film.overview}
                                                            vote={film.vote_average}
                                                            genres={film.genre_ids}
                                                            date={film.release_date}
                /></div>
            );
        }
    );

    return (

        <div className={styles.MovieDetailPage}>
            <div>
                <img className={styles.imgDetailBackdrop}
                     src={details?.backdrop_path ? `${imgUrlBase}w1920_and_h1080_multi_faces${details?.backdrop_path}` : `https://www.omao.noaa.gov/sites/all/themes/noaa_omao/images/video-placeholder-640.jpg`}
                     alt={details?.title}
                />
            </div>
            <div className={styles.infoDetailPage}>
                <h1>{details?.title}</h1>
                <h3>{details?.tagline}</h3>
                <div className={styles.yv}>
                    <p className={styles.year}>( {new Date(details?.release_date).getFullYear()} )</p>
                    <p className={styles.vote}>{details?.vote_average}</p>
                </div>
                <p>{details?.overview}</p>
                <p>Жанры : {details?.genres.map((item: any) => <span> {item.name} . </span>)}</p>
            </div>
            <div className={styles.videoDetailPage}>
                <MovieVideoPage/>
            </div>
            <div className={styles.recDetailPage}>
                <p>Рекомендации.</p>
                {displayRecommendations}
            </div>
        </div>
    )
};

export default MovieDetailsPage;
