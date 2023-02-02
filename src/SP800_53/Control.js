import './Control.css';
import Parameter from './Parameter';
import MetadataProperty from './MetadataProperty';
import MetadataLink from './MetadataLink';
import Part from './Part';

// Future; 'ideally' resolve this schema from the name of the calling react component
//  'unfortunately' this will likely require a map of the definitions, as components
//  cannot use characters used in the definition names. (-:, etc)
//    (note: mapping (object, not array) could be used to resolve the schema by definition
//    child key-value pair title. To date; this does not seem to include duplicates.
const schema = require('./catalog-schema.json').definitions["oscal-catalog-oscal-catalog:control"]
const localSchema = {
  "oscal-catalog-oscal-catalog:control": {
    "title": "Control",
    "description": "A structured information object representing a security or privacy control. Each security or privacy control within the Catalog is defined by a distinct control instance.",
    "$id": "#assembly_oscal-catalog_control",
    "type": "object",
    "properties": {
      "id": {
        "title": "Control Identifier",
        "description": "A human-oriented, locally unique identifier with instance scope that can be used to reference this control elsewhere in this and other OSCAL instances (e.g., profiles). This id should be assigned per-subject, which means it should be consistently used to identify the same control across revisions of the document.",
        "type": "string",
        "pattern": "^(\\p{L}|_)(\\p{L}|\\p{N}|[.\\-_])*$"
      },
      "class": {
        "title": "Control Class",
        "description": "A textual label that provides a sub-type or characterization of the control.",
        "type": "string",
        "pattern": "^(\\p{L}|_)(\\p{L}|\\p{N}|[.\\-_])*$"
      },
      "title": {
        "title": "Control Title",
        "description": "A name given to the control, which may be used by a tool for display and navigation.",
        "type": "string"
      },
      "params": {
        "type": "array",
        "minItems": 1,
        "items": {
          "$ref": "#assembly_oscal-catalog-common_parameter"
        }
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
      "parts": {
        "type": "array",
        "minItems": 1,
        "items": {
          "$ref": "#assembly_oscal-catalog-common_part"
        }
      },
      "controls": {
        "type": "array",
        "minItems": 1,
        "items": {
          "$ref": "#assembly_oscal-catalog_control"
        }
      }
    },
    "required": [
      "id",
      "title"
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
const Control = (props) => {
  return (
    <div className="Control">
      <div className="Control-header">
        Control:
      </div>
      {
        Object.entries(schema.properties).map((entry) => {
          switch (entry[1].type) {
            case "array":
              switch (entry[0]) {
                case "controls":
                  if (typeof props.control[entry[0]] !== 'undefined') {
                    return props.control[entry[0]].map((control) => <Control key={props.control.id + '-' + control.id}control={control} />)
                  }
                  break;
                case "links":
                  if (typeof props.control[entry[0]] !== 'undefined') {
                    return props.control[entry[0]].map((link) => <MetadataLink key={props.control.id + '-' + link.href} link={link} />)
                  }
                  break;

                case "params":
                  if (typeof props.control[entry[0]] !== 'undefined') {
                    return props.control[entry[0]].map((param) => <Parameter key={props.control.id + '-' + param.id} param={param} />)
                  }
                  break;

                case "parts":
                  if (typeof props.control[entry[0]] !== 'undefined') {
                    return props.control[entry[0]].map((part) => <Part key={props.control.id + '-' + part.id} part={part} />)
                  }
                  break;

                case "props":
                  if (typeof props.control[entry[0]] !== 'undefined') {
                    return props.control[entry[0]].map((prop) => <MetadataProperty key={prop.id} prop={prop} />)
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
              if (typeof props.control[entry[0]] !== 'undefined') {
                return <div className={entry[1].type} tooltip={entry[1].description}> String: {props.control[entry[0]]} ({entry[0]})</div>
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

export default Control;
