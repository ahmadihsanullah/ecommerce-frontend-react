import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Mainpage = ({children}) => {
    return (
       <div>
            <Header />
            <Sidebar />
            <div>
                {children}
            </div>
       </div>
    )
}

export default Mainpage;