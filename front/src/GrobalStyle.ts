import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root {
  /* font-size */
  --title-font: 2.2rem;
  --button-font : 1.8rem;
  --main-font : 1.6rem;
  --small-font : 1.4rem;

  /* color */
  --black-color : #161616;
  --gray-color: #b6b6b6;
  --blue-color: #20D8B7;
  --pupple-gd: linear-gradient(125deg, rgb(255,44,233), rgb(0,20,255));
  --pastel-gd: linear-gradient(125deg, rgb(120,163,235), rgb(251,194,235));
  --orange-gd: linear-gradient(125deg, rgb(255,246,185), rgb(255,0,91));
  --green-gd: linear-gradient(125deg, rgb(0,129,167), rgb(0,229,188));
}
html { font-size:62.5%}
body {
  margin: 0;
  font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  color: #fff;
  font-size:var(--main-font);
}
h2, button, input, ul, li {margin:0; padding: 0;}
button, input {
  background-color: transparent;
  border: none;
  cursor: pointer;
}
input::placeholder {color:var(--gray-color)}
li {list-style:none}
`;

export default GlobalStyle;
