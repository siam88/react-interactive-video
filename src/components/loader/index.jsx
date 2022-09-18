import styles from './index.module.css';

const Loader = () => {
    return (
        <div className={styles.loaderWrapper}>
            <div className={styles.loader} >
                <div className={styles.progress}></div>
            </div>
        </div>
    );
};

export default Loader;