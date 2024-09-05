import { calculateTotal, getInvoice } from "./servicios/getInvoice";

// --Material ui component table--
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Button, Container } from "@mui/material";

// Grid
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { ClientView } from "./components/ClientView";
import { CompanyView } from "./components/CompanyView";
import { ListItemsView } from "./components/ListItemsView";
import { InvoiceView } from "./components/InvoiceView";
import { TotalView } from "./components/TotalView";

import TextField from '@mui/material/TextField';
import { useEffect, useState } from "react";
import { InitialInvoice } from "./data/invoice";
import { FormItemsView } from "./components/FormItemsView";

// Grid
// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//     ...theme.applyStyles('dark', {
//       backgroundColor: '#1A2027',
//     }),
// }));


export const InvoiceApp = () => {
    //Primero se inicializan los useStates, nota: cada que se modifica una propiedad del usestate se redibuja todo
    const [invoice, setInvoice] = useState(InitialInvoice);
    const [items, setItems] = useState([]);
    const [counter, setCounter] = useState(4);
    const [total, setTotal] = useState(0);
    const [activeForm, setActiveForm] = useState(false);

    const { id, name, client, company } = invoice;   
   

    //Despues viene el useEffect que es el que realiza los eventos secundarios cuando una propiedad del state cambia
    useEffect(() => {
        const data = getInvoice();
        setInvoice(data);
        setItems(data.items); 
        setTotal(data.total);       
    }, []);

    useEffect(() => {
        setTotal(calculateTotal(items));
    }, [items]);
    
    //Al final van los metodos
    const handlerAddItems = ({ product, price, quantity }) => {
       setItems([...items, { id: counter, product: product.trim(), price: parseInt(price.trim(), 10), quantity: parseInt(quantity.trim(), 10) }]);
       setCounter(counter + 1);
    }

    const handlerDeleteItem = (id) => {
        setItems(items.filter(item => item.id !== id));
     }

    const onActiveForm = () => {
        setActiveForm(!activeForm);
    }
    return (
        <>
            <Container maxWidth="lg" sx={{ marginTop: 5 }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <InvoiceView id={id} name={name} />
                        </Grid>
                        <Grid size={6} sx={{ marginTop: 5 }}>
                            <ClientView client={client} />
                        </Grid>
                        <Grid size={6} sx={{ marginTop: 5 }}>
                            <CompanyView company={company} />
                        </Grid>
                        <Grid size={12} sx={{ marginTop: 5 }}>
                            <ListItemsView items={items} handlerDeleteItem={handlerDeleteItem}/>
                            <TotalView total={total} />
                        </Grid>
                    </Grid>
                </Box>               
                <Button  variant="contained" color="success" onClick={ onActiveForm }>{ activeForm ? 'Ocultar form' : 'Agregar item' }</Button>
                { activeForm && <FormItemsView handler={(newItem) => handlerAddItems(newItem)}/> }
                {/* Lo que se hace es generar una propiedad handler en el componente hijo FormItemsView, y  cuando se mande a llamar el handler() va a gatillar una funcion callback que ejecuta el metodo handlerAddItems */}
                {/*Tambien se puede entender d ela siguiente manera: el componente hijo FormItemsView recibe la funcion handlerAddItems a travez de su propiedad handler, y  cuando este ejecute el metodo handler() pasandole el objeto que requiere como
                como parametro, este dispara la funcion del componente padre */}
            </Container>
        </>
    )
}