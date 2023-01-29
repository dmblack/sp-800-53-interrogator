import './ControlParts.css';

const ControlParts = (props) => {
  return (
    <div className="ControlParts">
      <div className="ControlParts-header">
        Control Parts
      </div>
      <div className="ControlParts-id">
        ID: { props.part.id }
      </div>
      <div className="ControlParts-class">
        Class: { props.part.class }
      </div>
      <div className="ControlParts-title">
        Title: { props.part.title }
      </div>
    </div>
  );
}

export default ControlParts;
