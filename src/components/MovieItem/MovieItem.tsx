import React, {FC} from 'react';
import styles from './MovieItem.module.scss';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {togleFavorites} from "../../app/reducers/movies.reducer";

interface MovieItemProps {
    title: string;
    img: string;
    id: string;
    overview: string;
    vote: number;
    date: string;
}

const imgUrlBase = process.env.REACT_APP_IMG_URL;


const MovieItem: FC<MovieItemProps> = (props:any) => {
    const {
        title,
        img,
        id,
        vote,
        overview,
        date
    } = props;

    const dispatch = useDispatch();


    const handleMarkFavMovies = () => {
        dispatch(togleFavorites(props));
    };



    return (
        <div className={styles.MovieItem}>
            {/*<div className={styles.Poster}><img src={`${imgUrlBase}${img}`} alt={`Poster to the ${title}`}/></div>*/}
            <div className={styles.Poster}><img src={`${imgUrlBase}${img}`} alt={`Poster to the ${title}`}/></div>
            <div className={styles.info}>
                <p>{overview}</p>
            </div>
            <div className={styles.footInfo}>
                <Link to={`/movie/${id}-${title}`}><h3 className={styles.title}>{title}</h3></Link>
                <div className={styles.footInfoDateRate}>
                    <p className={styles.year}>{new Date(date).getFullYear()}</p>
                    <div className={styles.favBtn} onClick={handleMarkFavMovies}/>
                    <div className={styles.vote}>{vote}</div>
                </div>
            </div>
            {/*<div className={styles.favBtn} onClick={handleMarkFavMovies}/>*/}
        </div>
    );
}
export default MovieItem;
