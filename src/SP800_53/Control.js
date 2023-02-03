import './Control.css';
import Parameter from './Parameter';
import MetadataProperty from './MetadataProperty';
import MetadataLink from './MetadataLink';
import Part from './Part';

// Future; not very happy with this..
const schema = Object.entries(require('./catalog-schema.json').definitions).filter(
  (key, value) => {
    return key[1]["$id"] === "#assembly_oscal-catalog_control"
      ? value
      : false
  })[0][1];

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
                    return props.control[entry[0]].map((control) => <Control control={control} key={props.control.id + '-' + control.id} />)
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
