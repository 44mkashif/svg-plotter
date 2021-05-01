import Input from './Input';
import Svg from './Svg';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Component } from 'react';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

class Plotter extends Component {

    state = {
        shapes: []
    }

    setShapes = (shapes) => {
        this.setState({
            shapes: shapes
        })
    }

    clearShapes = () => {
        this.setState({
            shapes: []
        })
    }

    render() {
        return (
            <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>

                    <Box mb={3}>
                        <Typography align="left" variant="h3">Welcome to SVG Plotter App</Typography>
                    </Box>

                    <Typography align="left">Shapes can be plotted as SVGs in 250px x 250px grid.</Typography>

                    <Box mt={2}>
                        <Typography align="left" variant="h4">Instructions</Typography>
                    </Box>

                    <Box mt={2}>
                        <Typography align="left" variant="h5">Draw a Rectangle</Typography>
                        <Typography align="left">r X-Coordinate Y-Coordinate width height. e.g <strong>r 75 75 100 100</strong></Typography>
                    </Box>

                    <Box mt={2}>
                        <Typography align="left" variant="h5">Draw a Circle</Typography>
                        <Typography align="left">c CX-Coordinate CY-Coordinate radius. e.g <strong>c 125 125 20</strong></Typography>
                    </Box>

                    <Box mt={2}>
                        <Typography align="left" variant="h5">Draw a Polygon</Typography>
                        <Typography align="left">p C1,Y1 X2,Y2 Xn,Yn. e.g <strong>p 200,10 150,190 60,10</strong></Typography>
                    </Box>

                    <Box mt={2} mb={2}>
                        <Typography align="left" variant="h5">Draw an Ellipse</Typography>
                        <Typography align="left">e CX-Coordinate CY-Coordinate RX-Radius RY-Radius. e.g <strong>e 125 125 100 50</strong></Typography>
                    </Box>

                    <Divider />

                    <Box mt={2}>
                        <Input setShapes={this.setShapes} />
                    </Box>

                </Grid>
                <Grid item xs={12} sm={6}>

                    <Box mb={3}>
                        <Typography align="left" variant="h3">Shapes</Typography>
                    </Box>

                    <Typography align="left">SVG Container Size: 250px x 250px</Typography>


                    <Box mt={3} display="flex">
                        <Svg shapes={this.state.shapes} />
                    </Box>

                    <Box mt={3} width="250px" display="flex">
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={this.clearShapes}>
                            Clear
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        );
    }
}

export default Plotter;