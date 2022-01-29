import React from 'react';
import { FiLoader } from 'react-icons/fi';

import styles from '../styles/components/Loader.module.css';

interface Props {
    size?: string | number;
    position?: 'center';
}

function Loader({ size, position }: Props) {
    return (
        <div
            className={`${styles.container} ${
                position === 'center' ? styles.centered : ''
            }`}
        >
            <FiLoader
                className={styles.loader}
                color="currentColor"
                size={size}
            />
        </div>
    );
}

export default Loader;
