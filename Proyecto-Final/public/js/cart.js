//-------------------------------------------------//
//*------ PARA MANEJO DE LISTA DE PRODUCTOS ------*//
//-------------------------------------------------//

// Obtengo lista de productos y lo renderizo
const getProductsFromDb = async () => {
	await fetch('http://localhost:8080/api/products')
		.then((response) => response.json())
		.then((prod_list) => render_products(prod_list));
};

const postProductToDb = async (new_product) => {
	await fetch('http://localhost:8080/api/products', {
		method: 'post',
		body: JSON.stringify(new_product),
		headers: { 'Content-Type': 'application/json' },
	});
};

window.addEventListener('load', (event) => {
	getProductsFromDb();
});

const render_products = (current_products) => {
	const new_product = current_products.products
		.map((el) => {
			return `<tr>
	    <td>${el.name}</td>
		<td>${el.description}</td>
	    <td>$${el.price}</td>
	    <td>
	        <img src=${el.photo} width='50' height='50' alt=${el.name} />
	    </td>
		<td>${el.category}</td>
		<td>${el.qty}</td>
		<td>
			<button id="addItem"
	        class="btn-addToCart"
	        id-product=${el.id}
	        type="button"></i>&#128722;</button>
		</td>
	</tr>`;
		})
		.join('');

	if (document.getElementById('prod-table')) {
		document.getElementById('prod-table').innerHTML = new_product;
	}
	return;
};

const send_new_product = async () => {
	//Obtengo los valores de cada campo para crear un nuevo producto.
	const name = document.getElementById('name').value;
	const price = Number(document.getElementById('price').value);
	const description = document.getElementById('description').value;
	const qty = Number(document.getElementById('qty').value);
	const photo = document.getElementById('image').value;
	const category = document.getElementById('category').value;

	const new_product_data = { name, description, price, photo, category, qty };

	await postProductToDb(new_product_data);

	await getProductsFromDb();
};

//-------------------------------------*//
//*------ PARA MANEJO DE CARRITO ------*//
//-------------------------------------*//

// Obtengo los datos del carrito.
const getFromCart = async () => {
	await fetch('http://localhost:8080/api/cart')
		.then((response) => response.json())
		.then((result) => render_cart(result.cart[0].items));
	return;
};

const postToCart = async (prod_id) => {
	await fetch('http://localhost:8080/api/cart', {
		method: 'POST',
		body: JSON.stringify({ prod_id }),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return;
};

const deleteProdFromCart = async (prod_id) => {
	await fetch(`http://localhost:8080/api/cart/${prod_id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return;
};

window.addEventListener('load', async (event) => {
	await getFromCart();
	return;
});

// Renderizo los productos que hay en el carrito.
const render_cart = (cart) => {
	const cart_items = cart
		.map((el) => {
			return `
        <tr>
            <td>
                <img src=${el.product.photo} width='50' height='50' alt=${el.product.name} />
            </td>
            <td>${el.product.name}</td>
			<td>${el.product.description}</td>
            <td>$${el.product.price}</td>
            <td>${el.qty}</td>
            <td>$${el.qty * el.product.price}</td>
		    <td>
			    <button id="addItem" 
                class="w3-button w3-xlarge w3-teal" 
                id-product=${el.product._id}
                type="button">+</button>
                <button id="deleteItem" 
                class="w3-button w3-xlarge w3-red w3-card-4" 
                id-product=${el.product._id}
                type="button">-</button>
		    </td>
        </tr>`;
		})
		.join('');

	if (document.getElementById('cart-table')) {
		document.getElementById('cart-table').innerHTML = cart_items;
	}
	return;
};

const addItemToCart = async (item_id) => {
	await postToCart(item_id);
	await getFromCart();
	return;
};

const deleteItemFromCart = async (item_id) => {
	await deleteProdFromCart(item_id);
	await getFromCart();
	return;
};

// Confirmo compra y limpia el carrito
const checkout = async () => {
	await fetch('http://localhost:8080/api/cart/checkout', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	await getFromCart();
	return;
};

// Agrego un listener a todos los botones del form product list.
const catalogue = document.getElementById('catalogue');

// Agrego un producto al carrito pasando el id.
catalogue.addEventListener('click', async (ev) => {
	ev.preventDefault();

	if (ev.target.id === 'addItem') {
		const prod_id = ev.target.attributes['id-product'].value;
		addItemToCart(prod_id);
	}
});

// Agergar o restar cantidad del producto desde carrito
const catalogue_cart = document.getElementById('catalogue-cart');

catalogue_cart.addEventListener('click', async (ev) => {
	ev.preventDefault();

	if (ev.target.id === 'addItem') {
		const prod_id = ev.target.attributes['id-product'].value;
		await addItemToCart(prod_id);
		await getFromCart();
		render_cart();
		return;
	}

	if (ev.target.id === 'deleteItem') {
		const prod_id = ev.target.attributes['id-product'].value;
		await deleteItemFromCart(prod_id);
		await getFromCart();
		render_cart();
		return;
	}

	if (ev.target.id === 'checkout') {
		await checkout();
		return;
	}
});
