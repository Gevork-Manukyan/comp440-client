import { useState } from "react"
import apiClient from "../../services/apiClient"
import "./InitButton.css"


export default function InitButton () {

    const onInitilize = async () => {
        await apiClient.initDB()
    }

    return (
        <div className="InitButton">
            <button onClick={onInitilize}>Initialize Database</button>
        </div>
    )
}