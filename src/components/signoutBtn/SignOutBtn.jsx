import { auth } from "../../config/firebase"
import { signOut } from "firebase/auth"
import { useAuth } from "../../providers/AuthProvider"
import errorToast from "../../toasts/error/errorToast"
import { RiLogoutCircleRLine } from "react-icons/ri"
import styles from "./signoutbtn.module.css"

const SignOutBtn = () => {
    const { setUser } = useAuth()
    const handleSignOut = async () => {
        try {
            await signOut(auth)
            setUser(null)
        } catch (e) {
            errorToast("An error occurred")
            console.log(e)
        }
    }
    return <div onClick={handleSignOut} className={styles.btn}>
        <span className={styles.text}>Logout</span>
        <RiLogoutCircleRLine className={styles.icon} />
    </div>
}

export default SignOutBtn