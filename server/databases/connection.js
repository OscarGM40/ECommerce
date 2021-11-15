require("dotenv").config();
const mongoose = require("mongoose");

(async () => {
  try {
    await mongoose.connect( process.env.MONGO_URI , {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    });
  } catch (error) {
    console.error(error);
  }
})();

mongoose.connection.on("error", (err) => {
  console.log("Error en MongoDb de tipo:", err);
  process.exit();
});

mongoose.connection.on("connected", (data) => {
  console.log(`Conectado a la base de datos ${mongoose.connection.name}`);
});

