import * as React from 'react';
import { Icon } from '@alifd/next';
import { Link } from 'ice';
import styles from './index.module.css';

function SolutionLink() {
  return (
    <div className={styles.link}>
      <Link
        title="官方推荐方案"
        to="/solution"
      >
        <Icon type="smile" />
      </Link>
    </div>
  );
}

export default SolutionLink;
