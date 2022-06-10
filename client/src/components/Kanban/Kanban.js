import React, { Fragment, useState } from "react";

import Columns from './Columns'
import { columnsFromBackend } from '../local_db'

const Kanban = () => {

  const [columns, setColumns] = useState(columnsFromBackend);

    return (
      <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
        <Columns columns={columns} setColumns={setColumns}/>
      </div>
    );
}

export default Kanban;