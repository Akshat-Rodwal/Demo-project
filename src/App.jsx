import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Layout } from 'antd';
import AddUserForm from './AddUserForm';
import UserList from './UserList';

const { Header, Content } = Layout;

// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout className="min-h-screen">
        <Header className="bg-blue-500 text-white">
          <h1 className="text-2xl mt-3">Demo Project</h1>
        </Header>
        <Content className="p-6">
          <AddUserForm />
          <UserList />
        </Content>
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
