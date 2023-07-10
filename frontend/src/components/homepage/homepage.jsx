import { useNavigate } from "react-router-dom";
import { List, Button, Drawer, Space, InputNumber } from 'antd';
import { useState } from 'react';
import ButtonImage from './order-now-button.png'
import './homepage.css'

function HomePage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [tableId, setTableId] = useState(1);
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

  const isInteger = (value) => {
    // Parse the value as an integer
    const intValue = parseInt(value);
    // console.log(!isNaN(intValue) && intValue.toString() === value);
    return !isNaN(intValue) && intValue.toString() === value;
  }


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
          title="Admin System"
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
          <Space>
            Enter Your Table Number:
            <InputNumber min={1} max={25} value={`${tableId}`} onChange={setTableId} />
          </Space>

          <button className="centeredButton" onClick={() => {
            if (isInteger(`${tableId}`) && tableId > 0 && tableId < 26) {
              navigate(`/customer/${tableId}`);
            }
          }}>
            <img src={ButtonImage} style={{ height: '100px' }} alt="button" />
          </button>
        </div>
      </div>
    </>
  )
}

export default HomePage;