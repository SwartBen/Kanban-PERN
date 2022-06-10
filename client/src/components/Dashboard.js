import React, { Fragment, useState, useEffect } from "react";

import Kanban from './Kanban/Kanban'
import Card from './Kanban/Card'
import { columnsFromBackend } from "./local_db";
import {v4 as uuidv4} from 'uuid';

const Dashboard = ({setAuth}) => {

    const [name, setName] = useState("")

    const [kanban_data, setBoards] = useState(columnsFromBackend)

    const addCardHandler = (id) => {
        const tempBoards = [...kanban_data];
        tempBoards[id].items.push({
          id: uuidv4(),
          content: 'test'
        });
        setBoards(tempBoards);

        console.log(kanban_data[id])
      };

    async function getName() {
        try {
            const response = await fetch("http://localhost:5000/dashboard/", {
                method: "GET",
                headers: {token: localStorage.token}
            });

            const parseRes = await response.json()
            setName(parseRes.user_name)
        } catch (err) {
            console.log(err.message)
        }
    }

    const logout = e => {
        e.preventDefault()
        localStorage.removeItem("token")
        setAuth(false)
    }

    useEffect(() => {
        getName()
    }, [])
    return (
        <Fragment>
            <h1>Welcome {name} to your dashboard!</h1>
            <button className="btn btn-primary" onClick={e=>logout(e)}>Logout</button>
            <Kanban />
        </Fragment>
    )
}

export default Dashboard