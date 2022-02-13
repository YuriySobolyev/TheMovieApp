import React, {FC} from 'react';
import styles from './FilmLoader.module.scss';
import {css} from "@emotion/react";
import BarLoader from "react-spinners/BarLoader";

const override = css`
  border-radius: 5px;
`;

const FilmLoader: FC = () => {

        return (
            <div className={styles.FilmLoader}>
                <BarLoader color={"#d9d2d2"} loading={true} css={override} height={10} width={200} />
            </div>
        )
    }
;

export default FilmLoader;
