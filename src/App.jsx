import {useState} from "react";
import Form from "./Components/Form.jsx";
import Logo from "./Components/Logo.jsx";
import PackagingList from "./Components/PackingList.jsx";
import Stats from "./Components/Stats.jsx";


function App() {
    const [packingItems, setPackingItems] = useState([]);

    function handleAddPackingItems(packingItem) {
        setPackingItems((packingItems) => [...packingItems, packingItem]);
    }

    function handleDeletePackingItems(id) {
        setPackingItems((packingItems) => packingItems.filter((packingItem) => packingItem.id !== id));
    }

    function handleTogglePackingItem(id) {
        setPackingItems((packingItems) => (packingItems.map((packingItem) => packingItem.id === id ? {
            ...packingItem, packed: !packingItem.packed
        } : packingItem)))
    }

    function handleClearList() {
        const confirm = window.confirm("Are you sure you want to delete all items?");
        if (confirm) setPackingItems(() => []);
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
