import React from "react";

const JsonList = ({ data }) => {
  if (data === null) {
    return <span>null</span>;
  }

  // Primitive values
  if (typeof data !== "object") {
    return <span>{String(data)}</span>;
  }

  return (
    <ul>
      {Array.isArray(data)
        ? data.map((item, index) => (
            <li key={index}>
              <JsonList data={item} />
            </li>
          ))
        : Object.entries(data).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong>{" "}
              <JsonList data={value} />
            </li>
          ))}
    </ul>
  );
};

export default JsonList;