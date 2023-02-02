import './MetadataProperty.css';

// Future; 'ideally' resolve this schema from the name of the calling react component
//  'unfortunately' this will likely require a map of the definitions, as components
//  cannot use characters used in the definition names. (-:, etc)
//    (note: mapping (object, not array) could be used to resolve the schema by definition
//    child key-value pair title. To date; this does not seem to include duplicates.
const schema = require('./catalog-schema.json').definitions["oscal-catalog-oscal-metadata:property"]
const localSchema = {
  "oscal-catalog-oscal-metadata:property": {
    "title": "Property",
    "description": "An attribute, characteristic, or quality of the containing object expressed as a namespace qualified name/value pair. The value of a property is a simple scalar value, which may be expressed as a list of values.",
    "$id": "#assembly_oscal-metadata_property",
    "type": "object",
    "properties": {
      "name": {
        "title": "Property Name",
        "description": "A textual label that uniquely identifies a specific attribute, characteristic, or quality of the property's containing object.",
        "type": "string",
        "pattern": "^(\\p{L}|_)(\\p{L}|\\p{N}|[.\\-_])*$"
      },
      "uuid": {
        "title": "Property Universally Unique Identifier",
        "description": "A machine-oriented, globally unique identifier with cross-instance scope that can be used to reference this defined property elsewhere in this or other OSCAL instances. This UUID should be assigned per-subject, which means it should be consistently used to identify the same subject across revisions of the document.",
        "type": "string",
        "pattern": "^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[45][0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$"
      },
      "ns": {
        "title": "Property Namespace",
        "description": "A namespace qualifying the property's name. This allows different organizations to associate distinct semantics with the same name.",
        "type": "string",
        "format": "uri",
        "pattern": "^[a-zA-Z][a-zA-Z0-9+\\-.]+:.+$"
      },
      "value": {
        "title": "Property Value",
        "description": "Indicates the value of the attribute, characteristic, or quality.",
        "type": "string",
        "pattern": "^\\S(.*\\S)?$"
      },
      "class": {
        "title": "Property Class",
        "description": "A textual label that provides a sub-type or characterization of the property's name. This can be used to further distinguish or discriminate between the semantics of multiple properties of the same object with the same name and ns.",
        "type": "string",
        "pattern": "^(\\p{L}|_)(\\p{L}|\\p{N}|[.\\-_])*$"
      },
      "remarks": {
        "$ref": "#field_oscal-metadata_remarks"
      }
    },
    "required": [
      "name",
      "value"
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
