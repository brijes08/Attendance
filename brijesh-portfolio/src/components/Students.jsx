import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios';

const Students = () => {

  const [inputData, setInputData] = useState({
    inputName: '',
    inputEmail: '',
    password: '',
    id: new Date().getTime().toString()
  })
  const [students, setStudents] = useState([])
  const [toggleButton, setToggleButton] = useState(true);
  const [updated, setUpdated] = useState(null);

  const handleInput = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value })
  }

  const submitData = () => {
    const { inputName, inputEmail, password } = inputData;
    if ((!inputName || !inputEmail || !password) && (toggleButton)) {
      alert('Please Fill The Data First')
    } else if ((inputName, inputEmail) && (!toggleButton)) {
      fetch(`http://localhost:5001/students/${updated}`, {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(inputData)
      }).then((result) => {
        data()
      }).catch((err) => {
        console.log(err)
      });
      setToggleButton(true)
      setInputData({
        inputName: '',
        inputEmail: '',
        password: ''
      })
      setUpdated(null)
    } else {
      setStudents([...students, inputData.inputAttendence = '--', inputData.inputDate = new Date().toLocaleDateString(), inputData.inputTime = new Date().toLocaleTimeString()])
      fetch("http://localhost:5001/students", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(inputData)
      }).then((response) => response.json())
      .then((alrtMsg) => {
        alert(alrtMsg.error)
        data()
      }).catch((err) => {
        console.log(err)
      });

      setInputData({
        inputName: '',
        inputEmail: '',
        password: ''
      })
      
    }

  }

  const data = async () => {
   await axios.get('http://localhost:5001/students').then(response => {
      setStudents(response.data);
    }).catch(error => {
      console.log(error);
    });
  }

  const deleteItem = async (index) => {
    const response = await fetch(`http://localhost:5001/students/${index}`, {
      method: 'DELETE'
    }).then((result) => {
      data()
    }).catch((err) => {
      console.log(err)
    });
    console.log(response)
  }

  useEffect(() => {
    data()
  }, []);

  const editItem = (index) => {
    let editItemSelect = students.find((val) => {
      return index === val.id;
    })
    setToggleButton(false)
    setInputData({
      inputName: editItemSelect.inputName,
      inputEmail: editItemSelect.inputEmail
    })
    setUpdated(index)
  }

  return (
    <>
      <NavLink className="create_btn" data-bs-toggle="modal" to="#exampleModalToggle" role="button">Add New</NavLink>
      <ul className="student_manage">
        <li><b>Students Names</b></li>
        <li style={{ textTransform: 'capitalize' }}><b>Students Emails</b></li>
        <li><b>Edit</b></li>
        <li><b>Delete</b></li>
        {students.map((items, id) => {
          return (<React.Fragment key={id}>
            <li>{items.inputName}</li>
            <li>{items.inputEmail}</li>
            <li><NavLink data-bs-toggle="modal" to="#exampleModalToggle" role="button" onClick={() => editItem(items.id)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></NavLink></li>
            {students.length === 1 ? <li><div> <i style={{ cursor: "no-drop", color: "#ccc" }} className="fa fa-trash" aria-hidden="true" ></i></div></li> : <li><div onClick={() => deleteItem(items.id)}> <i className="fa fa-trash" aria-hidden="true"></i> </div></li>}
          </React.Fragment>)
        })}

      </ul>



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
                  <label><b>Email<span>*</span></b></label>
                  <input type="email" name="inputEmail" onChange={handleInput} value={inputData.inputEmail} />
                </div>
                {toggleButton ? <div className="form_input">
                  <label><b>Password<span>*</span></b></label>
                  <input type="text" name="password" onChange={handleInput} value={inputData.password} />
                </div> : ""}
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
