import { useAuth } from "../../providers/AuthProvider"
import { useNavigate } from "react-router-dom"
import SignOutBtn from "../../components/signoutBtn/SignOutBtn"
import GoogleSignInBtn from "../../components/googleSignInBtn/GoogleSignInBtn"
import JoinModal from "../../components/joinModal/JoinModal"
import styles from "./home.module.css"

const Home = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  if (user) return <SignOutBtn />
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>
        <span>C</span>
      </div>
      <GoogleSignInBtn />
    </div>
  )
}

export default Home