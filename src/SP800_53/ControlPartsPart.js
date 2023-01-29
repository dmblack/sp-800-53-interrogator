import './ControlPartsPart.css';

const ControlPartsPart = (props) => {
  return (
    <div className="ControlPartsPart">
      <div className="ControlPartsPart-header">
        Control Parts
      </div>
      <div className="ControlPartsPart-id">
        ID: { props.part.id }
      </div>
      <div className="ControlPartsPart-class">
        Class: { props.part.class }
      </div>
      <div className="ControlPartsPart-title">
        Title: { props.part.title }
      </div>
    </div>
  );
}

export default ControlPartsPart;
