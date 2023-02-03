import './MetadataProperty.css';

// Future; not very happy with this..
const schema = Object.entries(require('./catalog-schema.json').definitions).filter(
  (key, value) => {
    return key[1]["$id"] === "#assembly_oscal-metadata_property"
      ? value
      : false
  })[0][1];

/**
 * Rules (parameter -> and beyond):
 *  Presentation layer MUST not mutate data/schema.
 *    (eg; binding logic to resolve 'items' (an array) of types 
 *      described by the data model/schema)
*/
const MetadataProperty = (props) => {
  return (
    <div className="MetadataProperty">
      <div className="MetadataProperty-header">
        MetadataProperty:
      </div>
      {
        Object.entries(schema.properties).map((entry) => {
          switch (entry[1].type) {
            case "array":
              switch (entry[0]) {
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
              if (typeof props.prop[entry[0]] !== 'undefined') {
                return <div className={entry[1].type} tooltip={entry[1].description}> String: {props.prop[entry[0]]} ({entry[0]})</div>
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

export default MetadataProperty;
