import {useState} from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css'
import paginationFactory from 'react-bootstrap-table2-paginator'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter'
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css'
import * as XLSX from 'xlsx'

import './App.css'

function App() {
  const [items, setItems] = useState([])

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

  const columns = [
    {
      dataField: 'name',
      text: 'Name',
      filter: textFilter(),
      sort: true,
      // Cell: cellInfo => (
      // <DropDownCell // cellInfo={cellInfo} // updateHandler={()=> {}}
      // controlName="name"
      // list={[]}
      // />
      // ),
    },

    {
      dataField: 'batch',
      text: 'Batch',
    },
    {
      dataField: 'stock',
      text: 'Stock',
    },
    {
      dataField: 'deal',
      text: 'Deal',
    },
    {
      dataField: 'free',
      text: 'Free',
    },
    {
      dataField: 'mrp',
      text: 'Mrp',
    },
    {
      dataField: 'rate',
      text: 'Rate',
    },
    {
      dataField: 'exp',
      text: 'Expire Date',
    },
  ]
  return (
    <div className="App">
      <input
        type="file"
        onChange={e => {
          const file = e.target.files[0]
          readExcel(file)
        }}
      />
      <BootstrapTable
        bootstrap4
        keyField="name"
        data={items}
        columns={columns}
        pagination={paginationFactory()}
        filter={filterFactory()}
      />
    </div>
  )
}

export default App
