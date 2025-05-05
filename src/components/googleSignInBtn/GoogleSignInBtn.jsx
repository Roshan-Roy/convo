import { db, auth, googleProvider } from "../../config/firebase"
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../providers/AuthProvider"
import { setDoc, doc } from "firebase/firestore"
import styles from "./gbtn.module.css"
import { FcGoogle } from "react-icons/fc"
import errorToast from "../../toasts/error/errorToast"

const saveUserToFirestore = async (user) => {
    try {
        const userRef = doc(db, "users", user.uid)
        const userData = {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL
        }
        await setDoc(userRef, userData, { merge: true })
    } catch (e) {
        errorToast("An error occurred")
        throw e
    }
}

const GoogleSignInBtn = () => {
    const { setUser } = useAuth()
    const navigate = useNavigate()

    const handleSignInWithGoogle = async () => {
        try {
            const { user } = await signInWithPopup(auth, googleProvider)
            await saveUserToFirestore(user)
            setUser({
                id: user.uid,
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL
            })
            navigate("/chatlist")
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div onClick={handleSignInWithGoogle} className={styles.btn}>
            <div><FcGoogle /></div>
            <span>Sign in with Google</span>
        </div>
    )
}

export default GoogleSignInBtn