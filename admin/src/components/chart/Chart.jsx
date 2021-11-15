import './chart.css';
import {
   LineChart,
   Line,
   XAxis,
   CartesianGrid,
   Tooltip,
   ResponsiveContainer,
   // YAxis,
} from "recharts";
/* 
const reload = () => {
 window.location.reload();  
 console.log('reloaded')
}
 window.addEventListener('resize', () => {
    const timeOutFun = setTimeout(reload,500)
    clearTimeout(timeOutFun);
}) */

const Chart = ({ title, data, dataKey, grid }) => {


   return (
      <div className="chart">
         <h2 className="chartTitle">{title}</h2>
         <ResponsiveContainer width="100%" aspect={4}>
            {/* LineChart puede llevar widht y height */}
            {/* <LineChart data={data}> */}
            <LineChart
               width={500}
               height={300}
               data={data}
               margin={{
                  top: 5,
                  right: 5,
                  left: 5,
                  bottom: 5,
               }}
            >
               <XAxis dataKey="name" stroke="#5550bd" tick={{
                  fill: "#fff",
               }}
               />
               {/* <YAxis tick={{ fill: "#fff" }} /> */}
               <Tooltip
                  contentStyle={{
                     backgroundColor: "#8884d8",
                     color: "#fff",
                  }}
                  itemStyle={{
                     color: "#fff",
                  }}
                  cursor={false}
               />
               <Line
                  type="monotone"
                  dataKey={dataKey}
                  stroke="#8884d8"
                  strokeWidth="5"
                  dot={{ fill: "#2e4355", stroke: "#8884d8", strokeWidth: 2, r: 5 }}
                  activeDot={{
                     fill: "#2e4355",
                     stroke: "#8884d8",
                     strokeWidth: 5,
                     r: 10,
                  }}
               />
               {/* <Line type="monotone" dataKey={dataKey} stroke="#5550bd" /> */}
               {grid && <CartesianGrid stroke="#e0dfdf"
                  strokeDasharray="5 5"
               />}
            </LineChart>

         </ResponsiveContainer>
      </div>
   )
}

export default Chart
