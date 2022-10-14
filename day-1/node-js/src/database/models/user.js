const mongoose = require('mongoose');
const { bcrypt, jwt } = require('../../utils');

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

// Password encryption
UserSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hashPassword(user.password);
    }

    next();
});

// Check password match
UserSchema.methods.matchPassword = function (userPassword) {
    return bcrypt.verifyPassword(userPassword, this.password);
};

// Generate authentication token
UserSchema.methods.generateToken = function () {
    const token = jwt.generateAccessToken({
        id: this._id.toString(),
    });

    return token;
};

module.exports = mongoose.model('User', UserSchema);
