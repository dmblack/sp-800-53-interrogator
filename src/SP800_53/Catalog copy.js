import './Catalog.css';
// import Control from './Control';
// // import Groups from './Groups';
// // import Metadata from './Metadata';
// import Parameter from './Parameter';

const Catalog = (props) => {
  const isDefined = (element) => {
    return typeof element !== 'undefined'
  }
  /**
   * findSchemaByID
   *  Searches for a schema by ID.
   * @param {string} id The ID of Schema to find
   * @param {JSON} schema (Optional) Schema to search - defaults to main.
   * @returns The schema by id, or an empty object.
   */
  const getSchemaByID = (id, schema = props.schema) => {
    return Object.entries(schema.definitions).find((schema) => schema[0] === id)[1];
  }

  /**
   * presentOSCAL
   * @param {Object} object The object to enumerate, and present.
   * @returns JSX to present
   */
  const presentOSCAL = (object) => {
    switch (typeof(object)) {
      case "array":
        return object.map((key, value) => {
          <li>
            {key}: {value}
          </li>
        })
        break;

      case "object":
        return Object.entries(object).map((key, value) => {
          <li>
            {key}: {value}
          </li>
        })
        break;

      case "string":
        return (
          <li>
            {object}
          </li>
        )
        break;

      default:
        console.log('Unhandled case for OSCAL: %s', typeof object);
        break
    }
  }

  const resolveOSCAL = (oscal, schema) => {
    const schemaName = schema[0].split(':')[1] || false;
    const oscalContext = oscal || false;
    const schemaType = schema[1].type || false;

    /**
     * Enumerate our Schema.
     * 
     *  First; we will start with the elements that may not be nested.
     */
    Object.entries(schema[1]).map((entry) => {
      if (!isDefined(entry[1]["$ref"]) &&
        !isDefined(entry[1].items)) {

        if (!isDefined(oscalContext[entry[0]])) {
          presentOSCAL(oscalContext[entry[0]])
        }
      }
    });

    Object.entries(schema[1].properties).map((property) => {
      if (typeof property[1]["$ref"] !== 'undefined' ||
        (typeof property[1].items !== 'undefined' &&
          typeof property[1].items["$ref"])) {
        if (oscalContext[property[0]]) {
          resolveOSCAL(oscalContext[property[0]], schema);
        } else if (oscalContext[property[0] + 's']) {
          resolveOSCAL(oscalContext[property[0] + 's'], schema);
        }
      }
    })
  }

  return (
    <div className="Catalog">
      <div className="Catalog-uuid">
        UUID: {props.oscal.catalog.uuid}
      </div>
      {
        /**
         * Enumerate our schema definitions:
         */
        Object.entries(props.schema.definitions).map((definition) => {
          if (!isDefined(props.oscal[definition[0].split(':')[1]])) {
            resolveOSCAL(props.oscal[definition[0].split(':')[1]], definition);
          }
        })
      }




      {/* <Metadata metadata={props.catalog.metadata} />
      {
        props.catalog.groups.map((group) =>
          <Groups key={group.id} groups={group} />
        )
      } */}
    </div>
  );
}

export default Catalog;
