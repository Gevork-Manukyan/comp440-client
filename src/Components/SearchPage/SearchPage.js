import React, { useState, useEffect } from 'react';
import './SearchPage.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal'
import { FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import { TextField } from '@mui/material';
import apiClient from '../../services/apiClient';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  padding: 3,
};

const SearchPage = () => {
  const [items, setItems] = useState([]);
  const [reviewCount, setReviewCount] = useState(1);
  const [rating, setRating] = useState('');
  const [reviewDescription, setReviewDescription] = useState('');
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await apiClient.getAllItems()
        // console.log("ITEMS: ", items)
        // console.log("RESPONSE: ", response.data)
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
          response = await apiClient.getAllItems();
        } else {
          response = await apiClient.searchItem(search);
        }
        setItems(response.data);
      } catch (error) {
        console.error('Error searching items:', error);
      }
    };
    fetchFilteredItems();
  }, [search]);

  function handleSubmit(event) {
    const data = {
      rating: rating,
      reviewDescription: reviewDescription
    }

    console.log(data);
  }

  function handleCount() {
    if (reviewCount > 3) {
      alert('You have already submitted 3 reviews.');
      return;
    } else {
      setReviewCount(reviewCount + 1);
      handleOpen();
    }
  }
  

  return (
    <div className='Search'>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          className='Search-input'
          placeholder='Search by category'
          type="text"
          id="category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <table className="styled-table">
        <thead className='Header'>
          <tr>
            <th>ID</th>
            <th>Date Posted</th>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items?.map((item) => (
            <tr key={item.title}>
              <td>{item.id}</td>
              <td>{item.datePosted}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.category}</td>
              <td>${item.price}</td>
              <td><button onClick={handleCount}>Review</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h5" component="h">
                How did you like this item?:
            </Typography>
            <Box height={10} />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Rating</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={rating}
                label="Age"
                onChange={(e) => setRating(e.target.value)}
              >
                <MenuItem value={"Excellent"}>Excellent</MenuItem>
                <MenuItem value={"Good"}>Good</MenuItem>
                <MenuItem value={"Fair"}>Fair</MenuItem>
                <MenuItem value={"Poor"}>Poor</MenuItem>
              </Select>
            </FormControl>
            <Box height={10} />
            <TextField id= "TextField" 
              label="Description"
              value={reviewDescription}
              onChange={(e) => setReviewDescription(e.target.value)} />
            <Box height={10} />
            <Button variant='contained' onClick={handleSubmit}>Submit</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default SearchPage;
