import React from 'react'
import './modal.css';
import { useDispatch } from 'react-redux';
import { logoutCall } from '../../redux/apiCalls';



const MyModal = ({ setCSSClass, CSSclass }) => {

   const dispatch = useDispatch();

   const handleLogout = (event) => {
      setCSSClass("modal--show")
      // console.log('loging out')
      logoutCall(dispatch);
      setTimeout(() => window.location.href = '/', 200);
   }

   return (
      <section className={"modal " + CSSclass}>
         <div className="modal__container">
            {/* <img src="images/bed01.jpeg" className="modal__img" alt="" /> */}
            <h2 className="modal__title">ECommerce Admin Dashboard</h2>
            <p className="modal__paragraph">Atención: ¿realmente deseas salir de la aplicación?</p>
            <div className="modal__buttons">
               <button className="modal__stay"
                  onClick={setCSSClass}>No,permanecer
               </button>
               <button className="modal__close"
                  onClick={handleLogout}>Salir de la app
               </button>
            </div>
         </div>
      </section>
   )
}

export default MyModal
