# Diograph Search Create

Diograph Search-Create typeahead field as a React component

## Usage

```
npm install diograph-search-create --save-dev
```

```
import { DiographSearchCreate } from "diograph-search-create"

constructor(props) {
  super(props)
  this.putInFocus = this.putInFocus.bind(this);
}

}
render() {
  return (
    <DiographSearchCreate onFocusClick={this.putInFocus}/>
  )
}

putInFocus(dioryId) {
  // Logic to put Diory with dioryId in focus
}
```

## Development

```
npm start
```



