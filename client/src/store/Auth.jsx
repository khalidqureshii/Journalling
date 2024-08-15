import React from "react";
export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {

    const[token, setToken] = React.useState(localStorage.getItem("token"));
    const [user, setUser] = React.useState("");

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token", serverToken);
    };

    let isLoggedIn = !!token;

    const LogoutUser = () => {
        console.log("Logged Out");
        setToken("");
        return localStorage.removeItem("token");
    };

    const userAuthentication = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/user", {
                method: "GET",
                headers: {
                    Authorization: `${token}`,
                }
            });
            //console.log("This is the Response",response.ok);
            if (response.ok) {
                const data = await response.json();
                const userData = data.msg;
                setUser(userData);
            }
        }
        catch (err) {
            console.log("Error Fetching User Data");
        }
    }

    React.useEffect(() => {
        userAuthentication();
    }, [token]);
    
    return (<AuthContext.Provider value={{isLoggedIn, storeTokenInLS, LogoutUser, user}}>
        {children}
    </AuthContext.Provider>);
};

export const useAuth = () => {
    const authContextValue = React.useContext(AuthContext);
    if (!authContextValue) {
      throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
};

export default useAuth;