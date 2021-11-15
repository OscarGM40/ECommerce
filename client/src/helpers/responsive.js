import {css} from "styled-components";

/* export const mobile = (props) => {
   return css`
   @media only screen and (max-width:380px){
      ${props}
   }`
} */

// lo simplifico de aqui arriba ↑↑ quitando el return y las llaves ↓↓
//cuando llame a mobile se infiere a esta media query todo simplemente(donde esta $props)
export const mobileportrait = (props) => css`@media only screen and (max-width:420px){ 
   ${props} } `;


export const mobilelandscape = (props) => css`@media only screen and (max-width:692px) { 
   ${props} }`; //ojo que quité el return y las llaves

export const tablet = (props) => css`@media only screen and (max-width:992px) {
   ${props} }`; //de nuevo sin return ni llaves