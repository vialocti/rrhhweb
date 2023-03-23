import React from 'react'

const FormEdadAgentesPage = () => {
  return (
    <>
    <Wrapper>
    <div className='container ml-4'>


            <div className='row'>
            <div className='col-md-4'>
            <Form.Label htmlFor="busqueda"> Edad Seleccionada </Form.Label>
            <FormControl 
            type="text"
            id="anio"
            onChange={onHandleChange}
            value={anio}
            
          />


            </div>
            


            <div className='col-md-2'>

            </div>

            <div className='col-md-2'>
                <br/>

                <Button
                onClick={buscarInfo}
                 >
                 Ver Información

                </Button>
            </div>
          </div>                     


    </div>  
    </Wrapper>
    
    </>
  )
}

export default FormEdadAgentesPage