import { useNavigate } from "react-router-dom";
import { List, Button, Drawer, Space } from 'antd';
import { useState } from 'react';
import ButtonImage from './order-now-button.png'
import './homepage.css'

function HomePage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const placement = 'left';
  const data = [
    {
      title: 'Kitchen',
      path: '/kitchen',
    },
    {
      title: 'Manager',
      path: '/manager',
    },
    {
      title: 'Waiter',
      path: '/waiter',
    },
  ]
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="background">
        <Space style={{ position: "absolute", left: "20px", top: "20px" }}>
          <Button type="primary" onClick={showDrawer} style={{ backgroundColor: 'rgb(221,182,142)', color: 'rgb(129, 84, 47)' }}>
            Admin
          </Button>
        </Space>
        <Drawer
          style={{ backgroundColor: 'rgb(106, 79, 50)' }}
          title="Basic Drawer"
          placement={placement}
          closable={false}
          onClose={onClose}
          open={open}
          key={placement}
        >
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <span className="customTitle" onClick={() => navigate(item.path)}>
                  {item.title}
                </span>

              </List.Item>
            )}
          />
        </Drawer>
        <div className="divButton">
          <button className="centeredButton" onClick={() => navigate('/customer')}>
            <img src={ButtonImage} style={{ height: '100px' }} alt="button" />
          </button>
        </div>
      </div>
    </>
  )
}

export default HomePage;