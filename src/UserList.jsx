import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchUsers, deleteUser } from './api';
import { Table, Button, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const UserList = () => {
  const queryClient = useQueryClient();

  const { data: users, isLoading, isError } = useQuery('userData', fetchUsers, {
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  const mutation = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('userData'); // Refetch user data
      message.success('User deleted successfully!');
    },
    onError: (error) => {
      message.error('Error deleting user: ' + error.message);
    },
  });

  const handleDeleteUser = (userId) => {
    mutation.mutate(userId);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching users!</p>;

  return (
    <div>
      <Table dataSource={users} rowKey="id" pagination={false}>
        <Table.Column title="Name" dataIndex="name" key="name" />
        <Table.Column title="Age" dataIndex="age" key="age" />
        <Table.Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Button
            
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteUser(record.id)}
              danger
              loading={mutation.isLoading}
            >
              Delete
            </Button>
          )}
        />
      </Table>
    </div>
  );
};

export default UserList;
