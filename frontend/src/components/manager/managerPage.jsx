import React, { useState, useEffect } from "react";
import { Menu, Layout, Button, Modal, Input, message } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { HomeOutlined, EditOutlined, DeleteOutlined, ArrowUpOutlined, ArrowDownOutlined, SearchOutlined } from '@ant-design/icons';
import './manager.css';
import EditCategoryPage from "./editCategory";

function ManagerPage() {
  const location = useLocation()
  const { Header, Content, Footer, Sider } = Layout;
  const navigate = useNavigate();
  
  const [categories, setCategories] = useState([]);
  const [showAllDishes, setShowAllDishes] = useState(true);
  const [selectedKeys, setSelectedKeys] = useState('0');
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

  const fetchCategoryData = async () => {
    const response = await fetch('http://localhost:8000/hungry/categories/', {
      method: 'GET'
    });
    const data = await response.json();
    setCategories(data);
  }

  useEffect(() => {
    fetchCategoryData();
  }, [])

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
    console.log(`${categories}`);

    const data = await response.json()
    console.log(data)
    if (response.ok) {
      message.success('Create category successfully!😃')
      fetchCategoryData();
    } else {
      message.error(`${data.CategoryName}😥`)
    }

  }

  const deleteCategory = async (cId) => {
    const response = await fetch(`http://localhost:8000/hungry/categories/${cId}`, {
      method: 'DELETE',
    })
    console.log(response)//backend no response
    if (response.ok) {
      message.success('Delete category successfully!😃');
      fetchCategoryData();
    }
  }

  const moveUp = (index) => {
    if (index === 0) {
      return;
    }

    const items = [...categories];
    const item = items[index];   // shallow copy

    items[index] = items[index - 1]
    items[index - 1] = item;

    setCategories(items);

  }

  const moveDown = async (index) => {
    if (index === categories.length - 1) {
      return;
    }

    const items = [...categories];
    const item = items[index];   // shallow copy

    items[index] = items[index + 1]
    items[index + 1] = item;

    setCategories(items);

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
            style={{ width: 256, background: 'transparent', position: 'relative', left: '20px' }}
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
            style={{ width: 240, background: 'transparent' }}
            selectedKeys={[selectedKeys.toString()]}
            defaultOpenKeys={['sub0']}
            mode="inline"
          >
            {categories.map((category, index) => (
              <Menu.Item key={category.CategoryID}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
                  onClick={() => {
                    setShowAllDishes(false);
                    navigate(`/manager/${category.CategoryID}`);
                    setSelectedKeys(category.CategoryID);
                  }}
                >
                  <span>{category.CategoryName}</span>
                  <Button type="primary" icon={<ArrowUpOutlined />} onClick={() => moveUp(index)} />
                  <Button type="primary" icon={<ArrowDownOutlined />} onClick={() => moveDown(index)} />

                  <Button
                    type="danger"
                    icon={<DeleteOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteCategory(category.CategoryID.toString());
                      setShowAllDishes(true);
                      navigate("/manager");
                    }}
                    style={{ marginLeft: "10px", right: '20px' }}
                  />
                </div>
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
            <Button type="primary" style={{ marginLeft: "20px" }} icon={<SearchOutlined />} onClick={() => navigate('/history')}>
              History Bills
            </Button>
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