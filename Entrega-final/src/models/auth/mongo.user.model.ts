import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from './user.interfaces';

const userSchema = new Schema<IUser>({
    fullName: { type: String, required: true },
    cellPhone: { type: Number, trim: true, required: true },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: /.+\@.+\..+/,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
});

userSchema.pre('save', async function (next) {
    const user = this;
    const hashedPassword = await bcrypt.hash(user.password, 10);
    this.password = hashedPassword;
    next();
});

userSchema.methods.comparePassword = async function (password: string) {
    const user = this;
    const passwordComparisonResult = await bcrypt.compare(password, user.password);
    return passwordComparisonResult;
};

export default model<IUser>('user', userSchema);
