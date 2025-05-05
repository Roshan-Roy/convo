import toast from "react-hot-toast"
import styles from "./errortoast.module.css"
import { MdErrorOutline } from "react-icons/md";

const ToastContent = ({ message }) => {
    return (
        <div className={styles.container}>
            <MdErrorOutline className={styles.icon} />
            <span>{message}</span>
        </div>
    )
}

const errorToast = (message) => {
    toast.custom(<ToastContent message={message} />)
}


export default errorToast