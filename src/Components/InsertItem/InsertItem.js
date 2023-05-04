import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { TextField } from '@mui/material';
import apiClient from "../../services/apiClient"
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

export default function InsertItem(props) {

  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    setOpen(true)
    setErrorMessage("")
  };

  const [titleInput, setTitleInput] = useState("")
  const [descriptionInput, setDiscriptionInput] = useState("")
  const [categoryInput, setCategoryInput] = useState("")
  const [priceInput, setPriceInput] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  async function handleSubmit() {

    // Check inputs
    if (!Number.isFinite(Number(priceInput))) return

    const categories_array = categoryInput.split(",")
    categories_array.forEach(e => e.trim())

    // Post item to DB
    const result = await apiClient.postItem({
      title: titleInput,
      description: descriptionInput,
      category: categories_array,
      price: Number(priceInput)
    })

    if (result.error !== null) {
      setErrorMessage(result.error)
      return
    }
    
    // Reset Inputs
    setTitleInput("")
    setDiscriptionInput("")
    setCategoryInput("")
    setPriceInput("")
    handleClose()
    handleSnackbarOpen()

  }

  const handleSnackbarOpen = () => setSnackbarOpen(true);
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };


  return (
    <div>
      <Button className="Insert-Button" onClick={handleOpen} variant='contained'>Insert Item</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h5" component="h">
                Please enter Product Information:
            </Typography>
            <Box height={10} />
            <TextField id= "TextField" label="Title" value={titleInput} onChange={(e) => setTitleInput(e.target.value)} />
            <Box height={10} />
            <TextField id= "TextField" label="Description" value={descriptionInput} onChange={(e) => setDiscriptionInput(e.target.value)} />
            <Box height={10} />
            <TextField id= "TextField" label="Category" value={categoryInput} onChange={(e) => setCategoryInput(e.target.value)} />
            <Box height={10} />
            <TextField id= "TextField" label="Price" value={priceInput} onChange={(e) => setPriceInput(e.target.value)} />
            <Box height={10} />
            <Button variant='contained' onClick={handleSubmit}>Submit</Button>
            <Typography className='error-message'>
              {errorMessage}
            </Typography>
        </Box>
      </Modal>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Item Successfully Added!
        </Alert>
      </Snackbar>
    </div>
  );
}
