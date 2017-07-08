require('./index.html');
require('./main.css');
require('./loading.gif');

import 'document-register-element'
import { DiographSearchCreate } from "./diograph-search-create"

(<any>document).registerElement('diograph-search-create', DiographSearchCreate);
