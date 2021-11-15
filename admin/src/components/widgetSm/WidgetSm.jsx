import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { axiosWithJwtInstance } from "../../helpers/axiosInstance";
import "./widgetSm.css";

const WidgetSm = () => {

  const [ users,setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await axiosWithJwtInstance.get("/users?new?true")
        setUsers(users.data)
        
      } catch (error) {
        console.log(error)
      }
    }
    getUsers();
  },[])
 
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">

         {users.map((user) => (
          <li className="widgetSmListItem" key={user._id}>
            <img
              src={user?.img  
                ? user.img
                :"images/defaultprofile.jpg"}
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))} 

      </ul>
    </div>
  );
};

export default WidgetSm;
