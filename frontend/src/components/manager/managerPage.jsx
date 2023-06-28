import React, { useState, useEffect } from "react";
import { Menu, Layout, Button, Modal, Input } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { HomeOutlined, EditOutlined } from '@ant-design/icons';
import './manager.css';
import EditCategoryPage from "./editCategory";

function ManagerPage() {
  const [categories, setCategories] = useState([]);
  const location = useLocation()

  const [showAllDishes, setShowAllDishes] = useState(true);
  const [selectedKeys, setSelectedKeys] = useState('0');
  const navigate = useNavigate();
  const { Header, Content, Footer, Sider } = Layout;

  const [visible, setVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const showModal = () => {
    setVisible(true);
    setInputValue('');
  };

  const handleOk = e => {
    postCategory();
    setVisible(false);
    setInputValue('');
  };

  const handleCancel = e => {
    setVisible(false);
    setInputValue('');
  };


  useEffect(() => {
    const fetchCategoryData = async () => {
      const response = await fetch('http://localhost:8000/hungry/categories/', {
        method: 'GET'
      });
      const data = await response.json();
      setCategories(data);
    }
    fetchCategoryData();
  }, [])

  console.log(typeof (inputValue));
  const postCategory = async () => {
    const geCateId = Math.floor(Math.random() * 9000) + 1000;
    const response = await fetch('http://localhost:8000/hungry/categories/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        CategoryID: geCateId,
        CategoryName: `${inputValue}`,
      })
    })
    const data = await response.json();
    console.log(data);
  }

  return (
    <>
      <Layout>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            background: '#f0f0f0',
          }}
        >
          <Menu
            style={{ width: 256, background: 'transparent' }}
            selectedKeys={[selectedKeys]}
            defaultOpenKeys={['sub0']}
            mode="inline"
          >
            <Button key={0} onClick={() => {
              setShowAllDishes(true);
              navigate('/manager');
              <EditCategoryPage showAllDishes={showAllDishes} />
              setSelectedKeys('0');
            }}>
              Show All Dishes
            </Button>
          </Menu>
          <Menu
            style={{ width: 256, background: 'transparent' }}
            selectedKeys={[selectedKeys.toString()]}
            defaultOpenKeys={['sub0']}
            mode="inline"
          >
            {categories.map(category => (
              <Menu.Item key={category.CategoryID} onClick={() => {
                setShowAllDishes(false)
                navigate(`/manager/${category.CategoryID}`);
                setSelectedKeys(category.CategoryID.toString())
              }}>
                {category.CategoryName}
              </Menu.Item>
            ))}
          </Menu>
          <div>
            <Button type="primary" style={{ marginLeft: "20px" }} icon={<EditOutlined />} onClick={showModal}>
              Add Category
            </Button>
            <Modal
              key={visible}
              title="Add Category"
              open={visible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Input
                placeholder="Input category name"
                onChange={(e) => setInputValue(e.target.value)}
              />
            </Modal>
          </div>
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Header style={{ background: '#fff', paddingLeft: 10 }}>
            <Button
              style={{ position: "absolute", right: "180px", top: "10px" }}
              type="primary"
              shape="circle"
              size="large"
              icon={<HomeOutlined />}
              onClick={() => navigate(`/`)}
              title="Go back to home page"
            />
          </Header>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
              <Outlet />
              {location.pathname === '/manager' &&
                <EditCategoryPage showAllDishes={showAllDishes} />
              }
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            <div style={{ margin: 20 }}>
              Are You Hungry 😋
            </div>
          </Footer>
        </Layout>
      </Layout >
    </>
  )
}


export default ManagerPage;