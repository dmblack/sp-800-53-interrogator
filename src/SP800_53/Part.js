import './Part.css';
import MetadataLink from './MetadataLink';
import MetadataProperty from './MetadataProperty';

// Future; not very happy with this..
const schema = Object.entries(require('./catalog-schema.json').definitions).filter(
  (key, value) => {
    return key[1]["$id"] === "#assembly_oscal-catalog-common_part"
      ? value
      : false
  })[0][1];

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
