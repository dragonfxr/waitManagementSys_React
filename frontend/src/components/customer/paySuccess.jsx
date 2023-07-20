import { Result, Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

function PaySuccess() {
    const navigate = useNavigate();
    const tableid = useParams();

    const handlePayClick = () => {
        navigate('/');
    }

    return (
        <Result
            status="success"
            title="Your order has been sent to the kitchen!"
            subTitle="Please pay at the counter, see you next time!"
            extra={[
                <Button type="primary" key="console"
                    onClick={() => navigate('/')}>
                    Close
                </Button>,
                <Button key="buy"
                    onClick={() => navigate(`/customer/${tableid.tableId}`)}>Order More</Button>, <Button onClick={() => { handlePayClick(); }}>Pay Now</Button>

            ]}
        />
    );
}

export default PaySuccess;