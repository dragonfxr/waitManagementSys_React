import React, { useState, useEffect } from "react";
import './manager.css';

function ManagerPage() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchMenuData = async () => {
            const response = await fetch('http://localhost:8000/menu/menus/', {
                method: 'GET'
            });
            const data = await response.json();
            console.log('ss', data);
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
                            <li key={category.id}>
                                <a href={`/manager/menu/${category.categoryName}`}>
                                    {category.categoryName}
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