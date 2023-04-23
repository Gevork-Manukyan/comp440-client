import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { TextField } from '@mui/material';

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
            <TextField id= "TextField" label="Title" />
            <Box height={10} />
            <TextField id= "TextField" label="Description" />
            <Box height={10} />
            <TextField id= "TextField" label="Category" />
            <Box height={10} />
            <TextField id= "TextField" label="Price" />
            <Box height={10} />
            <Button variant='contained'>Submit</Button>
        </Box>
      </Modal>
    </div>
  );
}
