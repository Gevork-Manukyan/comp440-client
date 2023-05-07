import { useEffect, useState } from "react"
import apiClient from "../../services/apiClient"


export default function ExcellentGoodItem() {

    const [data, setData] = useState()
    const [inputValue, setInputValue] = useState("")

    const handleSubmit = async () => {
        // const res = await apiClient.getExcellentGoodItemsForUser(inputValue)
        const res = await apiClient.getExcellentGoodItemsForUser("BillyDoe123")
        setData(res.data)
        console.log(res.data)
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
                {/* <table className="styled-table">
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
                </table> */}
            </div>
        </div>
    )
}