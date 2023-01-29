import './Metadata.css';

const Metadata = (props) => {
  return (
    <div className="Metadata">
      <div className="Metadata-title">
        Title: { props.metadata.title }
      </div>
      <div className="Metadata-last-modified">
        Last Modified: { props.metadata["last-modified"] }
      </div>
      <div className="Metadata-version">
        Version: { props.metadata.version }
      </div>
      <div className="Metadata-oscal-version">
        OSCAL Version: { props.metadata["oscal-version"] }
      </div>
    </div>
  );
}

export default Metadata;
