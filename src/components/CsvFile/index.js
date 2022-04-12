import {useState} from 'react'

import {Table} from 'antd'
import 'antd/dist/antd.css'
import * as XLSX from 'xlsx'
import {BsSearch} from 'react-icons/bs'
import './index.css'

const CsvFile = () => {
  const [items, setItems] = useState([])
  const [searchInput, setSearchInput] = useState('')

  const readExcel = file => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(file)

      fileReader.onload = e => {
        const bufferArray = e.target.result

        const wb = XLSX.read(bufferArray, {type: 'buffer'})

        const wsname = wb.SheetNames[0]

        const ws = wb.Sheets[wsname]

        const data = XLSX.utils.sheet_to_json(ws)

        resolve(data)
      }

      fileReader.onerror = error => {
        reject(error)
      }
    })

    promise.then(d => {
      setItems(d)
    })
  }
  console.log(items)
  // to get the columns in the table
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
    },
    {
      title: 'Batch',
      dataIndex: 'batch',
      key: 'batch',
      width: '20%',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      width: '10%',
    },
    {
      title: 'Deal',
      dataIndex: 'deal',
      key: 'deal',
      width: '10%',
    },
    {
      title: 'Free',
      dataIndex: 'free',
      key: 'free',
      width: '10%',
    },
    {
      title: 'Mrp',
      dataIndex: 'mrp',
      key: 'mrp',
      width: '10%',
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      key: 'rate',
      width: '10%',
    },

    {
      title: 'Exp',
      dataIndex: 'exp',
      key: 'exp',
      width: '10%',
    },
  ]

  return (
    <div className="app">
      <input
        type="file"
        onChange={e => {
          const file = e.target.files[0]
          readExcel(file)
        }}
      />
      <div className="search-container">
        <BsSearch className="search-icon" />

        <input
          type="search"
          className="search-bar"
          placeholder="Search by name"
          onChange={e => setSearchInput(e.target.value)}
          value={searchInput}
        />
      </div>
      <div className="data-container">
        <Table
          className="table"
          dataSource={items.filter(person =>
            person.name.toLowerCase().includes(searchInput.toLowerCase()),
          )}
          columns={columns}
          pagination={{position: ['bottomCenter']}}
        />
      </div>
    </div>
  )
}

export default CsvFile
