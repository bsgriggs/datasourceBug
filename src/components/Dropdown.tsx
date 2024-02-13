import { ReactElement, createElement, useMemo, useEffect, useCallback, ChangeEvent, useState } from "react";
import { DatasourceBugContainerProps } from "typings/DatasourceBugProps";
import { ValueStatus, ObjectItem } from "mendix";

interface option {
    key: ObjectItem;
    caption: string;
    selected: boolean;
}

export function Dropdown(props: DatasourceBugContainerProps): ReactElement {
    const [options, setOptions] = useState<option[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    //Memoize the Limit value
    const limit = useMemo(
        () =>
            props.limit.status === ValueStatus.Available && props.limit.value ? Number(props.limit.value) : Infinity,
        [props.limit]
    );

    //Apply initial limit
    useEffect(() => {
        console.info("set the limit to 0", props.dataSource.status);
        props.dataSource.setLimit(0);
    }, []);

    //When the limit changes
    useEffect(() => {
        if (open) {
            setOptions(
                props.dataSource.status === ValueStatus.Available && props.dataSource.items
                    ? props.dataSource.items.map(value => ({
                          key: value,
                          caption: props.content.get(value).value as string,
                          selected: props.association.value === value
                      }))
                    : []
            );
        }
    }, [limit, props.dataSource, props.content, props.association, open]);

    const renderOptions = useCallback(() => {
        if (
            props.association.value &&
            options.find(value => value.key.id === props.association.value?.id) === undefined
        ) {
            //Make sure the current value appears in the list
            const emptyOption = <option key={undefined}></option>;
            const currentValueOption = (
                <option key={props.content.get(props.association.value).value}>
                    {props.content.get(props.association.value).value}
                </option>
            );
            return [
                emptyOption,
                currentValueOption,
                options.map(option => <option key={option.caption}>{option.caption}</option>)
            ];
        } else {
            const emptyOption = <option key={undefined}></option>;
            return [emptyOption, options.map(option => <option key={option.caption}>{option.caption}</option>)];
        }
    }, [options, props.association, props.content]);

    const handleSelect = useCallback(
        (e: ChangeEvent<HTMLSelectElement>) => {
            const selectedOption = options.find(option => option.caption === e.target.value);
            props.association.setValue(selectedOption?.key);
        },
        [props.association, options]
    );

    const handleFocus = useCallback(() => {
        setOpen(true);
        if (props.dataSource.status === ValueStatus.Available) {
            props.dataSource.setLimit(limit);
        }
    }, [props.dataSource]);

    const handleBlur = useCallback(() => {
        setOpen(false);
        if (props.dataSource.status === ValueStatus.Available) {
            props.dataSource.setLimit(0);
        }
        setOptions([]);
    }, [props.dataSource]);

    // console.info({ props, state: { open, limit, options }, selected: props.association });
    console.info({ propsLimit: props.dataSource.limit, stateLimit: limit, status: props.dataSource.status });

    return (
        <select
            id={props.id}
            value={props.association.value ? props.content.get(props.association.value).value : undefined}
            onChange={handleSelect}
            onFocus={handleFocus}
            onBlur={handleBlur}
        >
            {open ? (
                renderOptions()
            ) : props.association.value ? (
                <option key={props.content.get(props.association.value).value}>
                    {props.content.get(props.association.value).value}
                </option>
            ) : (
                <option key={undefined}></option>
            )}
        </select>
    );
}
