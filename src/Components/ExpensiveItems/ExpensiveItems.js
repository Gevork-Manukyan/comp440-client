import { useEffect, useState } from "react"
import apiClient from "../../services/apiClient"


export default function ExpensiveItems() {

    const [data, setData] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const res = await apiClient.getExpensiveItemsByCategory()
            setData(res.data)
        }

        fetchData()
    }, [])
   
    return (
        <div className="ExpensiveItems table-wrapper">
            <table className="styled-table">
              <thead className='Header'>
                <tr>
                    <th>Category</th>
                    <th>Item</th>
                    <th>Price</th>
                </tr>
              </thead>
              <tbody>
              {data?.map((item, index) => (
                  <tr key={index}>
                  <td>{item.category}</td>
                  <td>{item.item}</td>
                  <td>${item.price}</td>
                  </tr>
              ))}
              </tbody>
            </table>
        </div>
    )
}