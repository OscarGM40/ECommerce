import {css} from "styled-components";

export const mobileportrait = (props) => {
   return css`
     @media only screen and (max-width: 420px) {
        ${props}
     }
   `;
}

export const mobilelandscape = (props) => {
   return css`
     @media only screen and (max-width:678px) {
        ${props}
     }
   `;
}

export const tablet = (props) => {
   return css`
     @media only screen and (max-width:992px) {
        ${props}
     }
   `;
}

export const mediumScreens = (props) => {
   return css`
     @media only screen and (max-width:1500px) {
        ${props}
     }
   `;
}