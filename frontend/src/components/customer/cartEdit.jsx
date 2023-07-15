import { Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

function CartEdit() {

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
            />
        </>
    )
}

export default CartEdit;