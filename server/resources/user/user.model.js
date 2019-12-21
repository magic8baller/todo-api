import mongoose,{Schema} from 'mongoose'
import bcrypt from 'bcrypt'
const saltRounds = 10

const UserSchema = new Schema({
	name: {
	 type: String,
	 trim: true,
	 required: true
	},
	email: {
		type: String,
		trim: true,
		required: true
	},
	password: {
		type: String,
		trim: true,
		required: true
	}
})


UserSchema.pre('save', function (next) {
	if (this.isNew || this.isModified('password')) {
		bcrypt.hash(this.password, saltRounds, (error, hashedPassword) => {
			if (error) {
				next(error);
			} else {
				this.password = hashedPassword;
				next();
			}
		});
	} else {
		next();
	}
});

const User = mongoose.model('User', UserSchema)

export default User