import { Box, CircularProgress, Container, Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useEffect, useState } from 'react'
import { getProducts } from '../../servicios/productService';
import { ProductCardView } from './ProductCardView';

export const CatalogView = ({ handler }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const findAllProducts = async() => {
        const data = await getProducts();
        setTimeout(() => {
            
            setProducts(data);
            setIsLoading(false);
        }, 500)
       
    }

    useEffect(() => {        
        findAllProducts();
    }, []);
    
  return (
      <>
        { isLoading &&    
              <Box align='center' sx={{ marginTop: 40 }}>
                  <CircularProgress color="secondary" size="3rem"/>
              </Box> 
        }
          <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                  {products.map((prod, index) => (
                      <Grid key={prod.id} size={{ xs: 12, sm: 6, md: 4, lg: 4 }} sx={{ marginTop: 5 }}>
                         <ProductCardView handler={handler}
                         index={index} name={prod.name} description={prod.description} price={prod.price} id={prod.id} />
                      </Grid>
                  ))}
              </Grid>
          </Box>

      </>
  )
}
