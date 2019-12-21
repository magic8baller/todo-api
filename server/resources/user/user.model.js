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
	if (!this.isNew || !this.isModified('password')) {
return next()
	}
		bcrypt.hash(this.password, saltRounds, (error, hashedPassword) => {
			if (error) {
				next(error);
			} else {
				this.password = hashedPassword;
				next();
			}
		});
	});

UserSchema.methods.checkPassword = function (password) {
	const encryptedPassword = this.password
	return new Promise((resolve, reject) => {
		bcrypt.compare(password, encryptedPassword, (err, verifiedPassword) => {
			if (err) {
				return reject(err)
			}
			resolve(verifiedPassword)
		})
	})
}

const User = mongoose.model('User', UserSchema)

export default User