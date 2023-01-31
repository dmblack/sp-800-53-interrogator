import './ControlParamsProps.css';

const ControlParamsProps = (props) => {
  return (
    <div className="ControlParamsProps">
      <div className="ControlParamsProps-name">
        Name: { props.prop.name }
      </div>
      {
        typeof props.prop.ns !== 'undefined' 
        ?
          <div className="ControlParamsProps-ns">
            NS: { props.prop.ns }
          </div>
        : false
      }
      {
        typeof props.prop.class !== 'undefined'
        ?  
          <div className="ControlParamsProps-ns">
            Class: { props.prop.class }
          </div>
        : false
      }
      <div className="ControlParamsProps-value">
        Value: { props.prop.value }
      </div>
    </div>
  );
}

export default ControlParamsProps;
