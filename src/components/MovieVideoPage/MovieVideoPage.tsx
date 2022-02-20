import React, {FC, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchMovieVideo} from "../../app/reducers/movies.reducer";

interface MovieVideoPageProps {
}

const MovieVideoPage: FC<MovieVideoPageProps> = () => {
    const {id}: any = useParams();
    const dispatch = useDispatch();
    const detailsVideo = useSelector((state: any) => state.movies.currentMovieVideo);
    const videoUrl = process.env.REACT_APP_VID_EMB_URL;

    useEffect(() => {
        dispatch(fetchMovieVideo(id));
    }, [dispatch, id]);

    return (


        <div>
            <iframe width="100%" height="315"
                    src={detailsVideo?.results[0]?.key ? `${videoUrl}${detailsVideo?.results[0].key}` : `${videoUrl}yqWX86uT5jM`}
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen/>
        </div>
    )
};

export default MovieVideoPage;
