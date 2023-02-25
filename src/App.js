import './App.css';
import SP800_53 from './SP800_53/SP800_53';

/**
 * We use this as our current 'base' to test the app.
 */
const oscal = require('./oscal-content/nist.gov/SP800-53/rev5/json/NIST_SP-800-53_rev5_catalog.json');
/**
 * This is used to resolve all the properties an object may have.
 */
const schema = require('./oscal/json/schema/oscal_complete_schema.json');

const App = () => {
  return (
    <div className="App">
      <SP800_53 oscal={oscal} schema={schema} />
    </div>
  );
}

export default App;
