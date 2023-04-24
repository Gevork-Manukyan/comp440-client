import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InsertItem from '../InsertItem/InsertItem';

const SearchPage = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:3003/items');
        console.log('Items fetched:', response.data);
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const fetchFilteredItems = async () => {
      try {
        let response;
        if (!search.trim()) {
          response = await axios.get('http://localhost:3003/items');
        } else {
          response = await axios.get(`http://localhost:3003/items/search?category_startswith=${search}`);
        }
        console.log('Search results:', response.data);
        setItems(response.data);
      } catch (error) {
        console.error('Error searching items:', error);
      }
    };
    fetchFilteredItems();
  }, [search]);
  

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.title}>
                <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.category}</td>
              <td>${item.price}</td>
              <button>Review</button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchPage;
