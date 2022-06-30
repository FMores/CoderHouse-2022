const socket = io.connect();

//CODIGO PARA MANEJO DE CHAT

const schemaAuthor = new normalizr.schema.Entity('author', {}, { idAttribute: 'email' });

const schemaMensaje = new normalizr.schema.Entity('post', { author: schemaAuthor }, { idAttribute: '_id' });

const schemaMensajes = new normalizr.schema.Entity('posts', { mensajes: [schemaMensaje] }, { idAttribute: '_id' });

const denormalizrFunc = (data) => normalizr.denormalize(data.result, schemaMensajes, data.entities);

const renderMsg = (data) => {
	let newTextArea = data.messages
		.map((el) => {
			return `<div >
	        <div class="el-author">${el.author.email}</div>
	        <div class="el-timestamp">[${el.timestamp}]:</div>
	        <p class="el-text">${el.text} <img width="20" height="20" src=${el.author.avatar}></p>
	        </div>`;
		})
		.join('');

	if (document.getElementById('textarea')) {
		document.getElementById('textarea').innerHTML = newTextArea;
		document.getElementById('textarea').scrollTop = document.getElementById('textarea').scrollHeight;
		document.getElementById('ratio').innerText = `${data.ratio}% de compresion con normalizr`;
	}
	return;
};

const sendMessage = () => {
	var select = document.getElementById('language');
	var avatar = select.options[select.selectedIndex].value;

	const new_msg = {
		email: document.getElementById('email').value,
		name: document.getElementById('name').value,
		surname: document.getElementById('surname').value,
		age: document.getElementById('age').value,
		alias: document.getElementById('alias').value,
		avatar: avatar,
		text: document.getElementById('msg').value,
	};

	for (let value in new_msg) {
		if (new_msg[value] === '') {
			alert(`Debes completar todos los campos para poder enviar el mensaje`);
			return;
		}
	}

	socket.emit('new-msg', new_msg);

	return;
};

socket.on('mensajes', (currentMsg) => {
	if (currentMsg) {
		const messagesDenormalized = denormalizrFunc(currentMsg);

		const dataNormalized = JSON.stringify(messagesDenormalized).length;
		const dataOriginal = JSON.stringify(currentMsg).length;

		const compressionRatio = parseInt(((dataOriginal - dataNormalized) / dataOriginal) * 100);

		renderMsg({ messages: messagesDenormalized.data, ratio: compressionRatio });
	}
});

//CODIGO PARA MANEJO DE LISTA DE PRODUCTOS

const render_products = (current_products) => {
	const new_product = current_products
		.map((el) => {
			return `<tr>
        <th class='th-id' scope='row'>${el._id}</th>
        <td>${el.name}</td>
        <td>${el.price}</td>
        <td>
            <img src=${el.image} width='50' height='50' alt=${el.name} />
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

//CODIGO PARA MANEJO DE LISTA DE PRODUCTOS FAKER

const render_fake_products = (fakeProducts) => {
	const fake_products_html = fakeProducts
		.map((el) => {
			return `<tr>
        <th class='th-id' scope='row'>${el._id}</th>
        <td>${el.name}</td>
        <td>${el.price}</td>
        <td>
            <img src=${el.image} width='50' height='50' alt=${el.name} />
        </td>
    </tr>`;
		})
		.join('');

	if (document.getElementById('fake-body')) {
		document.getElementById('fake-body').innerHTML = fake_products_html;
	}
	return;
};

socket.on('fake-product-list', (fakeProducts) => {
	if (fakeProducts) {
		render_fake_products(fakeProducts);
	}
});
