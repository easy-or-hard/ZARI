import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root {
  /* font-size */
  --title-font: 2.2rem;
  --main-font : 1.6rem;
  --button-font : 1.8rem;

  /* color */
  --black-color : #161616;
  --gray-color: #d9d9d9;
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
h2 {margin:0; padding: 0;}
`;

export default GlobalStyle;
