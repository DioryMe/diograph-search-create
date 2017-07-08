require('./index.html');
require('./loading.gif');

import 'document-register-element'
import { DiographSearchCreate } from "./diograph-search-create"

(document as any).registerElement('diograph-search-create', DiographSearchCreate);
