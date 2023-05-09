import { useEffect, useState } from "react"
import apiClient from "../../services/apiClient"

export default function NiceReviewers() {

    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await apiClient.getNiceReviewers()
            setData(res.data)
        }

        fetchData()
    }, [])
    
    return (
        <div className="NiceReviewers table-wrapper">
            <table className="styled-table">
              <thead className='Header'>
                <tr>
                    <th>User</th>
                </tr>
              </thead>
              <tbody>
              {data?.map((item, index) => (
                  <tr key={index}>
                  <td>{item}</td>
                  </tr>
              ))}
              </tbody>
            </table>
        </div>
    )
}