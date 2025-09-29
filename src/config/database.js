const mongoose = require('mongoose');
//Connect to cluster database
// mongoose.connect("mongodb+srv://namastedev:hrVEwcZzK8Ok17Ha@namastenode.ymvucgk.mongodb.net/");
//-> returns a promise, so good way is to write async await.
const connectDB = async() => {
    await mongoose.connect("mongodb+srv://sachin08:sachin123@namastenode.sjytjjc.mongodb.net/devTinder");

}
//mongodb+srv://sachinjsdev:hrVEwcZzK8Ok17Ha@namastenode.g5gscu1.mongodb.net/

module.exports = connectDB;
// connectDB()
// .then(() => {
//     console.log("DB connected");
// }).catch((err) => {
//     console.log("DB connection can't be done");
//     //EGXIiyksdgmW87ra
// })
