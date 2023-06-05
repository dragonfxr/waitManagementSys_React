import { useNavigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();

    return (
        <>
        <button onClick={() => navigate('/customer')}>customer</button>
        <button onClick={() => navigate('/manager')}>manager</button>
        <button onClick={() => navigate('/kitchen')}>kitchen</button>
        <button onClick={() => navigate('/waiter')}>waiter</button>
        </>
    )
}

export default HomePage;