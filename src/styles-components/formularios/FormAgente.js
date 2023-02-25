import styled, { css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const colores={
    borde:"#0075FF",
    error:"#BB2929",
    exito:"#1ED12D",
}

const Formulario = styled.form`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 40px;
    padding: 8px;
    border: solid 2px rgb(126,126,126);

    @media(max-width:900px){
        grid-template-columns: 1fr;
    }

`
const Label = styled.label`
    display: block;
    font-weight: 700;
    padding: 10px;
    min-height: 40px;
    cursor: pointer;
    ${props => props.valido==='false' && css`
        color:${colores.error};
    `}
`

const GroupInput = styled.div`
    position: relative;
    z-index: 99;

`
const Input = styled.input`
    
    width:100%;
    background:'#FFF';
    border-radius: 4px;
    height: 35px;
    line-height: 35px;
    padding: 0 40px 0 10px;
    transition: .3s ease all;
    border:3px solid transparent;

    &:focus{
        border:3px solid ${colores.borde};
        outline: none;
        box-shadow: 3px 0px 30px rgba(170,170,170,0.5);
    }

    ${props => props.valido==='true' && css`
        border:3px solid transparent;
    `}

    ${props => props.valido==='false' && css`
        border:3px solid ${colores.error} !important
    `}
    
    `
    const LeyendaError=styled.p`
        font-size: 12px;
        margin-bottom: 0px;
        color: ${colores.error};
        display:none; 

        ${props => props.valido === 'true' && css`
            display:none
        `}

        ${props => props.valido === 'false' && css`
            display:block;
        `}
        
    `

    const IconoValidacion=styled(FontAwesomeIcon)` 
        position: absolute;
        right: 10px;
        bottom: 14px;
        z-index: 100;
        font-size: 16px;
        opacity:0;

        ${props => props.valido === 'false' && css`
            opacity:1;
            color:${colores.error}
        `}

        ${props => props.valido === 'true' && css`
            opacity: 1;
            color:${colores.exito}
        `}


    `

    const ContenedorBoton=styled.div`
        margin-top: 35px;
        margin-left: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    `
    const Boton = styled.button`
        height: 45px;
        line-height:45px;
        width:50% ;
        color: #FFF;
        background: #04B;
        font-weight: bold;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: .1s ease all;

        &:hover{
            box-shadow: 3px 0px 30px rgba(1,150,150,1);
        }

    `

    const MensageExito=styled.p`
        font-size: 16px;
        color: ${colores.exito};
        display:none;
    `

    const SelectorV = styled.select`
        
        width:100%;
        background:'#FFF';
        border-radius: 4px;
        height: 35px;
        line-height: 35px;
        padding: 0 20px 0 10px; 
    
    `    
    const CabTitulo =styled.h4`
        width: 90%;
        text-align:center;
  
        background-color:aquamarine;
        padding: 5px;
        
`
    const CabTituloAgente =styled.h5`
        width: 90%;
        text-align:left;
        background-color:blue;
        padding: 5px;
        color: white;
    `
    const CabTituloCargo =styled.h5`
        width: 90%;
        text-align:left;
        background-color:blue;
        padding: 5px;
        color: white;
    `

    const LabelF = styled.label`
        font-weight: bold;
        
        margin-top: 5px;
        margin-bottom: 12px;
    `
export {Formulario,
        Label,
        GroupInput,
        Input, 
        IconoValidacion,
        LeyendaError, 
        ContenedorBoton, 
        Boton,
        MensageExito,
        SelectorV,
        LabelF,
        CabTitulo,
        CabTituloAgente,
        CabTituloCargo
    
    }