import { useEffect, useState } from "react"
import { db } from "../../config/firebase"
import { collection, where, orderBy, getDoc, doc, query, onSnapshot } from "firebase/firestore"
import { useAuth } from "../../providers/AuthProvider"
import ChatCard from "../../components/chatCard/ChatCard"
import styles from "./chatlist.module.css"
import { MdHome } from "react-icons/md"
import { NavLink } from "react-router-dom"
import { PiChatSlashBold } from "react-icons/pi"
import { RiChatSearchLine } from "react-icons/ri"
import ICard from "../../components/ICard/ICard"
import { MdErrorOutline } from "react-icons/md"
import Loader from "../../components/loader/Loader"

const ChatList = () => {
    const { user } = useAuth()
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [searchVal, setSearchVal] = useState("")

    const filteredUsers = () => {
        return users.filter(e => e.name.includes(searchVal.trim()))
    }

    useEffect(() => {
        const q = query(
            collection(db, "crooms"),
            where("users", "array-contains", user.id),
            orderBy("lastMessageAt", "desc")
        );

        const unsubscribe = onSnapshot(q, async (snapshot) => {
            try {
                const rooms = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                const otherUserIds = rooms.map(room =>
                    room.users.find(uid => uid !== user.id)
                );

                const usersDetailsSnapshots = await Promise.all(
                    otherUserIds.map(id => getDoc(doc(db, "users", id)))
                );

                const usersDetails = usersDetailsSnapshots.map(snap => ({
                    id: snap.id,
                    ...snap.data()
                }));

                const users = usersDetails.map((e, i) => ({
                    roomId: rooms[i].id,
                    lastMessage: rooms[i].lastMessage,
                    name: e.name,
                    photoURL: e.photoURL,
                    notification: rooms[i].notification[user.id]
                }))
                setUsers(users)
                setLoading(false)
            } catch (e) {
                setError(true)
                console.log(e)
            }
        }, (e) => {
            setError(true)
            console.log(e)
        })
        return () => unsubscribe()
    }, [])

    if (error) return <ICard main="An error occurred" sub="Try refreshing the page" icon={MdErrorOutline} />

    return (
        <>
            <div className={styles.topbar}>
                <div className={styles.container}>
                    <NavLink to="/"><MdHome className={styles.icon} /></NavLink>
                    <input type="text" placeholder="Search" value={searchVal} onChange={e => setSearchVal(e.target.value)} />
                </div>
            </div>
            <div className={styles.adjust}></div>
            <div className={styles.container}>
                {loading ? <div className={styles.loading_wrapper}><Loader /></div>
                    : users.length === 0 ? <ICard main="No chats yet" icon={PiChatSlashBold} height={65} />
                        : filteredUsers().length === 0 ? <ICard main="No results" icon={RiChatSearchLine} height={65} />
                            : filteredUsers().map(e => <ChatCard key={e.roomId} {...e} />)}
            </div>
        </>
    );
};

export default ChatList