import './Catalog.css';
import Groups from './Groups';
import Metadata from './Metadata';

const Catalog = (props) => {

  return (
    <div className="Catalog">
      <div className="Catalog-uuid">
        UUID: {props.catalog.uuid}
      </div>
      <Metadata metadata={props.catalog.metadata} />
      {
        props.catalog.groups.map((group) =>
          <Groups key={group.id} groups={group} />
        )
      }
    </div>
  );
}

export default Catalog;
