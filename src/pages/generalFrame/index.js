import React from 'react'
import Sidebar from "./Sidebar";
import Header from "../../layout/header";

const GeneralFrame = () => {
    return (
        <div className="frame">
            <Header className="frame-top" />
            <Sidebar />
        </div>
    )
}
export default GeneralFrame;