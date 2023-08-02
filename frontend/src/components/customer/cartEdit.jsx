import { Button, Modal, Card, Statistic, message, Input } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useState, useEffect, useCallback } from "react";
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from "react-router-dom";

function CartEdit({ orderData, updateOrderData }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [dishPrices, setDishPrices] = useState({});
    // const [orderID, setOrderID] = useState();
    const tableId = useParams();
    const navigate = useNavigate();
    const [inputCouponCode, setInputCouponCode] = useState('');
    const [hasClicked, setHasClicked] = useState(false);


    const showModal = () => {
        setIsModalVisible(true);
    }

    const handleOk = () => {
        setIsModalVisible(false);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    const updateTotalPrice = useCallback((dishId, price) => {
        setDishPrices(prevPrices => ({ ...prevPrices, [dishId]: price }));
    }, []);

    useEffect(() => {
        let newTotalPrice = Object.values(dishPrices).reduce((a, b) => a + b, 0);
        setTotalPrice(newTotalPrice);
    }, [dishPrices]);

    const calcAmount = (orderData) => {
        const amount = orderData.reduce((total, dish) => total + dish.DishAmount, 0);
        return amount;
    }

    const getDate = () => {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if (month < 10) month = '0' + month;
        if (day < 10) day = '0' + day;
        let dateString = `${year}-${month}-${day}`;

        return dateString;
    }

    const postOrderData = async () => {
        const response = await fetch('http://localhost:8000/hungry/orders/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                DishList: orderData,
                TotalAmount: calcAmount(orderData),
                TotalPrice: totalPrice,
                PayTime: getDate(),
                PayStatus: false,
                TableID: Number(tableId.tableId)
            })
        });
        // const data = await response.json();

        if (response.ok) {
            navigate(`/customer/${tableId.tableId}/success`);
            message.success("Congratulations, your order has been sent to the kitchen!!");
            // console.log(data.OrderID)
            // setOrderID(data.OrderID);
        }
    }

    const checkCouponCode = () => {
        const storedCode = localStorage.getItem('couponCode');
        if (storedCode && storedCode === inputCouponCode) {
            setTotalPrice(prevPrice => prevPrice * 0.9);
            message.success('Voucher applied successfully!😃');
            setHasClicked(true);
        } else {
            message.error('Invalid voucher code!😥')
        }

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

            <Modal title="Your Dishes" open={isModalVisible}
                onOk={() => {
                    handleOk();
                    postOrderData();
                }}
                onCancel={handleCancel} okText="Check Out">
                {orderData.map((dish) => (
                    <DishDetail key={dish.DishID} dish={dish} orderData={orderData} updateOrderData={updateOrderData} updateTotalPrice={updateTotalPrice} totalPrice={totalPrice} />

                ))}
                <ShowTotalPrice totalPrice={totalPrice} />
                <Input placeholder="Enter your coupon code here" value={inputCouponCode} onChange={e => setInputCouponCode(e.target.value)} style={{ width: 210 }}></Input>
                <Button onClick={checkCouponCode} disabled={hasClicked} >Apply Voucher</Button>
            </Modal>
        </>
    )
}


function DishDetail({ dish, orderData, updateOrderData, updateTotalPrice }) {
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

    useEffect(() => {
        if (detail) {
            const price = dish.DishAmount * detail.Price;
            updateTotalPrice(dish.DishID, price);
        }
    }, [dish.DishAmount, detail, dish.DishID, updateTotalPrice]);



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
                updateTotalPrice(DishID, 0);
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
                        alt={detail.DishName}
                        src={detail.DishImageURL}
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
                            icon={<MinusOutlined />}
                            onClick={() => MinusCount(dish.DishID)}
                        />
                        <p style={{ margin: '0 16px' }}>{dish.DishAmount || 0}</p>
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<PlusOutlined />}
                            onClick={() => PlusCount(dish.DishID)}
                        />
                    </div>
                </div>
            </Card>

        </>
    )
}

function ShowTotalPrice({ totalPrice }) {

    return (<>
        <Statistic title="Total Price" value={totalPrice} precision={1} />
    </>)
}

export default CartEdit;