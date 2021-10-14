import RandomNickname from '@sugarfish/random-nickname'
import Cors from 'cors'

const cors = Cors({
    methods: ['GET', 'HEAD'],
    origin: ['http://localhost:3000', 'http://www.sugarfish.top:3000']
})

const nickname = new RandomNickname()


function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
      fn(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
  
        return resolve(result)
      })
    })
  }

export default async (req, res) => {
    await runMiddleware(req, res, cors)
    const name = nickname?.getRandomName?.()
    res.status(200).json({ text: name })
}