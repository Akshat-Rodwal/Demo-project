import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from './state';
import { addUser } from './api';
import { Input, Button, message } from 'antd';

const AddUserForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [users, setUsers] = useAtom(userAtom); // Jotai state

  const handleAddUser = async () => {
    if (!name || !age) {
      message.error('Please fill in both name and age');
      return;
    }

    try {
      const newUser = { name, age: parseInt(age) };
      const addedUser = await addUser(newUser);
      setUsers([...users, addedUser]); // Update Jotai state
      message.success('User added successfully!');
      setName('');
      setAge('');
    } catch (error) {
      message.error('Error adding user: ' + error.message);
    }
  };

  return (
    <div>
      <Input
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-2"
      />
      <Input
        placeholder="Enter age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="mb-2"
        type="number"
      />
      <Button type="primary" onClick={handleAddUser}>
        Add User
      </Button>
    </div>
  );
};

export default AddUserForm;
