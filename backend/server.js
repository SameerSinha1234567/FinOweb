const dotenv = require("dotenv");
dotenv.config();

const app = require("./src/app");          // Line 4
const openDatastore = require("./src/config/datastore");

openDatastore();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`FinoWeb backend live on port ${PORT}`);
});


