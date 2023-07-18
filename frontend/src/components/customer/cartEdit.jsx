import { Button, Modal, Card } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';


function CartEdit({ orderData, updateOrderData }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);


    const showModal = () => {
        setIsModalVisible(true);
    }

    const handleOk = () => {
        setIsModalVisible(false);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    const updataTotalPrice = (price) => {
        setTotalPrice((prevPrice) => prevPrice + price);
    }


    return (
        <>
            <Button
                icon={<ShoppingCartOutlined style={{ color: 'white', fontSize: '30px' }} />}
                style={{
                    position: 'fixed',
                    right: '60px',
                    bottom: '60px',
                    height: '60px',
                    width: '60px',
                    backgroundColor: 'green',
                    border: 'none',
                    color: 'white'
                }}
                onClick={showModal}
            />

            <Modal title="Order" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                {orderData.map((dish) => (
                    <DishDetail key={dish.DishID} dish={dish} orderData={orderData} updateOrderData={updateOrderData} updataTotalPrice={updataTotalPrice} totalPrice={totalPrice} />

                ))}
            </Modal>
            <div>
                {totalPrice}
            </div>
        </>
    )
}


function DishDetail({ dish, orderData, updateOrderData, updataTotalPrice, totalPrice }) {
    const [detail, setDetail] = useState(null);


    useEffect(() => {
        const fetchDishData = async () => {
            const response = await fetch(`http://localhost:8000/hungry/dishes/${dish.DishID}`, {
                method: 'GET'
            });
            const data = await response.json();

            setDetail(data);
        }

        fetchDishData();

    }, [dish.DishID]);

    const calcPrice = () => {
        const dishprice = dish.DishAmount * detail.Price;
        updataTotalPrice(dishprice);
    }


    if (!detail) {
        return <div>Loading...</div>;
    }


    const PlusCount = (DishID) => {
        const dishIndex = orderData.findIndex(item => item.DishID === DishID);

        if (dishIndex !== -1) {
            const newOrderData = [...orderData];
            newOrderData[dishIndex].DishAmount = dish.DishAmount + 1;
            updateOrderData(newOrderData);
        }
    }

    const MinusCount = (DishID) => {
        const dishIndex = orderData.findIndex(item => item.DishID === DishID);
        if (dishIndex !== -1) {
            const newOrderData = [...orderData];
            if (newOrderData[dishIndex].DishAmount > 1) {
                newOrderData[dishIndex].DishAmount -= 1;
            } else {
                newOrderData.splice(dishIndex, 1);
            }
            updateOrderData(newOrderData);
        }
    }




    return (
        <>
            <Card>
                <div style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <img
                        alt={dish.DishName}
                        src={'/ayouh.jpeg'}
                        style={{ height: '150px', objectFit: 'cover', marginRight: '30px' }}
                    />
                    <div style={{ marginRight: '30px' }}>
                        <div><strong>{detail.DishName}</strong></div>
                        <div>Price: {detail.Price}</div>
                        <div>Amount: {dish.DishAmount}</div>
                    </div>


                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<PlusOutlined />}
                            onClick={() => PlusCount(dish.DishID)}
                        />
                        <p style={{ margin: '0 16px' }}>{dish.DishAmount || 0}</p>
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<MinusOutlined />}
                            onClick={() => MinusCount(dish.DishID)}
                        />
                    </div>
                </div>
                <div>
                    <button onClick={calcPrice}>Calculate Price</button>
                </div>

                <div>{totalPrice}</div>

            </Card>
        </>
    )
}

export default CartEdit;