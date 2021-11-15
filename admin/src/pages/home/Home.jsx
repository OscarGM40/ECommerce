import { useEffect, useMemo, useState } from 'react';
import Chart from '../../components/chart/Chart';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import WidgetLg from '../../components/widgetLg/WidgetLg';
import WidgetSm from '../../components/widgetSm/WidgetSm';
import { axiosWithJwtInstance } from '../../helpers/axiosInstance';
// import { userData } from '../../helpers/dummyData';
import './home.css';


const Home = () => {

   const [userStats,setUserStats] = useState([])
   const MONTHS = useMemo( () => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],[]);
 
useEffect(() => {
   const getStats = async () => {
      try {
         const res = await axiosWithJwtInstance.get("/users/stats");

         res.data.sort( (a, b) =>  a._id - b._id)

         res.data.map((item) => 
            setUserStats((prev) =>  [
               ...prev,
               { name: MONTHS[item._id - 1],
               "New Users":item.total }
            ])
         )
      } catch (error) {
      console.log(error)     
      }
   }
    getStats();
},[MONTHS]) 

// console.log(userStats)

   return (
      <div className="home">
         <FeaturedInfo />
        {/* fake data solo comentar/descomentar no tocar nada */}
         {/* <Chart data={ userData } title="New Users by Month(last year)" grid dataKey="Active User" />  */}
         <div className="chartWrapper">
            <Chart data={ userStats } title="New Users by Month(last year)" grid dataKey="New Users" /> 
         </div>
         <div className="homeWidgets">
            <WidgetSm />
            <WidgetLg />        
         </div>
      </div>
   )
}

export default Home
