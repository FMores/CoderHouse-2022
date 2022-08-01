import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
	full_name: { type: String, required: true },
	adress: { type: String, required: true },
	age: { type: Number, required: true },
	phone_number: { type: String, required: true },
	profile_picture: { type: String, rquired: true },
	email: {
		type: String,
		required: true,
		unique: true,
		match: /.+\@.+\..+/,
	},
	password: {
		type: String,
		required: true,
	},
});

userSchema.pre('save', async function (next) {
	const user = this;
	const hashedPwd = await bcrypt.hash(user.password, 10);
	this.password = hashedPwd;
	next();
});

userSchema.methods.comparePwd = async function (password: string) {
	const user = this;
	const pwdComparisonResult = await bcrypt.compare(password, user.password);
	return pwdComparisonResult;
};

export default model('user', userSchema);
