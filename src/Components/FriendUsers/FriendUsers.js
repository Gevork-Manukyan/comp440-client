import { useEffect, useState } from "react"
import apiClient from "../../services/apiClient"


export default function FriendUsers() {

    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await apiClient.getFriendUsers()
            setData(res.data)
        }

        fetchData()
    }, [])
    
    return (
        <div className="FriendUsers table-wrapper">
            <table className="styled-table">
              <thead className='Header'>
                <tr>
                    <th>User 1</th>
                    <th>User 2</th>
                </tr>
              </thead>
              <tbody>
              {data?.map((item, index) => (
                  <tr key={index}>
                  <td>{item.user1}</td>
                  <td>{item.user2}</td>
                  </tr>
              ))}
              </tbody>
            </table>
        </div>
    )
}