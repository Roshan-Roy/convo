import { useEffect, useState } from "react"
import { collection, addDoc, onSnapshot, updateDoc, serverTimestamp, query, orderBy, doc, getDoc } from "firebase/firestore"
import { db } from "../../config/firebase"
import { useAuth } from "../../providers/AuthProvider"
import Bubble from "../../components/bubble/Bubble"
import { useParams } from "react-router-dom"

const Chat = () => {
  const { id } = useParams()

  const { user } = useAuth()
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [btnLoading, setBtnLoading] = useState(false)

  const [pageLoading, setPageLoading] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [roomExists, setRoomExists] = useState(false)

  const messagesSubCollectionRef = collection(db, "crooms", id, "messages")
  const messagesQuery = query(messagesSubCollectionRef, orderBy("sentAt", "asc"))
  const croomRef = doc(db, "crooms", id)

  const getOtherUserId = (roomId, currentUserId) => {
    const [id1, id2] = roomId.split("_");
    return id1 === currentUserId ? id2 : id1;
  };

  const handleSendBtn = async () => {
    try {
      setBtnLoading(true)
      await addDoc(messagesSubCollectionRef, {
        message: newMessage,
        senderId: user.id,
        sentAt: serverTimestamp()
      })
      const otherUserId = getOtherUserId(id, user.id)
      await updateDoc(croomRef, {
        [`notification.${otherUserId}`]: true,
        lastMessage: newMessage,
        lastMessageAt: serverTimestamp()
      })
      setNewMessage("")
    } catch (e) {
      console.log("An error occurred", e)
    } finally {
      setBtnLoading(false)
    }
  }

  const handleInputChange = (e) => setNewMessage(e.target.value)

  const updateNotification = async () => {
    try {
      await updateDoc(croomRef, {
        [`notification.${user.id}`]: false,
      })
    } catch (e) {
      setError(true)
      console.log(e)
    }
  }

  useEffect(() => {
    const checkRoomExists = async () => {
      try {
        const roomSnap = await getDoc(croomRef)
        if (roomSnap.exists()) {
          setRoomExists(true)
        }
      } catch (e) {
        console.log("Error : ", e)
        setError(true)
      } finally {
        setPageLoading(false)
      }
    };
    checkRoomExists();
  }, []);

  useEffect(() => {
    if (!roomExists) return
    updateNotification()
    const unsubscribe = onSnapshot(
      messagesQuery,
      (snapshot) => {
        const messages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setMessages(messages)
        setLoading(false)
      },
      (error) => {
        console.log("An error occurred", error);
        setError(true)
      }
    );

    return () => {
      updateNotification()
      unsubscribe()
    }
  }, [roomExists])

  if (error) return <p>An error occurred.</p>

  if (pageLoading) return <p>Page is loading...</p>

  if (!roomExists) return <p>Room not found.</p>

  return (
    <div>
      <input
        type="text"
        placeholder="Message"
        value={newMessage}
        onChange={handleInputChange}
      />
      <button onClick={handleSendBtn} disabled={btnLoading || !newMessage}>
        {btnLoading ? "Sending..." : "Send"}
      </button>

      <div
        style={{
          margin: "10px auto",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "50%",
        }}
      >
        {loading ? (
          <p>Loading messages...</p>
        ) : messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((e) => <Bubble key={e.id} {...e} />)
        )}
      </div>
    </div>
  );
}

export default Chat