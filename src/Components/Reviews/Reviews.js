import './Reviews.css'
import React, { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';

export default function Reviews() {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
          try {
            const response = await apiClient.getAllReviewsWithProductInfo()
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
                <th>Item</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Review Description</th>
            </tr>
            </thead>
            <tbody>
            {reviews?.map((review) => (
                <tr key={review.rating}>
                <td>{review.item.title}</td>
                <td>${review.item.price}</td>
                <td>{review.rating}</td>
                <td>{review.reviewDescription}</td>
                </tr>
            ))}
            </tbody>
            </table>
        </div>
    )
}

