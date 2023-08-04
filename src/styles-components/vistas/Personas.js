import styled from "styled-components";
import { Button } from 'react-bootstrap'


const Formulario = styled.form` 
    margin-left: 10px;
    margin-right: 10px;
    padding: 10px;
    border: 1px solid black;
    border-radius: 10px;

`

const Wrapper = styled.section`
padding: 10px;
background:lightgray;
margin:10px;
border:1px solid #CCAACC;
border-radius: 10px;
`

const Boton = styled.button`
height: 45px;
line-height:45px;
width:30% ;
color: '#FFF';
background: '#FFF';
font-weight: bold;
border: none;
border-radius: 8px;
cursor: pointer;
transition: .1s ease all;

&:hover{
    box-shadow: 3px 0px 30px rgba(0,150,150,1);
}`

export {
    Formulario,
    Wrapper,
    Button
}
