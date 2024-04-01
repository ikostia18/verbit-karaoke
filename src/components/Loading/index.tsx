import React from 'react';
import styles from './Loading.module.css';

interface LoadingProps {
    label: string;
}

const Loading: React.FC<LoadingProps> = ({ label }) => {
    return <div className={styles.loadingContainer}>{label}</div>;
};

export default Loading;
