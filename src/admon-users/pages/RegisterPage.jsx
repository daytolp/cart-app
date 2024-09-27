import React, { useContext, useEffect, useState } from 'react'
import { UserForm } from '../components/UserForm'
import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/userContext';

export const RegisterPage = () => {
  const {users = [], initialForm} = useContext(UserContext);
  const [userSelected, setUserSelected] = useState(initialForm);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    const user = users.find(u => u.id == id) || initialForm;
    setUserSelected(user);
  }, [id]);

  return (
    <>
    <Container maxWidth="lg" sx={{ marginTop: 5 }}>
        <UserForm  userSelected={userSelected} />
    </Container>
       
    </>
  )
}
