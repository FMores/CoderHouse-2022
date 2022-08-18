import moment from 'moment';

export const date_creator = (date?: string) => {
	return new Promise<string>((resolve, reject) => {
		resolve(moment(date).format('DD-MM-YY hh:mm:ss a'));
	});
};
