// Here we provide the initial value of the context
import React from "react";

const UserContext =  React.createContext({
    currentUser: {},
    setCurrentUser: () => {}
});

export default UserContext;
