import { createContext, useContext, useState } from "react";

const AuthContext = createContext()

export function AuthProvider({children}){

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  function onLogin(res){
    localStorage.setItem("user", JSON.stringify(res))
    setUser(res)
  }

  function onLogout (res) {
    onLogin(res)
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
  return useContext(AuthContext)
}