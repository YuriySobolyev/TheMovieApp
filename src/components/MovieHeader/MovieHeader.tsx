import React, {FC, useRef} from 'react';
import styles from './MovieHeader.module.scss';
import {Link} from "react-router-dom";
import {searchMovies} from "../../app/reducers/movies.reducer";
import {useDispatch} from "react-redux";

interface MovieHeaderProps {
}

const MovieHeader: FC<MovieHeaderProps> = () => {
    const inputRef: any = useRef(null);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(searchMovies(inputRef?.current?.value));
    }

    return (
        <div className={styles.MovieHeader}>
            <div className={styles.NavBar}>
                <div className={styles.NavBrand}><Link to={"/"}/></div>

                <Link to={"/"}>Главная</Link>
                <Link to={"/favorites"}>Избранное</Link>
            </div>
            <div className={styles.Search}>
                <input ref={inputRef} type="text"/>
                <button onClick={handleClick}/>
            </div>
        </div>
    )
};

export default MovieHeader;
