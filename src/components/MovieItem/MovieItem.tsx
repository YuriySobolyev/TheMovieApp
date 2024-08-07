import React, {FC, useState} from "react";
import styles from "./MovieItem.module.scss";
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
    genres: string;
}

const imgUrlBase = process.env.REACT_APP_IMG_URL;

const MovieItem: FC<MovieItemProps> = (props: any) => {
    const {title, img, id, vote, overview, date} = props;

    const [isActive, setIsActive] = useState(false);

    const dispatch = useDispatch();

    const handleMarkFavMovies = () => {
        setIsActive(!isActive);
        dispatch(togleFavorites(props));
    };

    return (
        <div className={styles.MovieItem}>
            <div className={styles.Poster}>
                <img
                    src={
                        img
                            ? `${imgUrlBase}w500${img}`
                            : `https://cringemdb.com/img/movie-poster-placeholder.png`
                    }
                    alt={title}
                />
            </div>
            <div className={styles.info}>
                <p>{overview}</p>
            </div>
            <div className={styles.footInfo}>
                <Link to={`/movie/${id}-${title}`}><h3 className={styles.title}>{title}</h3></Link>
                <div className={styles.footInfoDateRate}>
                <p className={styles.year}>{new Date(date).getFullYear()}</p>
                <div
                    className={`${styles.favBtn} ${isActive ? styles.favBtnA : ""}`}
                    onClick={handleMarkFavMovies}
                ></div>
                <div className={styles.vote}>{vote}</div>
                </div>
            </div>
        </div>
    );
};

export default MovieItem;