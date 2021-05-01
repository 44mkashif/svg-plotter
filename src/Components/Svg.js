import React, { Component } from 'react';

class Input extends Component {

    state = {
        dimensions: ''
    };

    render() {
        let { dimensions } = this.state;

        return (
            <React.Fragment>
                <svg width={250} height={250} style={{ border: '1px solid #ccc' }}>
                    <polygon points="200,10 150,190 60,10" fill="blue" />
                    <ellipse cx={125} cy={125} rx={100} ry={50} fill="pink" />
                    <rect x={75} y={75} width={100} height={100} fill="green" />
                    <circle cx={125} cy={125} r={20} fill="red" />
                </svg>
            </React.Fragment>
        )

    }

}

export default Input;