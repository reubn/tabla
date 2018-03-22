import fs from 'fs'

import fetch from 'node-fetch'
import cheerio from 'cheerio'
import makeDir from 'make-dir'
import sqlite from 'sqlite'

import groupBlocks from './groupBlocks.json'

const cacheFolder = `${__dirname}/../cache`
const cacheFilename = `${cacheFolder}/data.db`
const dataUrl = 'https://bitbucket.org/lukaszmentel/mendeleev/raw/tip/mendeleev/elements.db'

const go = async () => {
  const writeStream = fs.createWriteStream(cacheFilename)
  const writePromise = new Promise(resolve => writeStream.on('finish', resolve))
  makeDir(cacheFolder)

  const request = await fetch(dataUrl).catch(e => console.error(e))
  console.log('Fetched')

  request.body.pipe(writeStream)
  await writePromise
  console.log('Written')

  const db = await sqlite.open(cacheFilename, {Promise})
  console.log('Opened')

  const elements = await db.all('SELECT * FROM elements')
  console.log(elements[0])
}
go()
