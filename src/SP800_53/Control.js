import './Control.css';
import ControlParams from './ControlParams';
import ControlParts from './ControlParts';

const Control = (props) => {
  return (
    <div className="Control">
      <div className="Control-header">
        Control:
      </div>
      <div className="Control-id">
        ID: { props.control.id }
      </div>
      <div className="Control-class">
        Class: { props.control.class }
      </div>
      <div className="Control-title">
        Title: { props.control.title }
      </div>
      {
        typeof props.control.params !== 'undefined'
          ? props.control.params.map((param) => <ControlParams key={param.id} param={param} />)
          : false
      }
      {
        typeof props.control.parts !== 'undefined'
          ? props.control.parts.map((part) => <ControlParts key={part.id} part={part} />)
          : false
      }
    </div>
  );
}

export default Control;
