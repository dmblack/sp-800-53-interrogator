import './Control.css';
import Part from './Part';
import Parameter from './Parameter';
import MetadataLink from './MetadataLink';

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
      {/* {
        typeof props.control.params !== 'undefined'
          ? props.control.params.map((param) => <ControlParams key={param.id} param={param} />)
          : false
      } */}
      {
        typeof props.control.links !== 'undefined'
          ? props.control.links.map((link) => <MetadataLink key={link.href} link={link} />)
          : false
      }
      {
        typeof props.control.parts !== 'undefined'
          ? props.control.parts.map((part) => <Part key={part.id} part={part} />)
          : false
      }
      {
        typeof props.control.params !== 'undefined'
          ? props.control.params.map((param) => <Parameter key={param.id} param={param} />)
          : false
      }
    </div>
  );
}

export default Control;
