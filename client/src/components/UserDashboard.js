import React, {Fragment} from "react";

const UserDashboard = ({setAuth}) => {
    return (
        <Fragment>
            <h1>Dashboard</h1>
            <button onClick={() => setAuth(false)}>auth off</button>
        </Fragment>
    );
};

export default UserDashboard;