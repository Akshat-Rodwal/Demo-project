

import React from 'react';
import { Layout } from 'antd';
import { QueryClient, QueryClientProvider } from 'react-query';
import UserList from './UserList';

const { Header, Content } = Layout;

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout className="min-h-screen">
        <Header className="bg-blue-500 text-white">
          <h1 className="text-2xl mt-3 ">Demo Project</h1>
        </Header>
        <Content className="p-6">
          <UserList />
        </Content>
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
