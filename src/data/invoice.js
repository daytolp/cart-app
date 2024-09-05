export const invoice = {
    id: 10,
    name: 'Componentes PC',
    client: {
        name: 'Juan',
        lastName: 'Luna',
        address: {
            country: 'USA',
            city: 'Los Angeles',
            street: 'One Street',
            number: 56
        }
    },
    company: {
        name: 'New Egg',
        fiscalNumber: 123456
    }, 
    items: [
        {
            id: 1,
            product: 'Cpu intel i7',
            price: 499,
            quantity: 1
        },
        {
            id: 2,
            product: 'Corsair Keyboard Mecanico',
            price: 150,
            quantity: 1
        },
        {
            id: 3,
            product: 'Monitor Asus',
            price: 350,
            quantity: 1
        }
    ]

}

export const InitialInvoice = {
    id: 0,
    name: '',
    client: {
        name: '',
        lastName: '',
        address: {
            country: '',
            city: '',
            street: '',
            number: 0
        }
    },
    company: {
        name: '',
        fiscalNumber: 0
    }, 
    items: []

}