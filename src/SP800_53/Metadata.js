import './Metadata.css';
import MetadataLink from './MetadataLink';
import MetadataProperty from './MetadataProperty';

// Future; not very happy with this..
const schema = Object.entries(require('./catalog-schema.json').definitions).filter(
  (key, value) => {
    return key[1]["$id"] === "#assembly_oscal-metadata_metadata"
      ? value
      : false
  })[0][1];

const Metadata = (props) => {
  return (
    <div className="Metadata">
      <div className="Metadata-title">
        Title: {props.metadata.title}
      </div>
      {
        Object.entries(schema.properties).map((entry) => {
          switch (entry[1].type) {
            case "array":
              switch (entry[0]) {
                case "links":
                  if (typeof props.metadata[entry[0]] !== 'undefined') {
                    return props.metadata[entry[0]].map((link) => <MetadataLink key={props.link.id + '-' + link.href} link={link} />)
                  }
                  break;

                case "props":
                  if (typeof props.metadata[entry[0]] !== 'undefined') {
                    return props.metadata[entry[0]].map((property) => <MetadataProperty key={props.property.id} property={property} />)
                  }
                  break;

                default:
                  console.log("Unhandled switch: %s", entry[0])
              }
              break;

            case "string":
              /**
               * As not all of the properties are required, we use this
               *  to filter empty schema values.
               * 
               *  Does not augment/mutate data/schema. Purely frontend.
               */
              if (typeof props.metadata[entry[0]] !== 'undefined') {
                return <div className={entry[1].type} tooltip={entry[1].description}> String: {props.metadata[entry[0]]} ({entry[0]})</div>
              }
              break;

            default:
              // const property = entry[0]
              // const title = entry[1].title || false
              // const type = entry[1].type || false
              // const format = entry[1].format || false
              // const description = entry[1].description || false
              // const pattern = entry[1].pattern || false
              // const minItems = entry[1].minItems || false
              // const items = typeof entry[1].items !== 'undefined'
              //   ? entry[1].items["$ref"]
              //   : false
              break;
          }
        })
      }
    </div>
  );
}

export default Metadata;
