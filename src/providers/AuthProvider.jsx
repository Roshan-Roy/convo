import { createContext, useContext, useEffect } from 'react'
import { useState } from 'react'
import { auth, db } from '../config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { getDoc, doc } from 'firebase/firestore'

export const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [initialLoadDone, setInitialLoadDone] = useState(false)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!initialLoadDone) {
                if (user) {
                    try {
                        const docSnap = await getDoc(doc(db, "users", user.uid))
                        if (docSnap.exists())
                            setUser({
                                id: user.uid,
                                name: user.displayName,
                                email: user.email,
                                photoURL: user.photoURL
                            })
                    } catch (e) {
                        console.log("Error : ", e)
                    }
                }
                setInitialLoadDone(true)
            }
        })
        return () => unsubscribe()
    }, [initialLoadDone])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {initialLoadDone && children}
        </AuthContext.Provider>
    )
}
