import { Result, Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

function PaySuccess() {
    const navigate = useNavigate();
    const tableid = useParams();

    return (
        <Result
            status="success"
            title="Successfully Paid!"
            subTitle="Your order has been received, thank you for your order."
            extra={[
                <Button type="primary" key="console"
                    onClick={() => navigate('/')}>
                    Go Home
                </Button>,
                <Button key="buy"
                    onClick={() => navigate(`/customer/${tableid.tableId}`)}>Buy Again</Button>
            ]}
        />
    );
}

export default PaySuccess;