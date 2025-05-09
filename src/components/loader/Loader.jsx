import styles from "./loader.module.css"

const Loader = ({
    width = 65,
    color = "#9F33FF"
}) => {
    return (
        <div className={styles.loader} style={{
            width: `${width}px`,
            "--_g": `no-repeat radial-gradient(circle closest-side, ${color} 90%, #0000)`
        }}></div>
    )
}

export default Loader