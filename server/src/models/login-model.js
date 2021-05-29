const mongoose = require('../../node_modules/mongoose');

const loginSchema = mongoose.Schema({
    email: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    senha: {
        type: mongoose.Schema.Types.String,
        required: true
    }
});