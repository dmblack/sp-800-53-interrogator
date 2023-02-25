import React from 'react';

const Control = (props) => {
  return (
    <div>
      <h2>{props.control.title}</h2>
      <p>ID: {props.control.id}</p>

      {/* Handle parameters */}
      {props.control.params && (
        <div>
          <h3>Parameters</h3>
          <ul>
            {
            Object.entries(props.control.params).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))
            }
          </ul>
        </div>
      )}

      {/* Handle properties */}
      {/* {control.props && (
        <div>
          <h3>Properties</h3>
          <ul>
            {Object.entries(control.props).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      )} */}

      {/* Handle links */}
      {/* {control.links && control.links.length > 0 && (
        <div>
          <h3>Links</h3>
          <ul>
            {control.links.map((link, index) => (
              <li key={index}>
                <a href={link.href}>{link.text}</a>
              </li>
            ))}
          </ul>
        </div>
      )} */}

      {/* Handle parts */}
      {/* {control.parts && control.parts.length > 0 && (
        <div>
          <h3>Parts</h3>
          <ul>
            {control.parts.map((part, index) => (
              <li key={index}>
                <Control control={part} />
              </li>
            ))}
          </ul>
        </div>
      )} */}

      {/* Handle child controls */}
      {/* {control.controls && control.controls.length > 0 && (
        <div>
          <h3>Controls</h3>
          <ul>
            {control.controls.map((childControl, index) => (
              <li key={index}>
                <Control control={childControl} />
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
}

const OSCALComponent = (props) => {
  const controls = props.oscal.catalog.groups[0].controls;

  return (
    <div>
      {controls.map((control, index) => (
        <Control key={index} control={control} />
      ))}
    </div>
  );
}

export default OSCALComponent;
