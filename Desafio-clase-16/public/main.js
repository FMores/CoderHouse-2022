const socket = io.connect();

//CODIGO PARA MANEJO DE CHAT

const renderMsg = (currentMsg) => {
	let newTextArea = currentMsg
		.map((el) => {
			return `<div >
            <div class="el-author">${el.email}</div>
            <div class="el-timestamp">[${el.date}]:</div>
            <p class="el-text">${el.text}</p>
            </div>`;
		})
		.join('');
	document.getElementById('textarea').innerHTML = newTextArea;
	document.getElementById('textarea').scrollTop = document.getElementById('textarea').scrollHeight;
};

const sendMessage = () => {
	const msg = document.getElementById('msg').value;
	const email = document.getElementById('email').value;
	const new_msg = { text: msg, email: email };
	if (email === '') {
		alert('Debe ingresar una direccion de correo para poder enviar el mensaje');
	} else {
		socket.emit('new-msg', new_msg);
	}
	return;
};

socket.on('mensajes', (currentMsg) => {
	if (currentMsg) {
		renderMsg(currentMsg);
	}
});

//CODIGO PARA MANEJO DE LISTA DE PRODUCTOS

const render_products = (current_products) => {
	const new_product = current_products
		.map((el) => {
			return `<tr>
        <th class='th-id' scope='row'>${el.id}</th>
        <td>${el.title}</td>
        <td>$${el.price}</td>
        <td>
            <img src=${el.thumbnail} width='50' height='50' alt=${el.title} />
        </td>
    </tr>`;
		})
		.join('');
	document.getElementById('tbody').innerHTML = new_product;
};

const send_new_product = () => {
	const title = document.getElementById('title').value;
	const price = Number(document.getElementById('price').value);
	const thumbnail = document.getElementById('thumbnail').value;
	const new_product = { title, price, thumbnail };
	socket.emit('new_product', new_product);
};

socket.on('product-list', (currentProducts) => {
	if (currentProducts) {
		render_products(currentProducts);
	}
});
