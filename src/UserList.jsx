import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from './state';
import { fetchUsers, deleteUser } from './api';
import { Table, Button, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const UserList = () => {
  const [users, setUsers] = useAtom(userAtom); // Jotai state

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data); // Fetch and set state
      } catch (error) {
        message.error('Error fetching users: ' + error.message);
      }
    };

    loadUsers();
  }, [setUsers]);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId)); // Update Jotai state
      message.success('User deleted successfully!');
    } catch (error) {
      message.error('Error deleting user: ' + error.message);
    }
  };

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
