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
  const [currentItem, setCurrentItem] = useState()
  const [rating, setRating] = useState('');
  const [reviewDescription, setReviewDescription] = useState('');
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await apiClient.getAllItems()
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    if (isSearchSubmitted) {
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
      setIsSearchSubmitted(false);
    }
  }, [search, isSearchSubmitted]);
  
  const handleOpen = () => {
    setOpen(true)
    setErrorMessage("")
  };

  async function handleSubmit() {

    const result = await apiClient.postReview({
      rating: rating,
      reviewDescription: reviewDescription,
      itemId: currentItem.id
    })

    if (result.data === null && result.error !== null) {
      setErrorMessage(result.error)
      return
    }

    setRating('')
    setReviewDescription('')
    handleClose()
  }

  function handleReviewClick(item) {
    handleOpen()
    setCurrentItem(item)
  }

  function handleReset() {
    setSearch('');
    apiClient.getAllItems()
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  

  return (
    <div className='Search'>
      <form onSubmit={(e) => { e.preventDefault(); setIsSearchSubmitted(true); }}>
        <input
          className='Search-input'
          placeholder='Search by category'
          type="text"
          id="category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          className='Form-Button'
          variant='contained' 
          type="submit" 
          size='small'
          >
            Search
          </Button>
        <Button 
          className='Form-Button'
          variant='contained' 
          color="error" 
          type="reset" 
          size='small'
          onClick={handleReset}
          >
            Reset
          </Button>
      </form>
      <table className="styled-table">
        <thead className='Header'>
          <tr>
            <th>ID</th>
            <th>User</th>
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
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.userUsername}</td>
              <td>{item.datePosted}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.categories}</td>
              <td>${item.price}</td>
              <td><button onClick={() => handleReviewClick(item)}>Review</button></td>
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
            <Typography className='error-message'>
              {errorMessage}
            </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default SearchPage;
