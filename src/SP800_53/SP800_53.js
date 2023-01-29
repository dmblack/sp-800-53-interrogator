import './SP800_53.css';
import BackMatter from './BackMatter';
import Catalog from './Catalog';

const SP800_53 = (props) => {  
  // const catalog = require('../oscal-content/nist.gov/SP800-53/rev5/json/NIST_SP-800-53_rev5_catalog.json').catalog;
  const catalog = require('./groups/controls/ExampleControl.json').catalog;
  const backMatter = require('./groups/controls/ExampleControl.json')['back-matter'];

  /**
   * Future function to resolve the OSCAL references ($ref) 
   */
  // const re = /(?<={{ )(.+?)(?= }})/g;
  // const resolveReferences = (jsonObj) => {
  //   for (let key in jsonObj) {
  //     if (jsonObj[key].toString().includes(" {{ ")) {
  //       const instances = jsonObj[key].toString().matchAll(re);

  //       const items = instances
  //         // Array.isArray(instances) 
  //         //   ? instances.forEach((instance) => { return instance[0].toString().split(': ')[1].toString().split(', ') })
  //         //   : false

  //       console.log('Index: ' + jsonObj[key])
  //       console.log('Instances: ' + instances);
  //       console.log('Items: ' + items);
  //       // let refObj = jsonObj;
  //       // refPath.forEach(pathPart => {
  //       //   refObj = refObj[pathPart];
  //       // });
  //       // Object.assign(jsonObj, refObj);
  //     } else if (typeof jsonObj[key] === "object") {
  //       resolveReferences(jsonObj[key]);
  //     }
  //   }
  //   return jsonObj;
  // }

  return (
    <div className="SP800_53">
      <Catalog catalog={catalog} />
      <BackMatter backMatter={backMatter} />
    </div>
  );
}

export default SP800_53;
