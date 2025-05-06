import { useAuth } from "../../providers/AuthProvider"
import SignOutBtn from "../../components/signoutBtn/SignOutBtn"
import GoogleSignInBtn from "../../components/googleSignInBtn/GoogleSignInBtn"
import JoinBlock from "../../components/joinBlock/JoinBlock"
import styles from "./home.module.css"
import CodeBlock from "../../components/codeBlock/CodeBlock"
import { NavLink } from "react-router-dom"

const Home = () => {
  const { user } = useAuth()
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>
        <span>C</span>
      </div>
      {user ? <>
        <div className={styles.logged_container}>
          <CodeBlock code={user.id} />
          <JoinBlock />
          <NavLink to="/chatlist" className={styles.link}>All Chats</NavLink>
        </div>
        <SignOutBtn />
      </> : <GoogleSignInBtn />}
    </div>
  )
}

export default Home