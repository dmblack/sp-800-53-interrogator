import './SP800_53.css';
import Catalog from './Catalog';

function SP800_53(props) {
  return (
    <div className="SP800_53">
      <Catalog oscal={props.oscal} key={props.oscal.catalog.uuid} schema={props.schema}/>
    </div>
  );
}

export default SP800_53;
