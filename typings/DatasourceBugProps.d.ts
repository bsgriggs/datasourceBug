/**
 * This file was generated from DatasourceBug.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { DynamicValue, ListValue, ListAttributeValue, ReferenceValue } from "mendix";
import { Big } from "big.js";

export interface DatasourceBugContainerProps {
    name: string;
    tabIndex?: number;
    id: string;
    dataSource: ListValue;
    content: ListAttributeValue<string>;
    limit: DynamicValue<Big>;
    association: ReferenceValue;
}

export interface DatasourceBugPreviewProps {
    readOnly: boolean;
    dataSource: {} | { caption: string } | { type: string } | null;
    content: string;
    limit: string;
    association: string;
}
