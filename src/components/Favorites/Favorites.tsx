import React, {FC, useEffect} from 'react';
import styles from './Favorites.module.scss';
import {useSelector} from "react-redux";
import MovieItem from "../MovieItem/MovieItem";

interface FavoritesProps {
}

const Favorites: FC<FavoritesProps> = () => {
    const favorites = useSelector((state: any) => state.movies.favorites);

    useEffect(() => {
    }, [])
    return (
        <div className={styles.Favorites}>
            {favorites.length ? favorites.map((film: any) => {
                return (
                    <MovieItem {...film}/>
                );
            }) : <h1>В избранном пусто ...</h1>}
        </div>
    )
};

export default Favorites;
