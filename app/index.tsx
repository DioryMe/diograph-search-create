import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { DiographSearchCreate } from './diograph-search-create'

ReactDOM.render(
  <DiographSearchCreate 
  	onFocusClick={ (jee) => { console.log(jee) } }/>,
  document.getElementById('app')
)
