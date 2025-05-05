import { useAuth } from "../../providers/AuthProvider"
import { useNavigate } from "react-router-dom"
import SignOutBtn from "../../components/signoutBtn/SignOutBtn"
import GoogleSignInBtn from "../../components/googleSignInBtn/GoogleSignInBtn"
import JoinBlock from "../../components/joinBlock/JoinBlock"
import styles from "./home.module.css"
import CodeBlock from "../../components/codeBlock/CodeBlock"

const Home = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>
        <span>C</span>
      </div>
      {user ? <div>
        <CodeBlock code={user.id} />
        <JoinBlock />
        <SignOutBtn />
      </div> : <GoogleSignInBtn />}
    </div>
  )
}

export default Home