import { Result, Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

function PaySuccess() {
    const navigate = useNavigate();
    const tableid = useParams();

    return (
        <Result
            status="success"
            title="Your bill has been sent to the counter!"
            subTitle="Please pay at the counter, see you next time!"
            extra={[
                <Button type="primary" key="console"
                    onClick={() => navigate('/')}>
                    Close
                </Button>,
                <Button key="buy"
                    onClick={() => navigate(`/customer/${tableid.tableId}`)}>Order More</Button>
            ]}
        />
    );
}

export default PaySuccess;