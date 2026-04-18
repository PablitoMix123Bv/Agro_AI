import mongoose from "mongoose";

mongoose.connect("TU_URI_AQUI")
    .then(() => console.log("Conectado"))
    .catch(err => console.error(err));