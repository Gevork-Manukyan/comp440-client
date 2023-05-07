import { useEffect, useState } from "react"
import apiClient from "../../services/apiClient"

export default function PopularUser() {
    const [data, setData] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const res = await apiClient.getPopularUsers()
            setData(res.data)
        }

        fetchData()
    }, [])

    return (
        <div className="PopularUser table-wrapper">
            <table className="styled-table">
              <thead className='Header'>
                <tr>
                    <th>User</th>
                    <th>Item Count</th>
                </tr>
              </thead>
              <tbody>
              {data?.map((item, index) => (
                  <tr key={index}>
                  <td>{item.username}</td>
                  <td>{item.total_items}</td>
                  </tr>
              ))}
              </tbody>
            </table>
        </div>
    )
}