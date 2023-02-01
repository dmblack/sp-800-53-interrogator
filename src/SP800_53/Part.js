import './Part.css';

// Future; 'ideally' resolve this schema from the name of the calling react component
//  'unfortunately' this will likely require a map of the definitions, as components
//  cannot use characters used in the definition names. (-:, etc)
//    (note: mapping (object, not array) could be used to resolve the schema by definition
//    child key-value pair title. To date; this does not seem to include duplicates.
const schema = require('./catalog-schema.json').definitions["oscal-catalog-oscal-catalog-common:part"]

  /**
   * Rules (part -> and beyond):
   *  Presentation layer MUST not mutate data/schema.
   *    (eg; binding logic to resolve 'items' (an array) of types 
   *      described by the data model/schema)
  */

const Part = (props) => {
  console.log(props.part);
  console.log(schema.properties)
  return (
    <div className="Part">
      {
        Object.entries(schema.properties).map((entry) => {
          console.log(entry[0])
          switch (entry[1].type) {
            case "array":
              return <div className={entry[1].type} tooltip={entry[1].description}> Array: { props.part["entry[0]"] } ({entry[0]})</div>
              
            case "string":
              return <div className={entry[1].type}> String: { props.part["entry[0]"] } ({entry[0]})</div>

            default:
              const property = entry[0]
              const title = entry[1].title || false
              const type = entry[1].type || false
              const format = entry[1].format || false
              const description = entry[1].description || false
              const pattern = entry[1].pattern || false
              const minItems = entry[1].minItems || false
              const items = typeof entry[1].items !== 'undefined'
                ? entry[1].items["$ref"]
                : false
          }
        })
      }
    </div>
  );
}

export default Part;
