import * as React from 'react';
import { Link } from 'ice';
import styles from './index.module.css';

export interface ILogoProps {
  image?: string;
  text?: string;
  url?: string;
}

export default function Logo({ image, text, url }: ILogoProps) {
  return (
    <div className="logo">
      <Link
        className={styles.logo}
        to={url || '/'}
      >
        {image && <img
          alt="logo"
          src={image}
        />}

        <span>{text}</span>
      </Link>
    </div>
  );
}
