import React, { useState } from 'react'

const SelectDropdown = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (value === 'all') {
            setSelectedItems(checked ? items : []);
        } else {
            setSelectedItems((selectedItems) =>
                checked
                    ? [...selectedItems, value]
                    : selectedItems.filter((item) => item !== value)
            );
        }
    };
    return (
        <>
            <div>
                <label>
                    <input
                        type="checkbox"
                        value="all"
                        checked={selectedItems.length === items.length}
                        onChange={handleCheckboxChange}
                    />
                    Select All
                </label>
                {items.map((item) => (
                    <label key={item}>
                        <input
                            type="checkbox"
                            value={item}
                            checked={selectedItems.includes(item)}
                            onChange={handleCheckboxChange}
                        />
                        {item}
                    </label>
                ))}
            </div>

        </>
    )
}

export default SelectDropdown
