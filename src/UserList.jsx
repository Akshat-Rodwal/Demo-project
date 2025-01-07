
import React from 'react';
import { Table, Button, Spin, message } from 'antd';
import { useQuery } from 'react-query';
import axios from 'axios';
import AddUserForm from './AddUserForm';
import { DeleteOutlined } from '@ant-design/icons';


const fetchData = async () => {
  const { data } = await axios.get('http://localhost:5000/api/data');
  return data;
};

function UserList() {
  const { data, error, isLoading, refetch } = useQuery('userData', fetchData);  


  if (isLoading) return <Spin size="large" />;


  if (error) return <div>Error fetching data</div>;

 
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/data/${userId}`);
      message.success('User deleted successfully!');
      refetch(); 
    } catch (error) {
      message.error('Error deleting user: ' + error.message);
      console.error(error);
    }
  };

  return (
    <div>
    
      <AddUserForm refetch={refetch} />

      
      <Table dataSource={data} rowKey="id" pagination={false}>
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
}

export default UserList;
