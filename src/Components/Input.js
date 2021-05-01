import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
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
        console.log(this.state.input)
        const input = this.state.input.trim();
        var lines = input.split("\n");
        var shapes = [];

        lines.forEach(line => {
            const shape = line.split(" ");

            // console.log("Shape atributes: ", shape);
            var dimensions = shape.slice(1);
            dimensions = dimensions.filter((str) => /\S/.test(str));

            shapes.push({
                type: shape[0],
                dimensions: dimensions
            })
        });
        console.log(shapes);

        this.checkErrors(shapes);

    }

    checkErrors = (shapes) => {
        var flag = false;
        const lines = [];

        shapes.forEach((shape, index) => {
            if (shape.type !== "r" && shape.type !== "c" && shape.type !== "p" && shape.type !== "e") {
                flag = true;
                lines.push(index + 1);
            }
            if (shape.type === "r" && shape.dimensions.length !== 4) {
                flag = true;
                lines.push(index + 1);
            }
            if (shape.type === "c" && shape.dimensions.length !== 3) {
                flag = true;
                lines.push(index + 1);
            }
            if (shape.type === "e" && shape.dimensions.length !== 4) {
                flag = true;
                lines.push(index + 1);
            }
        });

        if (flag && lines.length >> 0) {
            this.setState({
                error: true,
                errorMessage: `Please provide valid shape command at line number ${lines}.`
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
                    <Typography align="left">A warning will be displayed if the shape is drawn outside the box.</Typography>
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