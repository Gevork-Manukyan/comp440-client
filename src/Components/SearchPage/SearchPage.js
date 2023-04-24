import { useState } from "react";
import "./SearchPage.css"

export default function SearchPage({  }) {
    const [searchTerm, setSearchTerm] = useState('');

    function handleInputChange(event) {
      setSearchTerm(event.target.value);
    }
  
    function handleSubmit(event) {
      event.preventDefault();
    }

    return (
        <div className="SearchPage">
            <div id="searchbar">
                <form onSubmit={handleSubmit}>
                    <input type="text" value={searchTerm} onChange={handleInputChange} />
                    <button type="submit">Search</button>
                </form>
            </div>
        </div>
    )
}