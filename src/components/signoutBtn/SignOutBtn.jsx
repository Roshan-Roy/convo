import { auth } from "../../config/firebase"
import { signOut } from "firebase/auth"
import { useAuth } from "../../providers/AuthProvider"

const SignOutBtn = () => {
    const { setUser } = useAuth()
    const handleSignOut = async () => {
        try {
            await signOut(auth)
            setUser(null)
        } catch {
            console.log("Error")
        }
    }
    return <button onClick={handleSignOut} className="bg-gray-600 py-2 px-10 rounded-lg text-white">Logout</button>
}

export default SignOutBtn