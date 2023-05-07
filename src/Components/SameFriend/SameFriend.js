import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";
import "./SameFriend.css"


export default function SameFriend() {

    const [data, setData] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [selectedOption1, setSelectedOption1] = useState('');
    const [selectedOption2, setSelectedOption2] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await apiClient.getAllUsers()
            setAllUsers(users.data)
            setSelectedOption1(users.data[0])
            setSelectedOption2(users.data[0])
        }

        fetchUsers()
    }, [])

    const handleChange1 = (event) => {
      setSelectedOption1(event.target.value);
    }

    const handleChange2 = (event) => {
        setSelectedOption2(event.target.value);
    }

    const handleSubmit = async () => {
        const res = await apiClient.getSameFriends(selectedOption1, selectedOption2)
        setData(res.data)
    }
    
    return (
        <div className="SameFriend">
            <div className="table-wrapper">
                <div className="menu-buttons">
                    <select value={selectedOption1} onChange={handleChange1}>
                        {allUsers?.map((user, index) => (
                            <option key={index} value={user}>{user}</option>
                        ))}
                    </select>
                    <select value={selectedOption2} onChange={handleChange2}>
                        {allUsers?.map((user, index) => (
                            <option key={index} value={user}>{user}</option>
                        ))}
                    </select>
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
            <div className="table-wrapper">
                <table className="styled-table">
                    <thead className='Header'>
                        <tr>
                            <th>User</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data?.map((user, index) => (
                        <tr key={index}>
                        <td>{user}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}