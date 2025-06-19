const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://namastedev:BxRZ7ZcDUvdnKiPe@namastenode.gtpurhp.mongodb.net/devTinder"
  );
};

module.exports = { connectDB };
