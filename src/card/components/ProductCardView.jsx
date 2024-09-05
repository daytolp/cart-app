import { faPlus, faAdd } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MENU } from '../../reducer/itemsActions'

export const ProductCardView = ({ handler, index, name, description, price, id }) => {
    const navigate = useNavigate();
    const onAddProduct = (product) => {
        handler(product);
        navigate(MENU[2].link);
    }



    return (
        <>
            <Card sx={{ minwidth: 275, minHeight: 190 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{description}</Typography>
                    <Typography variant="body2">
                        {price}
                    </Typography>
                </CardContent>
                <CardActions>
                {index % 2 === 0 ? <Button size="small" variant="contained" color='success' onClick={ () => onAddProduct({ id, name, description, price })}
                                               startIcon={<FontAwesomeIcon icon={faPlus}  bounce style={{ '--fa-animation-duration': '1s', '--fa-animation-iteration-count': 1 }}  />}>Agregar</Button>
                        : <Button size="small" onClick={ () => onAddProduct({ id, name, description, price })}
                                  startIcon={<FontAwesomeIcon icon={faAdd}  color='#1976d2' bounce  style={{ '--fa-animation-duration': '1s', '--fa-animation-iteration-count': 1 }}  />}>Agregar</Button>}
                </CardActions>
            </Card>
        </>
  )
}
