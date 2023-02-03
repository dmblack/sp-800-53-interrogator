import './Parameter.css';
import Part from './Part';
import MetadataProperty from './MetadataProperty';
import MetadataLink from './MetadataLink';
import Constraint from './Constraint';
import Guideline from './Guideline';
import Value from './Value';

// Future; not very happy with this..
const schema = Object.entries(require('./catalog-schema.json').definitions).filter(
  (key, value) => {
    return key[1]["$id"] === "#assembly_oscal-catalog-common_parameter"
      ? value
      : false
  })[0][1];

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
                    return props.param[entry[0]].map((param) => <Parameter key={props.control.id + '-' + param.id} param={param} />)
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
