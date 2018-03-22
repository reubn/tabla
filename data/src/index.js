import {createWriteStream, writeFile} from 'fs'
import {promisify} from 'util'

import fetch from 'node-fetch'
import cheerio from 'cheerio'
import makeDir from 'make-dir'
import sqlite from 'sqlite'

import formatElement from './formatElement'

const cacheFolder = `${__dirname}/../cache`
const cacheFilename = `${cacheFolder}/data.db`

const distFolder = `${__dirname}/../dist`
const distFullFilename = `${distFolder}/full.json`
const distBasicFilename = `${distFolder}/basic.json`
const distIndividualFilename = atomicNumber => `${distFolder}/${atomicNumber}.json`


const dataUrl = 'https://bitbucket.org/lukaszmentel/mendeleev/raw/tip/mendeleev/elements.db'

const go = async () => {
  const cacheDirectory = makeDir(cacheFolder)
  const distDirectory = makeDir(distFolder)

  const writeStream = createWriteStream(cacheFilename)
  const writePromise = new Promise(resolve => writeStream.on('finish', resolve))

  const request = await fetch(dataUrl)
  console.log('Fetched')

  await cacheDirectory
  request.body.pipe(writeStream)
  await writePromise
  console.log('Written')

  const db = await sqlite.open(cacheFilename, {Promise})
  console.log('Opened')

  const elementsData = await db.all('SELECT * FROM elements')
  const ieData = await db.all('SELECT * FROM ionizationenergies')
  const isotopesData = await db.all('SELECT * FROM isotopes')
  const oxidationStatesData = await db.all('SELECT * FROM oxidationstates')

  const elements = elementsData.map(formatElement({ieData, isotopesData, oxidationStatesData})).map((element, index, all) => typeof element.ec[0] === 'string' ? {
    ...element,
    ec: [all.find(({s}) => s === element.ec[0]).an, element.ec.slice(1)]
  } : element)

  await distDirectory

  // Full
  writeFile(distFullFilename, JSON.stringify([0, ...elements]), () => console.log('Output Full'))

  // Basic
  writeFile(distBasicFilename, JSON.stringify([0, ...elements], ['n', 's', 'am', 'an', 'gb', 'ec', 'sh', 'su', 'e']), () => console.log('Output Basic'))

  // Individual
  elements.forEach(element => {
    writeFile(distIndividualFilename(element.an), JSON.stringify(element), () => console.log('Output', element.an))
  })
}
go()
