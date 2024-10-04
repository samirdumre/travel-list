import {useEffect, useState} from "react";
import Form from "./Components/Form.jsx";
import Logo from "./Components/Logo.jsx";
import PackagingList from "./Components/PackingList.jsx";
import Stats from "./Components/Stats.jsx";


function App() {
    const [packingItems, setPackingItems] = useState([]);

    useEffect(() => {
        const localPackingItems = localStorage.getItem("PACKING_ITEMS");
        if (localPackingItems) {
            setPackingItems(JSON.parse(localPackingItems));
        }
    }, []);

    function updateLocalPackingItems(packingItems) {
        localStorage.setItem("PACKING_ITEMS", JSON.stringify(packingItems));
    }

    function handleAddPackingItems(packingItem) {
        setPackingItems((packingItems) => {
            const updatedPackingItems = [...packingItems, packingItem];
            updateLocalPackingItems(updatedPackingItems);
            return updatedPackingItems;
        });
    }

    function handleDeletePackingItems(id) {
        setPackingItems((packingItems) => {
            const updatedPackingItems = packingItems.filter((packingItem) => packingItem.id !== id);
            updateLocalPackingItems(updatedPackingItems);
            return updatedPackingItems;
        });
    }

    function handleTogglePackingItem(id) {
        setPackingItems((packingItems) => {
            const updatedPackingItems = (packingItems.map((packingItem) => packingItem.id === id ? {
                ...packingItem, packed: !packingItem.packed
            } : packingItem));
            updateLocalPackingItems(updatedPackingItems);
            return updatedPackingItems;
        })
    }

    function handleClearList() {
        const confirm = window.confirm("Are you sure you want to delete all items?");
        if (confirm) setPackingItems(() => {
            localStorage.removeItem("PACKING_ITEMS");
            return [];
        });
    }

    return (<div className={"app"}>
            <Logo/>
            <Form onAddPackingItems={handleAddPackingItems}/>
            <PackagingList packingItems={packingItems} onDeletePackingItems={handleDeletePackingItems}
                           handleTogglePackingItem={handleTogglePackingItem} handleClearList={handleClearList}/>
            <Stats packingItems={packingItems}/>
        </div>)
}


export default App
