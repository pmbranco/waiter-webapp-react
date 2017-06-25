import compression from 'compression';
import express from 'express';
import path from 'path';
import fs from 'fs';
import React from 'react';
import serverSideRendering from "./middlewares/express/server_side_rendering";


const app = express();
const assetsDir = path.resolve(__dirname, '..', '..', 'src', 'ui', 'assets');
let manifest;

if (process.env.NODE_ENV === 'development') {
  require('../webpack.dev').default(app);
  manifest = require("./manifest.dev");
}
else {
  const manifestPath = `${process.cwd()}/dist/manifest.json`;
  manifest = JSON.parse(fs.readFileSync(manifestPath));
}

app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use('/assets', express.static(assetsDir, {maxAge: 365 * 24 * 60 * 60}));
app.use(compression());
app.use(serverSideRendering(manifest));

export default app;