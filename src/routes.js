// import Counter from './containers/counter' import Excel2json from
// './containers/Excel2json'
import {routePath} from './config';
import Select from './containers/Select';
import Table from './containers/Table';
import Form from './containers/Form';

const routes = [
  {
    path: routePath.select,
    component: Select,
    name: 'select'
  }, {
    path: routePath.table,
    component: Table,
    name: 'table'
  }, {
    path: routePath.form,
    component: Form,
    name: 'MForm'
  }
]
export default routes