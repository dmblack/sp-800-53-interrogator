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
    </div>
  );
}

export default ControlParams;
