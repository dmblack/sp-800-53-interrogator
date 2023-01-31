import ControlParamsProps from './ControlParamsProps';
import './ControlParams.css';

const ControlParams = (props) => {
  return (
    <div className="ControlParams">
      <div className="ControlParams-header">
        Control Params
      </div>
      <div className="ControlParams-id">
        ID: { props.param.id }
      </div>
      <div className="ControlParams-label">
        Label: { props.param.label }
      </div>
      {
        props.param.props.map((prop) =>
          <ControlParamsProps key={prop.value} prop={prop} />
        )
      }
      {
        typeof props.param.guidelines !== 'undefined' 
        ?
          <div className="ControlParamsProps-value">
            Guidelines: { props.param.guidelines.map((guideline) => <div>{guideline.prose}</div>) }
          </div>
        : false
      }
      {/* {
        typeof props.param.select !== 'undefined' 
        ?
          <div className="ControlParamsProps-value">
            Select: { props.param.select["how-many"]}
            Of: { props.param.select.map((select) => <div>{select.choice}</div>) }
          </div>
        : false
      } */}
      
    </div>
  );
}

export default ControlParams;
