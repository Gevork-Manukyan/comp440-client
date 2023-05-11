import { useState } from "react"
import apiClient from "../../services/apiClient"


export default function TwoItemsSameDay() {

    const [data, setData] = useState()
    const [inputValue1, setInputValue1] = useState("")
    const [inputValue2, setInputValue2] = useState("")


    const handleInputChange1 = (event) => {
        setInputValue1(event.target.value);
    }

    const handleInputChange2 = (event) => {
        setInputValue2(event.target.value);
    }

    const handleSubmit = async () => {
        const res = await apiClient.getTwoItemsDiffCategorySameDay(inputValue1, inputValue2)
        setData(res.data)
    }
    
    return (
        <div className="TwoItemsSameDay">
            <div className="table-wrapper" style={{marginTop: "25px"}}>
                <div className="text-input">
                    <input type="text" placeholder="Enter category 1 here" onChange={handleInputChange1} value={inputValue1} />
                    <input type="text" placeholder="Enter category 2 here" onChange={handleInputChange2} value={inputValue2} />
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
            
            <div className="table-wrapper">
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
        </div>
    )
}