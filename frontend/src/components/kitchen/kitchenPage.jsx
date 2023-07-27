import { useEffect, useState } from "react";
import { List, Card, Button } from "antd";
import DishDetail from "./dishDetail";
import { useNavigate } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons"

function KitchenPage() {
    const [orderData, setOrderData] = useState([]);
    const navigate = useNavigate();

    const fetchOrdersData = async () => {
        const response = await fetch('http://localhost:8000/hungry/orders/');
        const data = await response.json();
        const reversedData = [...data].reverse();
        setOrderData(reversedData);
    };

    useEffect(() => {
        fetchOrdersData();
    }, [])

    useEffect(() => {
        const fetchDataInterval = setInterval(fetchOrdersData, 3000);

        return () => clearInterval(fetchDataInterval);
    }, []);

    const formatDate = (time) => {
        const date = new Date(time);
        const formatter = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const formattedDate = formatter.format(date);

        return formattedDate;
    }

    return (
        <>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
            }}>
                <List dataSource={orderData} renderItem={
                    order => (order.PayStatus === false ?
                        (
                            <List.Item>
                                <Card title="Order Details">
                                    <p>Creation Time: {formatDate(order.CreateTime)}</p>
                                    <p>Table Number: {order.TableID}</p>
                                    <div style={{ position: "relative", left: "10px" }}>
                                        {order.DishList.every(dish => dish.CompleteStatus !== 0)
                                            ? <p style={{ fontWeight: "bold" }}>All dishes completed</p>
                                            : order.DishList.map(dish => (
                                                dish.CompleteStatus === 0 || dish.CompleteStatus === 1
                                                    ? <DishDetail key={dish.DishID} order={order} dish={dish} />
                                                    : null
                                            ))
                                        }
                                    </div>
                                </Card>
                            </List.Item>
                        ) : null
                    )
                }>
                </List>
            </div>

            <div style={{ position: "fixed", bottom: "40px", right: "40px" }}>
                <Button
                    type="primary"
                    shape="circle"
                    size="large"
                    icon={<HomeOutlined />}
                    style={{ marginRight: '20px' }}
                    onClick={() => {
                        navigate(`/`);

                    }}
                    title="Go back to home page"
                />
            </div>

        </>
    )
}

export default KitchenPage;
