const fs = require('fs')

const fetch = require('node-fetch')
const cheerio = require('cheerio')

const groupBlocks = require('./groupBlocks')

const atomicNumberToURL = atomicNumber => `https://www.rsc.org/periodic-table/element/${atomicNumber}`
const atomicNumberToCachePath = atomicNumber => `${__dirname}/../cache/${atomicNumber}`

const getFromRSC = atomicNumber => fetch(atomicNumberToURL(atomicNumber)).then(res => res.text()).catch(() => false)
const saveToCache = (atomicNumber, content) => new Promise(resolve => fs.writeFile(atomicNumberToCachePath(atomicNumber), content, err => resolve(err ? false : content)))
const getFromCache = atomicNumber => new Promise(resolve => fs.readFile(atomicNumberToCachePath(atomicNumber), (err, content) => resolve((err || content === 'false') ? false : content)))

const removeUnknown = (v, number=false) => ['Unknown', 'Not stable'].includes(v) ? undefined : (number ? +v : v)

const processPage = async (atomicNumber, content) => {
  const page = cheerio.load(content)
  return {
    atomicNumber,
    symbol: page('#murrayM').text().trim(),
    name: page('.element_header').text().trim(),
    group: (v => +v || v)(page('.text_bold.tdfirst_ca.trbox_ca:nth-of-type(2)').text().trim()),
    groupBlock: groupBlocks[atomicNumber],
    meltingPoint: (v => +((v.match(/([\d.]+?)\s?K/)||[])[1]) || undefined)(page('.border_right_none.text_bold.tdfirst_ca.trbox_ca').text().trim()),
    boilingPoint: (v => +((v.match(/([\d.]+?)\s?K/)||[])[1]) || undefined)(page('.border_right_none.text_bold.tlbox_even_ca.trbox_ca').text().trim()),
    density: (v => {
      const vs = (v.match(/([\d.]+)/g)||[]).map(s => +s)
      return vs.length > 1 ? vs : vs[0]
    })(page('tr:nth-of-type(3) > .border_right_none.text_bold.trbox_ca').text().trim()),
    atomicMass: (v => {
      if(v[0] === '[') return {
        mostStableIsotope: true,
        v: +v.replace(/\[|\]/g, '')
      }

      return +v
    })(page('.alternate_style:nth-of-type(4) > .border_right_none.text_bold.tdlast_ca.trbox_ca').text().trim()),
    keyIsotopes: (v => {
      const vs = (v.match(/(\d+)/g)||[]).map(s => +s)
      return vs.length > 1 ? vs : vs[0]
    })(page('tr:nth-of-type(5) > .border_right_none.text_bold.trbox_ca').text().trim()),
    ionisationEnergies: (vs => {
      const energies = []
      vs.each((i, e) => (energies[i] = +page(e).text()))

      const lastElement = energies.reverse().findIndex(v => !!v && !isNaN(v))
      if(lastElement === -1) return []
      return energies.slice(energies[0] ? 0 : lastElement).reverse()
    }
    )(page('.border_right_none.nbr.atomic_inner_grid_container .atomic_inner_grid > .text_bold.atomic_inner_grid_cell:nth-of-type(2)')),
    cas: page('.alternate_style:nth-of-type(6) > .border_right_none.text_bold.tdlast_ca.trbox_ca').text().trim(),
    period: +page('.text_bold.tlbox_even_ca.trbox_ca:nth-of-type(2)').text().trim(),
    block: page('.element_hover_table_ca > tbody > tr:nth-of-type(3) > .text_bold.trbox_ca:nth-of-type(2)').text().trim(),
    stateAt20c: page('.element_hover_table_ca > tbody > tr:nth-of-type(5) > .text_bold.trbox_ca:nth-of-type(2)').text().trim(),
    electronicConfiguration: (page('.alternate_style:nth-of-type(6) > .text_bold.tdlast_ca.trbox_ca:nth-of-type(2)').html() || '').trim()
      .split(/\s/)
      .reduce((a, b) => [
        ...a,
        ...b.split(/<\/?sup>/)
          .map(c => c.replace(/<\/?/, ''))], [])
      .reduce((done, part) => {
        if(part.includes('&') || !part.length) return done
        if(part[0] === '[') return [...done, part.replace(/\[|\]/g, '')]
        if(part.length > 1) return [...done, {shell: +part[0], subshell: part[1], electrons: ''}]

        const last = done.pop()

        return [...done, Object.assign({}, last, {electrons: +`${last.electrons}${part}`})]
      }, []),
    appearance: removeUnknown(page('.accordian_header:contains(Appearance) ~.accordian_details').text().trim()),
    uses: removeUnknown(page('.accordian_header:contains(Uses) ~.accordian_details').text().trim()),
    biologicalRole: removeUnknown(page('.accordian_header:contains(Biological role) ~.accordian_details').text().trim()),
    naturalAbundance: removeUnknown(page('.accordian_header:contains(Natural abundance) ~.accordian_details').text().trim()),
    history: removeUnknown(page('.accordian_block_his > .accordian_details').text().trim()),
    atomicRadius: removeUnknown(page('.atomic_data_container .row_even:nth-of-type(1) > .text_bold.col_2_4:nth-of-type(2)').text().trim(), true),
    electronAffinity: removeUnknown(page('.atomic_data_container .row_odd > .text_bold.col_2_4:nth-of-type(2)').text().trim(), true),
    covalentRadius: removeUnknown(page('.atomic_data_container .border_right_none.text_bold.nbr.col_2_4').text().trim(), true),
    electronegativity: removeUnknown(page('.row_odd > .border_right_none.text_bold.col_2_4').text().trim(), true),
    oxidationStates: removeUnknown(page('.oxidation_table .border_right_none.col2_top').text()
      .split(',').reduce((a, p) => {
        const parsed = +p.replace(/\s/g, '')
        return parsed ? [...a, parsed] : a
      }, []))
  }
}

const start = async atomicNumber => processPage(atomicNumber, await getFromCache(atomicNumber) || await saveToCache(atomicNumber, await getFromRSC(atomicNumber)))


Promise.all(Array(118).fill().map((_, i) => start(i + 1)))
  .then(array => array.map(element => Object.assign({}, element, {
    electronicConfiguration: element.electronicConfiguration.map(p => typeof p === 'string' ? array.find(({symbol}) => symbol === p).atomicNumber : p)
  })))
  // .then(test => test.forEach(e => console.log(e.name, JSON.stringify(e.electronicConfiguration, null, 2))))
  .then(full => {
    // Full
    fs.writeFile(`${__dirname}/../dist/full.json`, JSON.stringify([0, ...full]), () => 0)

    // Basic
    const basic = [0, ...full.map(element => ({
      name: element.name,
      symbol: element.symbol,
      atomicMass: element.atomicMass,
      atomicNumber: element.atomicNumber,
      groupBlock: element.groupBlock,
      electronicConfiguration: element.electronicConfiguration
    }))]
    fs.writeFile(`${__dirname}/../dist/basic.json`, JSON.stringify(basic), () => 0)

    // Individual
    full.forEach(element => {
      fs.writeFile(`${__dirname}/../dist/${element.atomicNumber}.json`, JSON.stringify(element), () => 0)
    })
  })
  .catch(err => console.error(err))
