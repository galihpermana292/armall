import { createGlobalStyle } from 'styled-components';
import theme from './index';
const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;1,100;1,200;1,300;1,400&display=swap');

  * {
    margin:0;
    padding:0;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
  box-sizing: border-box;
  /* font-size: 62.5% * 2;
     @media only screen and (max-width:56.25em){
        font-size: 50%;
    } 
    @media only screen and (max-width:37.5em){
        font-size: 43.75%;
    }  
  } */
  font-size: 81.25%;
    @media only screen and (max-width:56.25em){
        font-size: 80%;
    } 
    @media only screen and (max-width:37.5em){
        font-size: 43.75% * 3;
    } 
  } 
  
  body {
    font-family: "Work Sans", sans-serif;
    font-weight: 400;
    min-height:100vh;
    width:100%;
  }
`;
export default GlobalStyles;
