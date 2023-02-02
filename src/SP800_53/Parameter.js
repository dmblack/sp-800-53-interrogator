import './Parameter.css';
import Part from './Part';
import MetadataProperty from './MetadataProperty';
import MetadataLink from './MetadataLink';
import Constraint from './Constraint';
import Guideline from './Guideline';
import Value from './Value';

// Future; 'ideally' resolve this schema from the name of the calling react component
//  'unfortunately' this will likely require a map of the definitions, as components
//  cannot use characters used in the definition names. (-:, etc)
//    (note: mapping (object, not array) could be used to resolve the schema by definition
//    child key-value pair title. To date; this does not seem to include duplicates.
const schema = require('./catalog-schema.json').definitions["oscal-catalog-oscal-catalog-common:parameter"]
const localSchema = {
  "oscal-catalog-oscal-catalog-common:parameter": {
    "title": "Parameter",
    "description": "Parameters provide a mechanism for the dynamic assignment of value(s) in a control.",
    "$id": "#assembly_oscal-catalog-common_parameter",
    "type": "object",
    "properties": {
      "id": {
        "title": "Parameter Identifier",
        "description": "A human-oriented, locally unique identifier with cross-instance scope that can be used to reference this defined parameter elsewhere in this or other OSCAL instances. When referenced from another OSCAL instance, this identifier must be referenced in the context of the containing resource (e.g., import-profile). This id should be assigned per-subject, which means it should be consistently used to identify the same subject across revisions of the document.",
        "type": "string",
        "pattern": "^(\\p{L}|_)(\\p{L}|\\p{N}|[.\\-_])*$"
      },
      "class": {
        "title": "Parameter Class",
        "description": "A textual label that provides a characterization of the parameter.",
        "type": "string",
        "pattern": "^(\\p{L}|_)(\\p{L}|\\p{N}|[.\\-_])*$"
      },
      "depends-on": {
        "title": "Depends on",
        "description": "**(deprecated)** Another parameter invoking this one. This construct has been deprecated and should not be used.",
        "type": "string",
        "pattern": "^(\\p{L}|_)(\\p{L}|\\p{N}|[.\\-_])*$"
      },
      "props": {
        "type": "array",
        "minItems": 1,
        "items": {
          "$ref": "#assembly_oscal-metadata_property"
        }
      },
      "links": {
        "type": "array",
        "minItems": 1,
        "items": {
          "$ref": "#assembly_oscal-metadata_link"
        }
      },
      "label": {
        "title": "Parameter Label",
        "description": "A short, placeholder name for the parameter, which can be used as a substitute for a value if no value is assigned.",
        "type": "string"
      },
      "usage": {
        "title": "Parameter Usage Description",
        "description": "Describes the purpose and use of a parameter",
        "type": "string"
      },
      "constraints": {
        "type": "array",
        "minItems": 1,
        "items": {
          "$ref": "#assembly_oscal-catalog-common_parameter-constraint"
        }
      },
      "guidelines": {
        "type": "array",
        "minItems": 1,
        "items": {
          "$ref": "#assembly_oscal-catalog-common_parameter-guideline"
        }
      },
      "values": {
        "type": "array",
        "minItems": 1,
        "items": {
          "$ref": "#field_oscal-catalog-common_parameter-value"
        }
      },
      "select": {
        "$ref": "#assembly_oscal-catalog-common_parameter-selection"
      },
      "remarks": {
        "$ref": "#field_oscal-metadata_remarks"
      }
    },
    "required": [
      "id"
    ],
    "additionalProperties": false
  }
}

/**
 * Rules (parameter -> and beyond):
 *  Presentation layer MUST not mutate data/schema.
 *    (eg; binding logic to resolve 'items' (an array) of types 
 *      described by the data model/schema)
*/
const Parameter = (props) => {
  return (
    <div className="Parameter">
      <div className="Parameter-header">
        Parameter:
      </div>
      {
        Object.entries(schema.properties).map((entry) => {
          switch (entry[1].type) {
            case "array":
              switch (entry[0]) {
                case "constraints":
                  if (typeof props.param[entry[0]] !== 'undefined') {
                    return props.param[entry[0]].map((prop) => <Constraint prop={prop} />)
                  }
                  break;

                case "guidelines":
                  if (typeof props.param[entry[0]] !== 'undefined') {
                    return props.param[entry[0]].map((guideline) => <Guideline guideline={guideline} />)
                  }
                  break;

                case "links":
                  if (typeof props.param[entry[0]] !== 'undefined') {
                    return props.param[entry[0]].map((link) => <MetadataLink link={link} />)
                  }
                  break;

                case "param":
                  if (typeof props.param[entry[0]] !== 'undefined') {
                    return props.param[entry[0]].map((param) => <Parameter param={param} />)
                  }
                  break;

                case "parts":
                  if (typeof props.part[entry[0]] !== 'undefined') {
                    return props.part[entry[0]].map((part) => <Part part={part} />)
                  }
                  break;

                case "props":
                  if (typeof props.param[entry[0]] !== 'undefined') {
                    return props.param[entry[0]].map((prop) => <MetadataProperty prop={prop} />)
                  }
                  break;

                case "values":
                  if (typeof props.param[entry[0]] !== 'undefined') {
                    return props.param[entry[0]].map((prop) => <Value prop={prop} />)
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
              if (typeof props.param[entry[0]] !== 'undefined') {
                return <div className={entry[1].type} tooltip={entry[1].description}> String: {props.param[entry[0]]} ({entry[0]})</div>
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

export default Parameter;
