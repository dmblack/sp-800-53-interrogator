import './Groups.css';
import Control from './Control';

const Groups = (props) => {
  return (
    <div className="Groups">
      <div className="Groups-title">
        ID: { props.groups.id }
      </div>
      <div className="Groups-last-modified">
        Class: { props.groups.class }
      </div>
      <div className="Groups-version">
        Title: { props.groups.title }
      </div>
      { props.groups.controls.map((control) => 
        <Control control={control} key={control.class + '-' + control.id} />
      )}
    </div>
  );
}

export default Groups;
