import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios';

const Attendence = () => {
  const [inputData, setInputData] = useState({
    inputName: ''
  })
  const [students, setStudents] = useState([])
  const [updated, setUpdated] = useState(null);

  const handleInput = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value })
  }

  const dataAttendence = async () => {
    await axios.get('http://localhost:5001/students').then(response => {
      setStudents(response.data);
    }).catch(error => {
      console.log(error);
    });
  }

  const editItem = (index) => {
    let editItem = students.find((val) => {
      return index === val.id;
    })
    setInputData(editItem)
    setUpdated(index)
  }

  const submitAttendence = () => {
    fetch(`http://localhost:5001/students/${updated}`, {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(inputData)
      }).then((result) => {
        dataAttendence()
      }).catch((err) => {
        console.log(err)
      });
    setUpdated(null)
    dataAttendence();
  }

  useEffect(() => {
    dataAttendence();
  }, [])

  return (
    <>
      <div className="for_datefilter">
      <div className="mark_attendence">
        <button style={{backgroundColor: 'green', color: '#ffffff'}}>Mark Attendence</button>
        <button style={{backgroundColor: 'red', color: '#ffffff'}}>Mark Leave</button>
      </div>
      <input type="date" />
      </div>
      <ul className="attendence_manage">
        <li><b>Students Names</b></li>
        <li><b>Attendence</b></li>
        <li><b>Edit</b></li>
        {students.map((items) => {
          return (<React.Fragment key={items.id}>
            <li>{items.inputName}</li>
            <li id="attendence_color">{items.inputAttendence}</li>
            <li><NavLink data-bs-toggle="modal" to="#exampleModalToggle" role="button"><i className="fa fa-pencil-square-o" aria-hidden="true" onClick={() => editItem(items.id)}></i></NavLink></li>
          </React.Fragment>)
        })}
      </ul>

      <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">Update Student Attendence</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">x</button>
            </div>
            <div className="modal-body students_add">
              <form>
                <div className="form_input">
                  <label><b>Name<span>*</span></b></label>
                  <input type="text" name="name" value={inputData.inputName} disabled />
                </div>
                <div className="form_input">
                  <label><b>Date</b></label>
                  <input type="date" name="date" disabled />
                </div>
                <div className="form_input">
                  <label><b>Mark Attendence<span>*</span></b></label>
                  <select name="inputAttendence" onChange={handleInput}>
                    <option value="--">--</option>
                    <option value="P">P</option>
                    <option value="A">A</option>
                    <option value="L">L</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer students_addbtn">
              <button data-bs-dismiss="modal" aria-label="Close" onClick={submitAttendence}> Update </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Attendence
