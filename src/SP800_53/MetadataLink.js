import './MetadataLink.css';

// Future; 'ideally' resolve this schema from the name of the calling react component
//  'unfortunately' this will likely require a map of the definitions, as components
//  cannot use characters used in the definition names. (-:, etc)
//    (note: mapping (object, not array) could be used to resolve the schema by definition
//    child key-value pair title. To date; this does not seem to include duplicates.
const schema = require('./catalog-schema.json').definitions["oscal-catalog-oscal-metadata:link"]
const localSchema = {
  "oscal-catalog-oscal-metadata:link": {
    "title": "Link",
    "description": "A reference to a local or remote resource",
    "$id": "#assembly_oscal-metadata_link",
    "type": "object",
    "properties": {
      "href": {
        "title": "Hypertext Reference",
        "description": "A resolvable URL reference to a resource.",
        "type": "string",
        "format": "uri-reference"
      },
      "rel": {
        "title": "Relation",
        "description": "Describes the type of relationship provided by the link. This can be an indicator of the link's purpose.",
        "type": "string",
        "pattern": "^(\\p{L}|_)(\\p{L}|\\p{N}|[.\\-_])*$"
      },
      "media-type": {
        "title": "Media Type",
        "description": "Specifies a media type as defined by the Internet Assigned Numbers Authority (IANA) Media Types Registry.",
        "type": "string",
        "pattern": "^\\S(.*\\S)?$"
      },
      "text": {
        "title": "Link Text",
        "description": "A textual label to associate with the link, which may be used for presentation in a tool.",
        "type": "string"
      }
    },
    "required": [
      "href"
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
