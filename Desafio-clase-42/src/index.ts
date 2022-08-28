import axios from 'axios';

const get = async () => {
	try {
		const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
		console.log('post:', data);
	} catch (err: any) {
		console.log(err);
	}
};

get();
