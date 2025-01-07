import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button, message } from 'antd';

const AddUserForm = ({ refetch }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleAddUser = async () => {
    if (!name || !age) {
      message.error('Please fill in both name and age');
      return;
    }

    const newUser = { name, age: parseInt(age) };

    try {
      const response = await axios.post('http://localhost:5000/api/data', newUser);
      if (response.status === 201) {
        message.success('User added successfully!');
        setName('');
        setAge('');
        refetch();
      }
    } catch (error) {
      message.error('Error adding user: ' + error.message);
      console.error(error);
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
      <Button className='m-5' type="primary" onClick={handleAddUser}>
        Add User
      </Button>
    </div>
  );
};

export default AddUserForm;
