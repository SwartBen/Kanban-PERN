import React, { Fragment, useState } from "react";
import { Droppable } from "react-beautiful-dnd"
import {v4 as uuidv4} from 'uuid';

import './Column.css'
import Card from './Card'

const Column = (props) => {

    const addTask = () => {
        const tempColumns = props.columns[props.columnId]
        tempColumns.items.push({ id: uuidv4(), tags: [], date: Date(), title: "Test Add task" })
        props.setColumns({...props.columns})
    }
    return (
        <Droppable droppableId={props.columnId} key={props.columnId}>
            {(provided, snapshot) => {
                return (
                <div class="column" {...provided.droppableProps} ref={provided.innerRef}
                    style={{
                    background: snapshot.isDraggingOver ? "rgb(233,233,233,0.2)" : "rgb(233,233,233)",
                    }}
                >
                    { props.column.items.map((item, index) => {
                    return ( <Card id={item.id} index={index} card_info={item}/> );
                    })}
                    {provided.placeholder}

                <div class ="add-task" onClick={e=>addTask(props.columnId)}>+ Add Task</div>
                </div>
                );
            }}
        </Droppable>
    );
}

export default Column