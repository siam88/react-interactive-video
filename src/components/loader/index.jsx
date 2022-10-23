import styles from './index.module.css';

const Loader = () => {
    return (

        <div className={styles.loaderWrapper} style={{ height: "100%", width: "100%" }}>
            <div className="d-flex justify-content-center " style={{ marginTop: "25%" }} >

                <div className={styles.progress} ></div>


            </div>
        </div>
    );
};

export default Loader;