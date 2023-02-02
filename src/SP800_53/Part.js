import './Part.css';
import MetadataLink from './MetadataLink';
import MetadataProperty from './MetadataProperty';

// Future; 'ideally' resolve this schema from the name of the calling react component
//  'unfortunately' this will likely require a map of the definitions, as components
//  cannot use characters used in the definition names. (-:, etc)
//    (note: mapping (object, not array) could be used to resolve the schema by definition
//    child key-value pair title. To date; this does not seem to include duplicates.
const schema = require('./catalog-schema.json').definitions["oscal-catalog-oscal-catalog-common:part"]
const localSchema = {
  "oscal-catalog-oscal-catalog-common:part": {
    "title": "Part",
    "description": "A partition of a control's definition or a child of another part.",
    "$id": "#assembly_oscal-catalog-common_part",
    "type": "object",
    "properties": {
      "id": {
        "title": "Part Identifier",
        "description": "A human-oriented, locally unique identifier with cross-instance scope that can be used to reference this defined part elsewhere in this or other OSCAL instances. When referenced from another OSCAL instance, this identifier must be referenced in the context of the containing resource (e.g., import-profile). This id should be assigned per-subject, which means it should be consistently used to identify the same subject across revisions of the document.",
        "type": "string",
        "pattern": "^(\\p{L}|_)(\\p{L}|\\p{N}|[.\\-_])*$"
      },
      "name": {
        "title": "Part Name",
        "description": "A textual label that uniquely identifies the part's semantic type.",
        "type": "string",
        "pattern": "^(\\p{L}|_)(\\p{L}|\\p{N}|[.\\-_])*$"
      },
      "ns": {
        "title": "Part Namespace",
        "description": "A namespace qualifying the part's name. This allows different organizations to associate distinct semantics with the same name.",
        "type": "string",
        "format": "uri",
        "pattern": "^[a-zA-Z][a-zA-Z0-9+\\-.]+:.+$"
      },
      "class": {
        "title": "Part Class",
        "description": "A textual label that provides a sub-type or characterization of the part's name. This can be used to further distinguish or discriminate between the semantics of multiple parts of the same control with the same name and ns.",
        "type": "string",
        "pattern": "^(\\p{L}|_)(\\p{L}|\\p{N}|[.\\-_])*$"
      },
      "title": {
        "title": "Part Title",
        "description": "A name given to the part, which may be used by a tool for display and navigation.",
        "type": "string"
      },
      "props": {
        "type": "array",
        "minItems": 1,
        "items": {
          "$ref": "#assembly_oscal-metadata_property"
        }
      },
      "prose": {
        "title": "Part Text",
        "description": "Permits multiple paragraphs, lists, tables etc.",
        "type": "string"
      },
      "parts": {
        "type": "array",
        "minItems": 1,
        "items": {
          "$ref": "#assembly_oscal-catalog-common_part"
        }
      },
      "links": {
        "type": "array",
        "minItems": 1,
        "items": {
          "$ref": "#assembly_oscal-metadata_link"
        }
      }
    },
    "required": [
      "name"
    ],
    "additionalProperties": false
  }
}

/**
 * Rules (part -> and beyond):
 *  Presentation layer MUST not mutate data/schema.
 *    (eg; binding logic to resolve 'items' (an array) of types 
 *      described by the data model/schema)
*/
const Part = (props) => {
  return (
    <div className="Part">
      <div className="Part-header">
        Part:
      </div>
      {
        Object.entries(schema.properties).map((entry) => {
          switch (entry[1].type) {
            case "array":
              switch (entry[0]) {
                case "links":
                  if (typeof props.part[entry[0]] !== 'undefined') {
                    return props.part[entry[0]].map((link) => <MetadataLink link={link} />)
                  }
                  break;

                case "parts":
                  if (typeof props.part[entry[0]] !== 'undefined') {
                    return props.part[entry[0]].map((part) => <Part part={part} />)
                  }
                  break;

                case "props":
                  if (typeof props.part[entry[0]] !== 'undefined') {
                    return props.part[entry[0]].map((prop) => <MetadataProperty prop={prop} />)
                  }
                  break;

                default:
                  console.log('Unhandled switch: %s', entry[0]);
                  break;

              }
              break;

            case "string":
              /**
               * As not all of the properties are required, we use this
               *  to filter empty schema values.
               * 
               *  Does not augment/mutate data/schema. Purely frontend.
               */
              if (typeof props.part[entry[0]] !== 'undefined') {
                return <div className={entry[1].type} tooltip={entry[1].description}> String: {props.part[entry[0]]} ({entry[0]})</div>
              }
              break;

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
