import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';

class Input extends Component {

    state = {
        input: '',
        error: false,
        errorMessage: ''
    };

    handleChange = (event) => {
        this.setState({
            input: event.target.value,
        })
    }

    processInput = () => {
        console.log("Input: ", this.state.input)
        const input = this.state.input.trim();
        var lines = input.split("\n");
        var shapes = [];

        lines.forEach(line => {
            var shape = line.split(" ");
            shape = shape.filter((str) => /\S/.test(str));

            var dimensions = shape.slice(1);

            if (shape[0] === "p") {

                const points = dimensions;
                dimensions = []
                points.forEach(point => {
                    point = point.trim().split(",");
                    point = point.filter((str) => /\S/.test(str));
                    point = point.map(item => parseInt(item))
                    dimensions.push(point)
                });
            } else {
                dimensions = dimensions.map(item => parseInt(item));
            }

            shapes.push({
                type: shape[0],
                dimensions: dimensions
            })
        });
        console.log("Shapes: ", shapes);

        this.checkErrors(shapes);

        if (!this.state.error) {
            this.props.setShapes(shapes);
        }

    }

    checkErrors = (shapes) => {
        var flag = false;
        const lines = new Set();

        shapes.forEach((shape, index) => {
            if (shape.type !== "r" && shape.type !== "c" && shape.type !== "p" && shape.type !== "e") {
                flag = true;
                lines.add(index + 1);
            }
            else if (shape.type === "r") {
                if (shape.dimensions.length !== 4) {
                    flag = true;
                    lines.add(index + 1);
                } else {
                    shape.dimensions.forEach(dimension => {
                        if (Number.isNaN(dimension) || dimension < 0 || dimension >= 1000) {
                            flag = true;
                            lines.add(index + 1);
                        }
                    });
                }
            }
            else if (shape.type === "c") {
                if (shape.dimensions.length !== 3) {
                    flag = true;
                    lines.add(index + 1);
                } else {
                    shape.dimensions.forEach(dimension => {
                        if (Number.isNaN(dimension) || dimension < 0 || dimension >= 1000) {
                            flag = true;
                            lines.add(index + 1);
                        }
                    });
                }
            }
            else if (shape.type === "e") {
                if (shape.dimensions.length !== 4) {
                    flag = true;
                    lines.add(index + 1);
                } else {
                    shape.dimensions.forEach(dimension => {
                        if (Number.isNaN(dimension) || dimension < 0 || dimension >= 1000) {
                            flag = true;
                            lines.add(index + 1);
                        }
                    });
                }
            }
            else if (shape.type === "p") {
                const dimensions = shape.dimensions;

                dimensions.forEach(dimension => {
                    if (dimension.length !== 2) {
                        flag = true;
                        lines.add(index + 1);
                    } else {
                        dimension.forEach(point => {
                            if (Number.isNaN(point) || point < 0 || point >= 1000) {
                                flag = true;
                                lines.add(index + 1);
                            }
                        });
                    }
                });
            }
        });

        if (flag) {
            this.setState({
                error: true,
                errorMessage: 'Please provide valid shape command at line number ' + [...lines].join(', ')
            })
        } else {
            this.setState({
                error: false,
                errorMessage: ''
            })
        }
    }

    render() {
        let { input } = this.state;

        return (
            <React.Fragment>
                <Box width="70%">
                    <TextField
                        variant="outlined"
                        margin="dense"
                        placeholder="r 0 0 100 100"
                        fullWidth
                        onChange={this.handleChange}
                        multiline
                        rows={7}
                        value={input}
                    />
                </Box>

                <Box mt={2} mb={3}>
                    <Typography align="left" variant="h5">Note:</Typography>
                    <Typography align="left">Height, width and radius must be greater than 0 and less than 1000.</Typography>
                    <Typography align="left">Coordinates should be greater than equal to 0 and less than 1000.</Typography>
                    <Typography align="left">Start and end spaces within each line will be trimed automatically.</Typography>
                    <Typography align="left">An empty line command will cause an error.</Typography>
                </Box>

                {this.state.error ?
                    <Box width="70%" mb={2}>
                        <Alert severity="error">{this.state.errorMessage}</Alert>
                    </Box>
                    :
                    <div></div>
                }

                <Box width="70%">
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => this.processInput()}>
                        Draw
                    </Button>
                </Box>

            </React.Fragment>
        )

    }

}

export default Input;