import {useState} from "react";

function PackagingList({packingItems, onDeletePackingItems, handleTogglePackingItem, handleClearList}) {
    const [sortBy, setSortBy] = useState("input");

    let sortedPackingItems;

    if (sortBy === "input") sortedPackingItems = packingItems;
    if (sortBy === "description") sortedPackingItems = [...packingItems].sort((a, b) => a.description.localeCompare(b.description));
    if (sortBy === "packed") sortedPackingItems = [...packingItems].sort((a, b) => a.packed - b.packed);

    return (<div className={"list"}>
            <ul>
                {sortedPackingItems.map((item) => (<Item item={item} onDeletePackingItems={onDeletePackingItems}
                                                         handleTogglePackingItem={handleTogglePackingItem}
                                                         key={item.description}/>))}
            </ul>

            <div className={"actions"}>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value={"input"}>Sort by input order</option>
                    <option value={"description"}>Sort by description</option>
                    <option value={"packed"}>Sort by packed status</option>
                </select>
                <button onClick={() => handleClearList()}>Clear list</button>
            </div>
        </div>);
}


function Item({item, onDeletePackingItems, handleTogglePackingItem}) {
    return (<li>
        <input type={"checkbox"} value={item.packed} defaultChecked={item.packed} onChange={() => handleTogglePackingItem(item.id)}/>
        <span style={item.packed ? {textDecoration: 'line-through'} : {}}>
                {item.quantity} {item.description}
                </span>
        <button onClick={() => onDeletePackingItems(item.id)}>❌</button>
    </li>)
}

export default PackagingList