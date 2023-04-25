import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { TextField } from '@mui/material';
import apiClient from "../../services/apiClient"

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
  const {children, ...rest} = props;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [titleInput, setTitleInput] = useState("")
  const [descriptionInput, setDiscriptionInput] = useState("")
  const [categoryInput, setCategoryInput] = useState("")
  const [priceInput, setPriceInput] = useState(null)

  const handleSubmit = () => {

    if (!(titleInput instanceof String)) return
    if (!(descriptionInput instanceof String)) return
    if (!(categoryInput instanceof String)) return
    if (!Number.isInteger(priceInput)) return

    apiClient.postItem({
      title: titleInput,
      descriptionInput: descriptionInput,
      categoryInput
    })
    
    setTitleInput("")
    setDiscriptionInput("")
    setCategoryInput("")
    setPriceInput(null)
  }

  const handlePriceChange = (e) => {
    const input = e.target.value

    try {
      const input_num = Number(input)
      setPriceInput(input_num)
    } 
    catch {
      setPriceInput(input)
    }
  }

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
            <TextField id= "TextField" label="Price" value={priceInput} onChange={handlePriceChange} />
            <Box height={10} />
            <Button variant='contained' onClick={handleSubmit}>Submit</Button>
        </Box>
      </Modal>
    </div>
  );
}
