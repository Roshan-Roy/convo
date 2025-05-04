import { useAuth } from "../../providers/AuthProvider"

const Bubble = ({
    message,
    senderId,
    sendAt
}) => {
    const { user: { id } } = useAuth()
    return <div style={{
        backgroundColor: "gray",
        color: "white",
        padding: "10px",
        borderRadius: "10px",
        display: "inline",
        alignSelf: id === senderId ? "flex-end" : "flex-start"
    }}>{message}</div>
}

export default Bubble