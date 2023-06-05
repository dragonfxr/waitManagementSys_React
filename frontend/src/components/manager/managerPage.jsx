import React, {useState, useEffect} from "react";
import './manager.css';

function ManagerPage() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchMenuData = async () => {
            const response = await fetch('menu.json');
            const data = await response.json();
            setCategories(data);
        }
       fetchMenuData();
    }, [])

    console.log(categories);
    return (
        <>
        <div>
        manager page
        </div>
        <button>add new categories</button>
        <div>show categories</div>
        <div className="left-side-bar">
            <nav className="side-nav">
                <ul>
                {categories.map(category => (
                <li>
                    <a href={`/manager/menu/${category.name}`}>
                    {category.name}
                </a>
                </li>
                ))}
                </ul>
            </nav>
        </div>
        
        
        </>
    )
}

export default ManagerPage;