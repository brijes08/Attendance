import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Students = () => {

  const [inputData, setInputData] = useState({
    inputName: '',
    inputClass: ''
  })
  const [students, setStudents] = useState([])
  const [toggleButton, setToggleButton] = useState(true);
  const [updated, setUpdated] = useState(null);

  const handleInput = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value })
  }

  const submitData = () => {
    const {inputName, inputClass } = inputData;
    if (!inputName || !inputClass) {
      alert('Please Fill The Data First')
    } else if ((inputName, inputClass) && (!toggleButton)) {
      setStudents(
        students.map((val) => {
          if (val.id === updated) {
            return { ...val, name: inputData.inputName, class: inputData.inputClass }
          }
          return val;
        }))
      setToggleButton(true)
      setInputData({
        inputName: '',
        inputClass: ''
      })
      setUpdated(null)

    } else {
      const newStudent = { id: new Date().getTime().toString(), name: inputData.inputName, class: inputData.inputClass }
      setStudents([...students, newStudent])
      setInputData({
        inputName: '',
        inputClass: ''
      })
    }
  }

  const deleteItem = (index) => {
    setStudents(preItems => {
      return preItems.filter((val) => {
        return index !== val.id;
      })
    })
  }

  const editItem = (index) => {
    let editItemSelect = students.find((val) => {
      return index === val.id;
    })
    setToggleButton(false)
    setInputData({
      inputName: editItemSelect.name,
      inputClass: editItemSelect.class
    })
    setUpdated(index)
  }


  return (
    <>
      <ul className="student_manage">
        <li><b>Students Names</b></li>
        <li><b>Class</b></li>
        <li><b>Edit</b></li>
        <li><b>Delete</b></li>
        {students.map((items) => {
          return (<React.Fragment key={items.id}>
            <li>{items.name}</li>
            <li>{items.class}</li>
            <li><NavLink data-bs-toggle="modal" to="#exampleModalToggle" role="button" onClick={() => editItem(items.id)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></NavLink></li>
            {students.length === 1 ? <li><div> <i style={{ cursor: "no-drop", color: "#ccc" }} className="fa fa-trash" aria-hidden="true" ></i></div></li> : <li><div onClick={() => deleteItem(items.id)}> <i className="fa fa-trash" aria-hidden="true"></i> </div></li>}

          </React.Fragment>)
        })}

      </ul>
      <NavLink className="create_btn" data-bs-toggle="modal" to="#exampleModalToggle" role="button">Add New</NavLink>


      <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">{toggleButton ? "Add New" : "Edit"} Student</h5>
              {toggleButton ? <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">x</button> : <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={submitData}>x</button>}
            </div>
            <div className="modal-body students_add">

              <form>
                <div className="form_input">
                  <label><b>Name<span>*</span></b></label>
                  <input type="text" name="inputName" onChange={handleInput} value={inputData.inputName} />
                </div>
                <div className="form_input">
                  <label><b>Class<span>*</span></b> <br />Please enter a value only this format (9th, 10th, 11th) </label>
                  <input type="text" name="inputClass" maxLength='4' minLength='3' onChange={handleInput} value={inputData.inputClass} />
                </div>
              </form>

            </div>
            <div className="modal-footer students_addbtn">
              {toggleButton ? <button data-bs-dismiss="modal" aria-label="Close" onClick={submitData}> Submit </button> : <button data-bs-dismiss="modal" aria-label="Close" onClick={submitData}> Update </button>}


            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Students
