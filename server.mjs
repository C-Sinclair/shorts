import express from 'express'
import { handler } from './dist/server/entry.mjs'

const PORT = process.env.PORT || 3000

const app = express();
app.use(express.static('./public'))
app.use(handler);

app.listen(PORT);

console.log(`listening on :${PORT}`)
