import React, {FC} from 'react';
import styles from './MovieHeader.module.scss';
import {Link} from "react-router-dom";
import {searchMovies} from "../../app/reducers/movies.reducer";
import {useDispatch} from "react-redux";

interface MovieHeaderProps {
}

const MovieHeader: FC<MovieHeaderProps> = () => {
    const dispatch = useDispatch();
    const search = (event: any) => {
        const query = event.target.value;
        dispatch(searchMovies({query, page: 1}));
    };

    return (
        <div className={styles.MovieHeader}>
            <div className={styles.Header}>
                <div className={styles.NavBar}>
                    <Link className={styles.NavBrand} to={"/"}/>
                    <Link to={"/"}>Главная</Link>
                    <Link to={"/favorites"}>Избранное</Link>
                    <input type="text" onInput={search}/>
                </div>
            </div>
        </div>
    )
};

export default MovieHeader;
