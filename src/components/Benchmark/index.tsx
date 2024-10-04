import { R3fExample } from "./R3fExample";
import { ThreejsExample } from "./ThreejsExample";
import { WebglExample } from "./WebglExample";

import "./index.css";

export const BenchMark = () => {
  return (
    <div className="container">
      <WebglExample />
      <ThreejsExample />
      <R3fExample />
    </div>
  );
};
