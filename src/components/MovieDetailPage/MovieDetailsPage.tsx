import React, {FC, useEffect} from 'react';
import styles from './MovieDetailsPage.module.scss';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchMovieDitails} from "../../app/reducers/movies.reducer";

interface MovieDetailPageProps {}

const MovieDetailsPage: FC<MovieDetailPageProps> = () => {
    const {id}: any = useParams();
    const dispatch = useDispatch();
    const details = useSelector((state:any) => state.movies.currentMovie);
    const imgUrlBase = process.env.REACT_APP_IMG_URL;

    useEffect(() => {
        dispatch(fetchMovieDitails(id));
    }, []);

    return (
  <div className={styles.MovieDetailPage}>
      <img src={`${imgUrlBase}${details?.backdrop_path}`} alt={details?.title}/>
    <h1>{details?.title}</h1>
  </div>
    )
};

export default MovieDetailsPage;
