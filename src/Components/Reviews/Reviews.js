import './Reviews.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Reviews() {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
          try {
            const response = await axios.get('http://localhost:3003/reviews');
            console.log('reviews fetched:', response.data);
            setReviews(response.data);
          } catch (error) {
            console.error('Error fetching items:', error);
          }
        };
        fetchItems();
      }, []);

    return (
        <div className='Reviews'>
            <table className="styled-table">
            <thead className='Header'>
            <tr>
                <th>Rating</th>
                <th>Review Description</th>
            </tr>
            </thead>
            <tbody>
            {reviews.map((review) => (
                <tr key={review.rating}>
                <td>{review.rating}</td>
                <td>{review.reviewDescription}</td>
                </tr>
            ))}
            </tbody>
            </table>
        </div>
    )
}
