import './BackMatterResource.css';

const BackMatterResource = (props) => {
  const links = typeof props.resource.rlinks !== 'undefined'
  ? props.resource.rlinks.map((link) => <div className="BackMatterResource-link" key={link.href}>Link(s): {link.href}</div>)
  : false

  return (
    <div className="BackMatterResource">
      <div className="BackMatterResource-header">
        BackMatterResource:
      </div>
      <div className="BackMatterResource-id">
        ID: { props.resource.uuid }
      </div>
      <div className="BackMatterResource-class">
        Title: { props.resource.title }
      </div>
      {
        typeof props.resource.citation !== 'undefined'
        ? <div className="BackMatterResource-title">
          Citation: { props.resource.citation.text }
        </div>
        : false
      }
      {
        links
      }
      
    </div>
  );
}

export default BackMatterResource;
