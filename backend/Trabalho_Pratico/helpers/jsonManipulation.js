import { promises as fs } from 'fs'
import path from 'path'

const dir = './helpers/car-list.json'

async function readJson(){
  try {
    const result = await fs.readFile(dir, "utf-8")
    return JSON.parse(result)
  } catch (error) {
    console.log(error)
  }
}

async function writeJson(){
  try {
    const carList = await readJson()
    console.log(carList)
  } catch (error) {
    console.log(error)
  }
}

async function modelosSorted() {
  try {
    const marcas = await readJson()
    const marcasM = marcas
      .map(item => ({ marca: item.brand, modelos: item.models.length }))
      .sort((a, b) => a.modelos - b.modelos || b.marca.localeCompare(a.marca))

    return marcasM
  } catch (error) {
    
    console.log(error)
  }
}

export {readJson, writeJson, modelosSorted}