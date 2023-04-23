import apiClient from "../../services/apiClient"
import "./InitButton.css"
import Button from '@mui/material/Button';


export default function InitButton () {

    const onInitilize = async () => {
        await apiClient.initDB()
    }

    return (
        <div className="InitButton">
            <Button variant="contained" onClick={onInitilize}>Initialize Database</Button>
        </div>
    )
}