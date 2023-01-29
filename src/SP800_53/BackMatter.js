import './BackMatter.css';
import BackMatterResource from './BackMatterResource';

const BackMatter = (props) => {
  return (
    <div className="BackMatter">
      <div className="BackMatter-header">
        BackMatter:
      </div>
      {
        typeof props.backMatter.resources !== 'undefined'
          ? props.backMatter.resources.map((resource) => <BackMatterResource resource={resource} key={resource.uuid} />)
          : false
      }
    </div>
  );
}

export default BackMatter;
