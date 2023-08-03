import { Card, Button, message } from "antd";
import { useState, useEffect } from "react";


function DishDetail({ dish, order }) {
    const [detail, setDetail] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);

    const handleClick = () => {
        setIsCompleted(true);
    }


    useEffect(() => {
        const fetchDishData = async () => {
            const response = await fetch(`http://localhost:8000/hungry/dishes/${dish.DishID}`, {
                method: 'GET'
            });
            const data = await response.json();

            setDetail(data);
        }

        fetchDishData();
        if (dish.CompleteStatus === 1) {
            setIsCompleted(true);
        }
    }, [dish.DishID]);

    if (!detail) {
        return <div>Loading...</div>;
    }

    const completeDish = async (order, orderDetailIDToUpdate) => {
        const orderID = order.OrderID

        const modifiedData = { ...order };

        // Find the index of the element in the DishList array with the matching OrderDetailID
        const dishListIndex = modifiedData.DishList.findIndex(
            (dish) => dish.OrderDetailID === orderDetailIDToUpdate
        );

        // Check if the element with the specified OrderDetailID was found
        if (dishListIndex !== -1) {
            // Update the CompleteStatus property of the specific element in the cloned DishList array
            modifiedData.DishList[dishListIndex].CompleteStatus = 1;
        } else {
            console.error(`Element with OrderDetailID ${orderDetailIDToUpdate} not found.`);
            return; // Exit the function if the element was not found
        }

        // Prepare the PUT request
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(modifiedData), // Convert the modified data to a JSON string
        };

        // Replace 'YOUR_PUT_API_URL' with your actual API endpoint for updating the data
        const response = await fetch(`http://localhost:8000/hungry/orders/${orderID}`, requestOptions);

        // Handle the response as needed
        if (response.ok) {
            message.success("Please go immediately")
        }
    };


    return (
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
                    <div>Amount: {dish.DishAmount}</div>
                    <div>Ingredient: {detail.Ingredients}</div>
                    <div>Status: {dish.CompleteStatus === 0 ? 'Preparing' : 'Completed'}</div>

                </div>
                <Button onClick={() => {
                    handleClick();
                    completeDish(order, dish.OrderDetailID)
                }} disabled={isCompleted} style={{ backgroundColor: isCompleted ? 'gray' : 'red', color: 'white' }}>{isCompleted ? 'Completed' : 'Not Completed'}</Button>
            </div>
        </Card>
    )
}

export default DishDetail;