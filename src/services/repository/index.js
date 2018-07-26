const fs = require('fs')
const path = require('path')
const util = require('util')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const getRegistryFactory = (DBPath) => {
  return async () => {
    const file = await readFile(DBPath)
    return JSON.parse(file)
  }
}

const getAllRegistry = async (getRegistry) => {
  const registry = await getRegistry();
  return registry.logs;
}

const saveRegistryFactory = (DBPath) => {
  return (lastID, logs) => {
    const registry = { lastID, logs, lastModified: new Date().getTime() }
    return writeFile(DBPath, JSON.stringify(registry))
  }
}


module.exports = (dirname, dbname) => {
  const DBPath = path.resolve(dirname, dbname)
  const getRegistry = getRegistryFactory(DBPath)
  const saveRegistry = saveRegistryFactory(DBPath)
  let lastID = "";
  let logs = [];

  return {
    getAllRegistry: () => getAllRegistry(getRegistry),
    saveAllRegistry: () => saveRegistry       
  }
}
