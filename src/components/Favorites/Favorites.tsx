import React, { FC } from 'react';
import styles from './Favorites.module.scss';

interface FavoritesProps {}

const Favorites: FC<FavoritesProps> = () => {
  return (
  <div className={styles.Favorites}>
    Favorites Component
  </div>
  )
};

export default Favorites;
