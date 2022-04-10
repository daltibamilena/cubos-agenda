const express = require("express");

const app = express();
const port = 3000;
app.use(express.json());
require("./routes")(app);

app.use((err, req, res, next) => {
  next(err);
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app