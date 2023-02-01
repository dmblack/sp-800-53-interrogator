import './ControlPart.css';

const ControlPart = (props) => {
  return (
    <div className="ControlPart">
      <div className="ControlPart-header">
        Part
      </div>
      <div className="ControlPart-id">
        ID: { props.part.id }
      </div>
      <div className="ControlPart-class">
        Class: { props.part.class }
      </div>
      <div className="ControlPart-title">
        Title: { props.part.title }
      </div>
      {
        typeof props.part.parts !== 'undefined'
        ? props.part.parts.map((part) => <ControlPart key={part.id} part={part} />)
        : false
      }
    </div>
  );
}

export default ControlPart;
