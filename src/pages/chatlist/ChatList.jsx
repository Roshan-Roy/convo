import { useEffect, useState } from "react"
import { db } from "../../config/firebase"
import { collection, where, orderBy, getDoc, doc, query, onSnapshot } from "firebase/firestore"
import { useAuth } from "../../providers/AuthProvider"
import ChatCard from "../../components/chatCard/ChatCard"

const ChatList = () => {
    const { user } = useAuth()
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

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
                }));

                setUsers(users)

            } catch (error) {
                console.error("Error :", error);
            } finally {
                setLoading(false)
            }
        }, (e) => {
            setLoading(false)
            console.log("Error : ", e)
        })
        return () => unsubscribe()
    }, [])

    return (
        <div>
            {loading ? <p>Loading...</p> : users.map(e => <ChatCard key={e.roomId} {...e} />)}
        </div>
    );
};

export default ChatList