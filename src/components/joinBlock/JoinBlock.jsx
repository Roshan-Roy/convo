import { useState } from "react"
import { useAuth } from "../../providers/AuthProvider"
import { setDoc, getDoc, doc } from "firebase/firestore"
import { db } from "../../config/firebase"
import { serverTimestamp } from "firebase/firestore"
import styles from "./joinblock.module.css"

const createChatRoom = async (userOneId, userTwoId) => {
    const roomId = [userOneId, userTwoId].sort().join("_")
    try {
        const docSnap = await getDoc(doc(db, "crooms", roomId))
        if (docSnap.exists())
            alert("Room already exists")
        else {
            await setDoc(doc(db, "crooms", roomId), {
                users: [userOneId, userTwoId],
                lastMessage: "",
                lastMessageAt: serverTimestamp()
            });
            alert("Room created")
        }
    } catch (e) {
        throw e
    }
}

const JoinBlock = () => {
    const { user } = useAuth()
    const [code, setCode] = useState("")
    const handleOnChange = (e) => setCode(e.target.value)
    const handleChatBtnClick = async () => {
        const codeVal = code.trim()
        try {
            const docSnap = await getDoc(doc(db, "users", codeVal))
            if (docSnap.exists()) {
                if (docSnap.id === user.id)
                    alert("Use a different code")
                else
                    createChatRoom(user.id, docSnap.id)
            } else {
                alert("User not found")
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div>
            <input type="text" placeholder="Enter the code" value={code} onChange={handleOnChange} />
            <button onClick={handleChatBtnClick} disabled={!code.trim()}>Chat</button>
        </div>
    )
}

export default JoinBlock