//*------ PARA MANEJO DE LISTA DE PRODUCTOS ------*//

const render_products = (current_products) => {
	const new_product = current_products
		.map((el) => {
			return `<tr>
        <th class='th-id' scope='row'>${el._id}</th>
        <td>${el.name}</td>
        <td>$${el.price}</td>
        <td>
            <img src=${el.thumbnail} width='50' height='50' alt=${el.name} />
        </td>
		<td>
			<button id= "addItem" id-product=${el._id}
            type="button" style="font-size:30px; border-radius:50%; 
            background-color: white"></i>&#128722;</button>
		</td>
    </tr>`;
		})
		.join('');

	if (document.getElementById('tbody')) {
		document.getElementById('tbody').innerHTML = new_product;
	}
	return;
};

const send_new_product = () => {
	const name = document.getElementById('name').value;

	const price = Number(document.getElementById('price').value);

	const thumbnail = document.getElementById('thumbnail').value;

	const new_product = { name, price, thumbnail };

	socket.emit('new_product', new_product);
};

let current_products = null;

socket.on('product-list', (currentProducts) => {
	if (currentProducts) {
		render_products(currentProducts);
		current_products = currentProducts;
	}
});

//*------ PARA MANEJO DE CARRITO ------*//

window.onload = (ev) => {
	if (!localStorage.getItem('cart')) {
		localStorage.setItem('cart', '[]');
	}
};

const stored_cart = JSON.parse(localStorage.getItem('cart'));

const addItemToCart = (item_id) => {
	let searched_product = null;

	for (i of current_products) {
		if (i._id === item_id) {
			searched_product = i;
		}
	}

	if (!searched_product) {
		return;
	}

	for (i of stored_cart) {
		if (i._id === item_id) {
			i.qty++;

			return;
		}
	}

	searched_product.qty = 1;
	stored_cart.push(searched_product);
	localStorage.setItem('cart', JSON.stringify(stored_cart));
};

const catalogue = document.getElementById('catalogue');

catalogue.addEventListener('click', (ev) => {
	ev.preventDefault();

	if (ev.target.id === 'addItem') {
		const prod_id = ev.target.attributes['id-product'].value;

		addItemToCart(prod_id);
	}
});
