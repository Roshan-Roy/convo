import { useState } from "react"
import { useAuth } from "../../providers/AuthProvider"
import { setDoc, getDoc, doc } from "firebase/firestore"
import { db } from "../../config/firebase"
import { serverTimestamp } from "firebase/firestore"
import styles from "./joinblock.module.css"
import { useNavigate } from "react-router-dom"
import errorToast from "../../toasts/error/errorToast"
import StartChatLoader from "../loaders/StartChatLoader/StartChatLoader"

const JoinBlock = () => {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [code, setCode] = useState("")
    const [loading, setLoading] = useState(false)

    const handleOnChange = (e) => setCode(e.target.value)

    const createChatRoom = async (userOneId, userTwoId) => {
        const roomId = [userOneId, userTwoId].sort().join("_")
        try {
            const docSnap = await getDoc(doc(db, "crooms", roomId))
            if (docSnap.exists())
                navigate(`chatlist/${roomId}`)
            else {
                await setDoc(doc(db, "crooms", roomId), {
                    users: [userOneId, userTwoId],
                    notification: {
                        [userOneId]: false,
                        [userTwoId]: false
                    },
                    lastMessage: "",
                    lastMessageAt: serverTimestamp()
                });
                navigate(`chatlist/${roomId}`)
            }
        } catch (e) {
            throw e
        }
    }

    const handleChatBtnClick = async () => {
        setLoading(true)
        const codeVal = code.trim()
        try {
            const docSnap = await getDoc(doc(db, "users", codeVal))
            if (docSnap.exists()) {
                if (docSnap.id === user.id) {
                    errorToast("Invalid code")
                    setLoading(false)
                } else {
                    createChatRoom(user.id, docSnap.id)
                }
            } else {
                errorToast("Invalid code")
                setLoading(false)
            }
        } catch (e) {
            errorToast("An error occurred")
            setLoading(false)
            console.log(e)
        }
    }

    return (
        <div className={styles.container}>
            <input type="text" placeholder="Enter chat code" value={code} onChange={handleOnChange} />
            <div onClick={() => { if (code.trim() && !loading) handleChatBtnClick() }} className={styles.btn}>{loading ? <StartChatLoader /> : "Start Chat"}</div>
        </div>
    )
}

export default JoinBlock