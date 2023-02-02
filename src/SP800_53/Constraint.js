import './Constraint.css';

// Future; 'ideally' resolve this schema from the name of the calling react component
//  'unfortunately' this will likely require a map of the definitions, as components
//  cannot use characters used in the definition names. (-:, etc)
//    (note: mapping (object, not array) could be used to resolve the schema by definition
//    child key-value pair title. To date; this does not seem to include duplicates.
const schema = require('./catalog-schema.json').definitions["oscal-catalog-oscal-catalog-common:parameter-constraint"]
const localSchema = {
  "oscal-catalog-oscal-catalog-common:parameter-constraint": {
    "title": "Constraint",
    "description": "A formal or informal expression of a constraint or test",
    "$id": "#assembly_oscal-catalog-common_parameter-constraint",
    "type": "object",
    "properties": {
      "description": {
        "title": "Constraint Description",
        "description": "A textual summary of the constraint to be applied.",
        "type": "string"
      },
      "tests": {
        "type": "array",
        "minItems": 1,
        "items": {
          "title": "Constraint Test",
          "description": "A test expression which is expected to be evaluated by a tool.",
          "type": "object",
          "properties": {
            "expression": {
              "title": "Constraint test",
              "description": "A formal (executable) expression of a constraint",
              "type": "string",
              "pattern": "^\\S(.*\\S)?$"
            },
            "remarks": {
              "$ref": "#field_oscal-metadata_remarks"
            }
          },
          "required": [
            "expression"
          ],
          "additionalProperties": false
        }
      }
    },
    "additionalProperties": false
  }
}

/**
 * Rules (parameter -> and beyond):
 *  Presentation layer MUST not mutate data/schema.
 *    (eg; binding logic to resolve 'items' (an array) of types 
 *      described by the data model/schema)
*/
const Constraint = (props) => {
  return (
    <div className="Constraint">
      <div className="Constraint-header">
        Constraint:
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

export default Constraint;
