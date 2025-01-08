import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { addUser } from './api';
import { Input, Button, message } from 'antd';

const AddUserForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation(addUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('userData'); // Refetch user data
      message.success('User added successfully!');
      setName('');
      setAge('');
    },
    onError: (error) => {
      message.error('Error adding user: ' + error.message);
    },
  });

  const handleAddUser = () => {
    if (!name || !age) {
      message.error('Please fill in both name and age');
      return;
    }
    mutation.mutate({ name, age: parseInt(age) });
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
      <Button className='m-4' type="primary" onClick={handleAddUser} loading={mutation.isLoading}>
        Add User
      </Button>
    </div>
  );
};

export default AddUserForm;
