import express from 'express'
import { handler } from './dist/server/entry.mjs'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const PORT = process.env.PORT || 3000

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.static(__dirname + '/dist/client'))
app.use(handler);

app.listen(PORT);

console.log(`listening on :${PORT}`)
