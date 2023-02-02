import './Value.css';

// Future; 'ideally' resolve this schema from the name of the calling react component
//  'unfortunately' this will likely require a map of the definitions, as components
//  cannot use characters used in the definition names. (-:, etc)
//    (note: mapping (object, not array) could be used to resolve the schema by definition
//    child key-value pair title. To date; this does not seem to include duplicates.
const schema = require('./catalog-schema.json').definitions["assembly_oscal-catalog-common_parameter-constraint"]
const localSchema = {
  "oscal-catalog-oscal-catalog-common:parameter-value": {
    "title": "Parameter Value",
    "description": "A parameter value or set of values.",
    "$id": "#field_oscal-catalog-common_parameter-value",
    "type": "string",
    "pattern": "^\\S(.*\\S)?$"
  }
}

/**
 * Rules (parameter -> and beyond):
 *  Presentation layer MUST not mutate data/schema.
 *    (eg; binding logic to resolve 'items' (an array) of types 
 *      described by the data model/schema)
*/
const Value = (props) => {
  return (
    <div className="Value">
      <div className="Value-header">
        Value:
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

export default Value;
