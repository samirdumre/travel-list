import {useState} from "react";

function Form({onAddPackingItems}) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);

    const options = Array.from({length: 20}, (_, i) => i + 1);


    function handleSubmit(e) {
        e.preventDefault();

        if (!description) return;

        const newItem = {description, quantity, packed: false, id: Date.now()}

        onAddPackingItems(newItem);

        setQuantity(1);
        setDescription("");
    }

    return (<form className={"add-form"} onSubmit={handleSubmit}>
            <h3>What do you need for your trip?</h3>
            <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
                {options.map((num) => (<option key={num} value={num}>{num}</option>))}
            </select>
            <input type={"text"} placeholder={"Item..."} value={description}
                   onChange={(e) => setDescription(e.target.value)}/>
            <button>Add</button>
        </form>)
}

export default Form