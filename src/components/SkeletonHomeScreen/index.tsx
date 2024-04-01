import styles from './SkeletonHomeScreen.module.css';

const SkeletonHomeScreen = () => (
    <div className={styles.skeletonWrapper}>

        <div className={styles.skeletonFirst}></div>

        {[...Array(5)].map((_, i) => (
            <div key={i} className={styles.skeletonSecond}></div>
        ))}

        {[...Array(3)].map((_, i) => (
            <div key={i} className={styles.skeletonThird}></div>
        ))}
        
    </div>
);

export default SkeletonHomeScreen;
