import './SP800_53.css';
import BackMatter from './BackMatter';
import Catalog from './Catalog';

const SP800_53 = (props) => {  
  const SP80053 = require('../oscal-content/nist.gov/SP800-53/rev5/json/NIST_SP-800-53_rev5_catalog.json');

  return (
    <div className="SP800_53">
      <Catalog catalog={SP80053.catalog} />
      <BackMatter backMatter={SP80053.catalog["back-matter"]} />
    </div>
  );
}

export default SP800_53;
