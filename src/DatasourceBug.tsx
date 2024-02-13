import { ReactElement, createElement } from "react";
import { Dropdown } from "./components/Dropdown";

import { DatasourceBugContainerProps } from "../typings/DatasourceBugProps";

import "./ui/DatasourceBug.css";

export function DatasourceBug(props: DatasourceBugContainerProps): ReactElement {
    return <Dropdown {...props} />;
}
