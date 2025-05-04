import { useAuth } from "../../providers/AuthProvider"
import { useNavigate } from "react-router-dom"
import SignOutBtn from "../../components/signoutBtn/SignOutBtn"
import GoogleSignInBtn from "../../components/googleSignInBtn/GoogleSignInBtn"
import JoinModal from "../../components/joinModal/JoinModal"

const Home = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  return (
    <div>
      <span className="text-6xl">To do app</span>
      {<p>Your Code : {user?.id}</p>}
      {user && <JoinModal />}
      {user && <button onClick={() => navigate("/chatlist")}>Chat App</button>}
      {user ? <SignOutBtn /> : <GoogleSignInBtn />}
    </div>
  )
}

export default Home