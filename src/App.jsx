import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/home/Home"
import { AuthProvider } from "./providers/AuthProvider"
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute"
import ChatList from "./pages/chatlist/ChatList"
import Chat from "./pages/chat/Chat"
import { Toaster } from "react-hot-toast"

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "chatlist",
      element: <ProtectedRoute><ChatList /></ProtectedRoute>
    },
    {
      path: "chatlist/:id",
      element: <ProtectedRoute><Chat /></ProtectedRoute>
    }
  ])
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster/>
    </AuthProvider>
  )
}

export default App