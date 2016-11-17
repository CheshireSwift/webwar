import * as express from 'express'

var app = express()

app.get('/', function (req: any, res: any) {
  res.send('Hello World!')
})

const port = process.env['PORT'] || 9000
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})
