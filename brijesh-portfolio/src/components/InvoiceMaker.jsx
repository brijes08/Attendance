import React, { useState } from 'react'

const Input = () => {

    const [Inputs, setInput] = useState({
        First: '',
        Last: '',
        Class: ''
    });

    const [added, setAdded] = useState([{
        First: '',
        Last: '',
        Class: ''
    }]);

    const handleInput = (index) => (e) => {
        const newArray = added.map((item, i) => {
            if (index === i) {
                return { ...item, [e.target.name]: e.target.value };
            }
            return item;
        });
        setAdded(newArray);
    };

    const addNew = () => {
        setAdded([...added, Inputs])
        setInput({
            First: '',
            Last: '',
            Class: ''
        })
    }

    const deleteItems = (index) => {
        setAdded(preData => {
            return preData.filter((val, id) => {
                return index !== id
            })
        })
    }
    const submitData = () => {
        let finalResult = true;

        const mapData = added.map((val) => {
            if (!val.First || !val.Last || !val.Class) {
                return finalResult = false;
            }
            return val
        })

        if (finalResult) {
            console.log(mapData)
        } else {
            alert('Please fill the data')
        }
    }
    return (
        <>
            <ul className='test'>
                <li class="headings">
                    <ul>
                        <li> Items </li>
                        <li> Quantity </li>
                        <li> Rate </li>
                        <li> Delete Item </li>
                    </ul>
                </li>
                {added.map((val, id) => {
                    return (
                        <li key={id}>
                            <ul>
                                <li>
                                    <input
                                        type="text"
                                        name="First"
                                        value={val.First}
                                        onChange={handleInput(id)}
                                        placeholder='Description of service or product...'
                                    />
                                </li>
                                <li>
                                    <input
                                        type="text"
                                        name="Last"
                                        value={val.Last}
                                        onChange={handleInput(id)}
                                        placeholder='Quantity'
                                    />
                                </li>
                                <li>
                                    <input
                                        type="text"
                                        name="Class"
                                        value={val.Class}
                                        onChange={handleInput(id)}
                                        placeholder='Rate'
                                    />
                                </li>
                                <li>
                                    {added.length === 1 ?
                                        <div className='deletebtn' style={{ cursor: 'no-drop', opacity: 0.3 }}>Delete</div>
                                        :
                                        <div className='deletebtn' onClick={() => deleteItems(id)} >Delete</div>
                                    }
                                </li>
                            </ul>

                        </li>
                    )
                })}
                <div className='addnew' onClick={addNew}>Add Item</div>
                <div className='addnew submit' onClick={submitData}>Submit</div>
            </ul>
        </>
    )
}

export default Input
