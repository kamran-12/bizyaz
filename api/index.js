const r = require;
const app = r('express')();
const { MONGO_USER, MONGO_PASSWORD, MONGO_DEFAULT_DATABASE } = r("./config");
const MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0-ubk6r.gcp.mongodb.net/${MONGO_DEFAULT_DATABASE}`;

[r('cors')(), r('helmet')(), r('morgan')('combined'), r('body-parser').json(),
(q, s, n) => { console.log(`body: ${JSON.stringify(q.body)}, auth-header: ${q.headers.auth}`); n(); },
r('./middleware/multer-image').multer, r('./middleware/auth'), r('./controllers/exports')]
    .forEach(x => { app.use(x); });

r('mongoose').connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: false })
    .then(() => { console.log(`backend listening`) })
    .catch((error) => { console.log(`[DB ${MONGO_DEFAULT_DATABASE} CONNECTION FAIL] ${error}`) })

module.exports = { path: "/api/", handler: app };