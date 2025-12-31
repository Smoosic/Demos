const express = require('express');
const fs = require('fs');
const path = require('path');
const fileRoot = path.join(__dirname);
const app = express();
const port = 3001;
app.use(express.static(fileRoot));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})