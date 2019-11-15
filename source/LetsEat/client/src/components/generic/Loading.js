import React from "react";

const Loading = () => {

    const divStyle = {
        margin: '40px',
        textAlign: 'center'
    }

    return (
        <div style={divStyle}>
            <h2><i class="fa fa-spinner fa-pulse fa-fw"></i> Loading...</h2>
        </div>
    );

};

export default Loading;
