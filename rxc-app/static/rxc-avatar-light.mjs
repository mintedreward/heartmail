import * as fs from 'fs'

const image = fs.readFileSync('./rxc-avatar-light.png', 'base64')

console.log(image)
