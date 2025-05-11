import { useEffect, useState, useRef } from "react"
import { collection, addDoc, onSnapshot, updateDoc, serverTimestamp, query, orderBy, doc, getDoc } from "firebase/firestore"
import { db } from "../../config/firebase"
import { useAuth } from "../../providers/AuthProvider"
import Bubble from "../../components/bubble/Bubble"
import { useParams } from "react-router-dom"
import styles from "./chat.module.css"
import ChatTopBar from "../../components/chatTopBar/ChatTopBar"
import { IoSend } from "react-icons/io5"
import Loader from "../../components/loader/Loader"
import ICard from "../../components/ICard/ICard"
import { MdErrorOutline } from "react-icons/md"
import { MdOutlineDoNotDisturb } from "react-icons/md"
import { LuMessagesSquare } from "react-icons/lu"

const Chat = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [btnLoading, setBtnLoading] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  const [pageLoading, setPageLoading] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [chatExists, setChatExists] = useState(false)

  const messagesSubCollectionRef = collection(db, "crooms", id, "messages")
  const messagesQuery = query(messagesSubCollectionRef, orderBy("sentAt", "asc"))
  const croomRef = doc(db, "crooms", id)

  const getOtherUserId = (roomId, currentUserId) => {
    const [id1, id2] = roomId.split("_");
    return id1 === currentUserId ? id2 : id1;
  };
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView()
  }
  const handleSendBtn = async () => {
    try {
      setBtnLoading(true)
      setNewMessage("")
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100);
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
    } catch (e) {
      setError(true)
      console.log(e)
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
    const checkChatExists = async () => {
      try {
        const chatSnap = await getDoc(croomRef)
        if (chatSnap.exists()) {
          setChatExists(true)
        }
      } catch (e) {
        console.log("Error : ", e)
        setError(true)
      } finally {
        setPageLoading(false)
      }
    };
    checkChatExists();
  }, []);

  useEffect(() => {
    if (!chatExists) return
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
  }, [chatExists])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  if (error) return <ICard main="An error occurred" sub="Try refeshing the page" icon={MdErrorOutline} />

  if (pageLoading) return <div className={styles.page_loader}><Loader /></div>

  if (!chatExists) return <ICard main="Chat not found" icon={MdOutlineDoNotDisturb} />

  return (
    <>
      <ChatTopBar userId={getOtherUserId(id, user.id)} setError={setError} />
      {loading ? <div className={styles.chat_loader}><Loader /></div>
        : <>
          {messages.length === 0 ? <ICard main="No messages yet" icon={LuMessagesSquare} height={125} />
            : <div className={styles.message_wrapper}>
              <div className={styles.message_container}>
                {messages.map((e) => <Bubble key={e.id} {...e} />)}
                <span ref={bottomRef}></span>
              </div>
            </div>}
          <div className={styles.input_wrapper}>
            <div className={styles.input_container}>
              <input
                type="text"
                placeholder="Message"
                value={newMessage}
                onChange={handleInputChange}
                ref={inputRef}
              />
              <button onClick={handleSendBtn} disabled={btnLoading || !newMessage} className={styles.send_btn}>
                {btnLoading ? <Loader width={18} color="#fff" /> : <IoSend className={styles.icon} />}
              </button>
            </div>
          </div>
        </>
      }
    </>
  )
}

export default Chat