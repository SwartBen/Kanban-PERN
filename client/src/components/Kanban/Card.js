import React, { Fragment, useState } from "react";
import { Draggable } from "react-beautiful-dnd"
import './Card.css'

const Card = (props) => {
    return (
        <Draggable key={props.id} draggableId={props.id} index={props.index}>
            {(provided, snapshot) => {
                return (
                <div class = "card" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                    style={{
                    userSelect: "none",
                    //backgroundColor: snapshot.isDragging ? "#263B4A" : "white",
                    ...provided.draggableProps.style
                    }}
                >
                    <div class="tags">
                        {props.card_info.tags}
                    </div>
                    <div class="content">
                        {props.card_info.title}
                    </div>
                    <div class="date">
                        {props.card_info.date.substring(0, 10)}
                    </div>
                </div>
                );
            }}
        </Draggable>
    )
}

export default Card