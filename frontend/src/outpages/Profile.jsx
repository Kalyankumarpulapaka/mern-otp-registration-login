import React, { useState } from 'react';
import { Container, Card, CardContent, Typography, TextField, Button, Avatar } from '@mui/material';
import './Profile.css'; // Custom styles

function Profile() {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [bio, setBio] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>User Profile</Typography>
      {!isSubmitted ? (
        <Card elevation={3}>
          <CardContent>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
              id="profileImage"
            />
            <label htmlFor="profileImage">
              <Avatar
                src={image}
                sx={{ width: 150, height: 150, margin: '0 auto', cursor: 'pointer' }}
              />
            </label>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Phone"
                variant="outlined"
                margin="normal"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                margin="normal"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <TextField
                fullWidth
                label="Bio"
                variant="outlined"
                margin="normal"
                multiline
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Create Profile
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card elevation={3}>
          <CardContent align="center">
            <Typography variant="h5" color="primary">{name}</Typography>
            <Avatar
              src={image}
              sx={{ width: 150, height: 150, margin: '0 auto', mb: 2 }}
            />
            <Typography><strong>Email:</strong> {email}</Typography>
            <Typography><strong>Phone:</strong> {phone}</Typography>
            <Typography><strong>Address:</strong> {address}</Typography>
            <Typography><strong>Bio:</strong> {bio}</Typography>
            <Button variant="outlined" color="secondary" onClick={() => setIsSubmitted(false)}>
              Edit Profile
            </Button>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}

export default Profile;
