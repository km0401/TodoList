import React, { useState } from 'react';
import useEth from '../contexts/EthContext/useEth';
import CustomButton from './CustomButton';
import { Box, Card, Typography, TextField } from '@mui/material';

function RegisterUser() {
  const {
    state: { contract, accounts },
  } = useEth();

  const [username, setUsername] = useState('');

  const handleUserRegistration = async () => {
    try {
      if (!username) {
        throw new Error('Please fill the name field');
      }
      const isRegistered = await contract.methods.isRegistered().call({from:accounts[0]});
      if (isRegistered) {
        
      }
      await contract.methods.registerUser(username).send({ from: accounts[0] });
      setUsername('');
      alert('User registered successfully!');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Card sx={{ borderRadius: '10px', width: '30%', padding:'20px', marginTop:'80px'}}>
      <Box>
        <Typography variant="h5" mb={1} gutterBottom sx={{ textAlign: 'center', fontWeight: 500 }}>
          User Registration
        </Typography>
      </Box>
      <Box>
        <TextField
          label="Your Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          variant="outlined"
          fullWidth
          InputProps={{ style: { fontSize: '15px' } }}
          InputLabelProps={{ style: { fontSize: '15px' } }}
          size="small"
        />
      </Box>
      <Box sx={{ width: '100%', mt: 2, display: 'flex', justifyContent: 'center' }}>
        <CustomButton text={'Register'} handleClick={() => handleUserRegistration()} />
      </Box>
    </Card>
  );
}

export default RegisterUser;
