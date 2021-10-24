import path from "path";
let __dirname = path.dirname(process.argv[1]);
import express from "express";
import cors from "cors";
import Enqueue from "express-enqueue";
import compression from "compression";
const highWaterMark =  2;
import formidableMiddleware from "express-formidable";
let app = express();
app.use(compression())
app.use(cors({ credentials: true }));
app.use(formidableMiddleware());
const queue = new Enqueue({
    concurrentWorkers: 4,
    maxSize: 200,
    timeout: 30000
});
app.use(queue.getMiddleware());
app.use( express.static('dist'));

app.get('/*', async (req, res) => {
    res.sendFile('/src/index.html', { root: __dirname });
})
app.use(queue.getErrorMiddleware())

let port = process.env.PORT || 5477
app.listen(port ,() => {
    console.log('pid: ', process.pid)
    console.log('listening on http://localhost:'+ port);
});