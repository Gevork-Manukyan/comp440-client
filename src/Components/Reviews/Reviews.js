import './Reviews.css'
import React, { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';

export default function Reviews() {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
          try {
            const response = await apiClient.getReviewsWithDetails()
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
                <th>Number</th>
                <th>User</th>
                <th>Item</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Review Description</th>
            </tr>
            </thead>
            <tbody>
            {reviews?.map((review) => (
                <tr key={review.rating}>
                <td>{review.reviewId}</td>
                <td>{review.username}</td>
                <td>{review.title}</td>
                <td>${review.price}</td>
                <td>{review.rating}</td>
                <td>{review.reviewDescription}</td>
                </tr>
            ))}
            </tbody>
            </table>
        </div>
    )
}