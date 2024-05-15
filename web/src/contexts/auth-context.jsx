import { createContext, useContext, useState } from "react";
import { logout } from "../services/users-service";
import { Navigate } from "react-router-dom";

const AuthContext = createContext()

export function AuthProvider({children}){

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));



  function onLogin(res){
    localStorage.setItem("user", JSON.stringify(res))
    setUser(res)
  }

  function onLogout () {
    logout().then(() => {
      localStorage.removeItem("user")
      setUser(null);
    })
    
  }

  const value = {
    user,
    onLogin,
    onLogout,
  }

  return <AuthContext.Provider value={value}> {/* value is what will be passed to any child component*/}
          {children}
        </AuthContext.Provider>

}

export function useAuthContext(){
  // console.log(useContext(AuthContext).user)
  return useContext(AuthContext)
}

