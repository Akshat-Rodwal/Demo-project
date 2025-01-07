import React from 'react';
import { Layout } from 'antd';
import AddUserForm from './AddUserForm';
import UserList from './UserList';

const { Header, Content } = Layout;

function App() {
  return (
    <Layout className="min-h-screen">
      <Header className="bg-blue-500 text-white">
        <h1 className="text-2xl mt-3">Demo Project</h1>
      </Header>
      <Content className="p-6">
        <AddUserForm />
        <UserList />
      </Content>
    </Layout>
  );
}

export default App;
