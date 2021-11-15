import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { axiosWithJwtInstance } from '../../helpers/axiosInstance';
import './featuredInfo.css';

const FeaturedInfo = () => {
   // En income vienen las ganancias de este mes y del mes anterior
   const [income, setIncome] = useState([])
   const [perc, setPerc] = useState(0)


   useEffect(() => {
      const getIncome = async () => {
         try {
            const res = await axiosWithJwtInstance.get("/orders/income")
            setIncome(res?.data);
            setPerc((res?.data[1].total * 100) / res?.data[0].total - 100)
         } catch (error) {
            console.log(error)
         }
      }
      getIncome();
   }, [])



   return (
      <div className="featured">

         <div className="featuredItem">
            <span className="featuredTitle">Revanue</span>
            <div className="featuredMoneyContainer">
               <span className="featuredMoney">${income[1]?.total}</span>
               <span className="featuredMoneyRate">%{perc.toFixed(2)}
                  { perc < 0 ? (
                     <ArrowDownward className="featuredIcon negative" />

                  ) : (
                     <ArrowUpward className="featuredIcon positive" />
                  )}
               </span>
            </div>
            <span className="featuredSub">Compared to last month</span>
         </div>

         <div className="featuredItem">
            <span className="featuredTitle">Sales</span>
            <div className="featuredMoneyContainer">
               <span className="featuredMoney">$4.415</span>
               <span className="featuredMoneyRate">-3.4
                  <ArrowDownward className="featuredIcon negative" /> </span>
            </div>
            <span className="featuredSub">Compared to last month</span>
         </div>

         <div className="featuredItem">
            <span className="featuredTitle">Cost</span>
            <div className="featuredMoneyContainer">
               <span className="featuredMoney">$2.215</span>
               <span className="featuredMoneyRate">+5.4
                  <ArrowUpward className="featuredIcon positive" /> </span>
            </div>
            <span className="featuredSub">Compared to last month</span>
         </div>

      </div>
   )
}

export default FeaturedInfo
