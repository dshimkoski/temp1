require('dotenv').config()

const nodemon = require('nodemon')
const ngrok = require('ngrok')
const port = process.env.PORT || 3000

nodemon({
  script: 'src/main.js',
  ext: 'js',
})

let url = null

nodemon
  .on('start', async () => {
    if (!url) {
      await ngrok.authtoken(process.env.NGROK_AUTH_TOKEN)
      url = await ngrok.connect({ port })
      console.log(`Server now available at ${url}`)
      console.log('Open the ngrok dashboard at: http://localhost:4040\n')
    }
  })
  .on('quit', async () => {
    await ngrok.kill()
  })
