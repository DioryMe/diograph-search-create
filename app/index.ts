import 'document-register-element'

require('./index.html');
require('./loading.gif');
require('./main.css');

import { DiographSearchCreate } from "./diograph-search-create"

(document as any).registerElement('diograph-search-create', DiographSearchCreate);

