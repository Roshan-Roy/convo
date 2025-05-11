import styles from "./chatTopbar.module.css"
import { FaArrowLeft } from "react-icons/fa"
import { NavLink } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../config/firebase"
import { useEffect, useState } from "react"

const ChatTopBar = ({ userId, setError }) => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const docRef = doc(db, "users", userId)
    const getUser = async () => {
        try {
            const userData = await getDoc(docRef)
            setUser(userData.data())
            setLoading(false)
        } catch (e) {
            setError(true)
            console.log(e)
        }
    }
    useEffect(() => {
        getUser()
    }, [])
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div>
                        {loading ?
                            <>
                                <div className={styles.img_skeleton}></div>
                                <div className={styles.name_skeleton}></div>
                            </>
                            : <>
                                <img src={user.photoURL} alt={user.name} referrerPolicy="no-referrer" />
                                <span>{user.name}</span>
                            </>
                        }
                    </div>
                    <NavLink to="/chatlist"><FaArrowLeft className={styles.icon} /></NavLink>
                </div>
            </div>
        </>
    )
}

export default ChatTopBar