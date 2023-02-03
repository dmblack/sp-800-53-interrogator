import './MetadataLink.css';

// Future; not very happy with this..
const schema = Object.entries(require('./catalog-schema.json').definitions).filter(
  (key, value) => {
    return key[1]["$id"] === "#assembly_oscal-metadata_link"
      ? value
      : false
  })[0][1];

/**
 * Rules (parameter -> and beyond):
 *  Presentation layer MUST not mutate data/schema.
 *    (eg; binding logic to resolve 'items' (an array) of types 
 *      described by the data model/schema)
*/
const MetadataLink = (props) => {
  return (
    <div className="MetadataLink">
      <div className="MetadataLink-header">
        MetadataLink:
      </div>
      {
        Object.entries(schema.properties).map((entry) => {
          switch (entry[1].type) {
            case "string":
              /**
               * As not all of the properties are required, we use this
               *  to filter empty schema values.
               * 
               *  Does not augment/mutate data/schema. Purely frontend.
               */
              if (typeof props.link[entry[0]] !== 'undefined') {
                return <div className={entry[1].type} tooltip={entry[1].description}> String: {props.link[entry[0]]} ({entry[0]})</div>
              }
              break;

            default:
              console.log('Unhandled entry type: %s', entry[1].type)
              break;
          }
        })
      }
    </div>
  );
}

export default MetadataLink;
