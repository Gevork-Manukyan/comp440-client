import { useState } from "react"
import apiClient from "../../services/apiClient"


export default function ExcellentGoodItem() {

    const [data, setData] = useState()
    const [inputValue, setInputValue] = useState("")

    const handleSubmit = async () => {
        const res = await apiClient.getExcellentGoodItemsForUser(inputValue)
        setData(res.data)
    }

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }
    
    return (
        <div className="ExcellentGoodItem">

            <div className="table-wrapper" style={{marginTop: "25px"}}>
                <div className="text-input">
                    <input type="text" placeholder="Enter text here" onChange={handleInputChange} value={inputValue} />
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>

            <div className="table-wrapper">
                <table className="styled-table">
                    <thead className='Header'>
                        <tr>
                            <th>User</th>
                            <th>Item</th>
                            <th>description</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data?.map((item) => (
                        <tr key={item.id}>
                        <td>{item.userUsername}</td>
                        <td>{item.title}</td>
                        <td>{item.description}</td>
                        <td>${item.price}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}