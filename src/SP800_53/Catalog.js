import './Catalog.css';
import PropTypes from 'prop-types';
// import Control from './Control';
// // import Groups from './Groups';
// // import Metadata from './Metadata';
// import Parameter from './Parameter';

const isDefined = (object) => {
  return typeof (object) !== 'undefined';
}

/**
 * getSchemaByRef - Returns a schema by the supplied id;
 *  eg; '#some_awesome-reference'
 * @param {Object} schema The schema to search.
 * @param {String} reference The Ref to find.
 * @returns {Object} schema The schema searched.
 */
const getSchemaByRef = (schema, reference) => {
  console.log("Resolving: %s", reference);
  const result = Object.entries(schema).find(item => item[1]['$id'] === reference);
  return Object.assign({}, result[1]);
}

/**
 * render
 * @param {Object} object A an object with a key, and value, pair.
 * @returns {JSX} - A react render-compatible JSX object.
 */
const renderKeyValuePair = (object) => {
  if (isDefined(object.key) && isDefined(object.value))
    return (
      <li>
        {object.key}: {object.value}
      </li>
    )
}

const reduceOSCALWithSchema = (oscal, schema, masterSchema) => {
  /** 
   * If our schema has child properties, start enumerating them.
   */
  if (isDefined(schema.properties)) {
    /** Enumerate our schema properties, and for each property */
    Object.entries(schema.properties).map((property) => {
      /** If our oscal contains a key value pair with that same property */
      if (isDefined(oscal[property[0].toLowerCase()])) {
        /** If our schema for this OSCAL also includes a 'href/ref' */
        if (isDefined(property[1]['$ref'])) {
          reduceOSCALWithSchema(oscal[property[0].toLowerCase()], getSchemaByRef(masterSchema.definitions, property[1]['$ref']), masterSchema)
        } else {
          /**
           *  SCHEMA definition for this OSCAL does not include a href/ref.
           * 
           *  Each schema definition for a 'parameter' has a type.
           * We use this to properly handle rendering the result.
           */
          switch (property[1].type) {
            case "array":
              oscal[property[0]].map((value) => {
                // console.log("Array Values: %s", JSON.stringify(value))
              });
              break

            case "string":
              // console.log("Property %s with value %s.", property[0], oscal[property[0]])
              break;

            default:
              console.log("Unhandled type for value: %s" + oscal[property[0]]);
          }
        }
      } else {
        /** Our OSCAL does not include this property. */
        console.log("Our OSCAL did not include an optional property: %s", property[0])
      }
      /** Enumerate all the other properties that do not have $ref here */
    })
  } else {
    console.log("Shallow Inspect: %s - %s", schema.title, oscal);
  }
}

const Catalog = (props) => {
  return (
    <div className="Catalog">
      <div className="Catalog-uuid">
      </div>
      {
        reduceOSCALWithSchema(props.oscal.catalog, props.schema.definitions["oscal-complete-oscal-catalog:catalog"], props.schema)
      }
    </div>
  );
}

Catalog.propTypes = {
  oscal: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
}

export default Catalog;
