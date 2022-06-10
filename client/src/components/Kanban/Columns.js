import React, { Fragment, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd"

import Column from "./Column";

const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
        const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setColumns({
        ...columns,
        [source.droppableId]: {
            ...sourceColumn,
            items: sourceItems
        },
        [destination.droppableId]: {
            ...destColumn,
            items: destItems
        }
        });
    } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
        ...columns,
        [source.droppableId]: {
            ...column,
            items: copiedItems
        }
        });
    }
};

const Columns = (props) => {
    return (
        <DragDropContext onDragEnd={result => onDragEnd(result, props.columns, props.setColumns)}>

        {Object.entries(props.columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
                key={columnId}
              >
                <h2>{column.name}</h2>
                <div style={{ margin: 8}}>
                  <Column columns = {props.columns} columnId = {columnId} column = {column} setColumns={props.setColumns} />
                </div>
              </div>
            );
        })}
        </DragDropContext>
    )
}

export default Columns