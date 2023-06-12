import app from './app.js'
import db from './db.js'

db()

app.listen(4000)
console.log('Server on port', 4000)
