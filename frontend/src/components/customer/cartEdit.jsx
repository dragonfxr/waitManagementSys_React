import { Button, Modal, Card } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

function CartEdit({ orderData }) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    }

    const handleOk = () => {
        setIsModalVisible(false);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
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
                    <DishDetail key={dish.DishID} dish={dish} />

                ))}
            </Modal>
        </>
    )
}


function DishDetail({ dish }) {
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

    if (!detail) {
        return <div>Loading...</div>;
    }
    console.log('ddd', detail)
    return (
        <>
            <Card>
                <p>Name: <strong>{detail.DishName}</strong></p>
                <p>Price: {detail.Price}</p>
                <p>Amount: {dish.DishAmount}</p>
            </Card>
        </>
    )
}

export default CartEdit;