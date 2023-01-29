import './ControlParamsProps.css';

const ControlParamsProps = (props) => {
  return (
    <div className="ControlParamsProps">
      <div className="ControlParamsProps-name">
        Name: { props.prop.name }
      </div>
      <div className="ControlParamsProps-ns">
        NS: { props.prop.ns }
      </div>
      <div className="ControlParamsProps-value">
        Value: { props.prop.value }
      </div>
    </div>
  );
}

export default ControlParamsProps;
