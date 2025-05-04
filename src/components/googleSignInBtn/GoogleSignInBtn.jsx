import { db, auth, googleProvider } from "../../config/firebase"
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../providers/AuthProvider"
import { setDoc, doc } from "firebase/firestore"

const saveUserToFirestore = async (user) => {
    const userRef = doc(db, "users", user.uid)
    const userData = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL
    }
    try {
        await setDoc(userRef, userData, { merge: true })
    } catch {
        throw new Error("Error saving user data to Firestore")
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
            console.log("Error : ", e)
        }
    }
    return (
        <button onClick={handleSignInWithGoogle}>Sign in with google</button>
    )
}

export default GoogleSignInBtn