# Desafio clase 43

1- Obtener todos los productos: Query => productFindMany().
Los campos son opcionales, pero siempre se debe indicar uno.

    {
        productFindMany(limit:200){
                name,
                price
            }
    }

2- Obtener un producto por ID: Query => productFindById().

    {
        productFindById(_id:"62fd97197b049e5f915b9997"){
            _id
        }
    }

3- Crear un nuevo producto: Mutation => productCreateOne(record:{args})

    mutation{
        productCreateOne(record:{name:"Zapatillas", price:3000, thumbnail:"foto-zapatillas", timestamp:"28-08-22 21:28 pm"}){
                record {
                    name,
                    price,
                    thumbnail,
                    timestamp
                }
            }
        }

4- Actualizar un producto por ID: Mutation => productUpdateById().

    mutation{
    	    productUpdateById(record:{name:"Zapas"}, _id:"630c0861063f45cf0d1a050a"){
    	    record{
                 name
                }
            }
        }

5- Eliminar producto por ID: Mutation => productDeleteById().

    mutation{
        productDeleteById(_id:"62fd97197b049e5f915b9997"){
            recordId
        }
    }
