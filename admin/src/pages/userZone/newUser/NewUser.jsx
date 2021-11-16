import { useState } from "react";
import { createUserCall } from "../../../redux/apiCalls";
import "./newUser.css";
import { useDispatch, useSelector } from 'react-redux'

const NewUser = () => {

  const dispatch = useDispatch();
  const { error } = useSelector(state => state.user);
  // console.log(error, "error");

  const [inputs, setInputs] = useState({})

  const handleChange = (e) => {
    e.preventDefault();
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(inputs);
    createUserCall(inputs,dispatch);
    if(error){
      console.log(error);
      return;
    }
    setTimeout (() => window.location.href="/users",1000)
  }


  return (
    <div className="newUser">
      <h1 className="newUserTitle">Create New User</h1>
      <div className="newUserWrapper">

        <form className="newUserForm"
       >

          <div className="newUserItem">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username..."
              name="username"
              required
              onChange={handleChange} />
          </div>

          <div className="newUserItem">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email..."
              name="email"
              required
              onChange={handleChange} />
          </div>

          <div className="newUserItem">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter plain password..."
              name="password"
              minLength="6"
              required
              onChange={handleChange} />
          </div>
          <div className="newUserItem">
            <label>Phone</label>
            <input
              type="text"
              placeholder="+1 123 456 789"
              name="phone"
              onChange={handleChange} />
          </div>
          <div className="newUserItem">
            <label>Address</label>
            <input
              type="text"
              placeholder="New York | USA"
              name="address"
              onChange={handleChange} />
          </div>
          <div className="newUserItem">
            <label>Gender</label>
            <div className="newUserGender">
              <input type="radio" name="gender" id="male" value="male"
                onChange={handleChange} />
              <label htmlFor="male">Male</label>
              <input type="radio" name="gender" id="female" value="female"
                onChange={handleChange} />
              <label htmlFor="female">Female</label>
              <input type="radio" name="gender" id="other" value="others"
                onChange={handleChange} />
              <label htmlFor="others">Other</label>
            </div>
          </div>
          <div className="newUserItem">
            <label>Admin User</label>
            <select className="newUserSelect"
              name="isAdmin"
              id="admin"
              onChange={handleChange}
              defaultValue=""
            >
              <option value="" disabled>Select value</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="newUserItem">
            <label htmlFor="birthDate">Date of Birth</label>
            <input
              type="date"
              name="birthDate"
              id="birthDate"
              onChange={handleChange} />
          </div>
        </form>
          <button className="newUserButton" onClick={handleSubmit}>
          Create User
        </button>
      </div>
    </div>
  );
};

export default NewUser;
