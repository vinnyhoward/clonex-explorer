import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
    padding:0;
    margin: 0;
    box-sizing: border-box;
    color: inherit;
    text-decoration: none;

html {
    font-family: 'Arial', sans-serif;
    font-size: 16px;
    line-height: 1.5;
}

body {
    background: #fff; 
    color: #333;
}

img, embed, object, video {
    max-width: 100%;
    height: auto;
}

ul, ol {
    list-style: none;
}

table {
    border-collapse: collapse;
    width: 100%;
}

html, body {
    overflow-x: hidden;
}

:focus {
    outline: none;
}

html, body {
    height: 100%;
    min-height: 100%;
}
`;