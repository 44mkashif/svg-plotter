import React from 'react';

const Input = ({ shapes }) => {

    var chars = '0123456789ABCDEF'.split('');

    function randomColor() {
        var color = '#';
        for (var i = 0; i < 6; i++)
            color += chars[Math.floor(Math.random() * 16)];
        return color;
    };

    return (
        <React.Fragment>
            <svg width={250} height={250} style={{ border: '1px solid #ccc' }}>
                {(shapes && shapes.length) ?
                    shapes.map(shape => {
                        if (shape.type === "c")
                            return <circle
                                key={shape.type}
                                cx={shape.dimensions[0]}
                                cy={shape.dimensions[1]}
                                r={shape.dimensions[2]}
                                fill={randomColor()} />

                        else if (shape.type === "e")
                            return <ellipse
                                key={shape.type}
                                cx={shape.dimensions[0]}
                                cy={shape.dimensions[1]}
                                rx={shape.dimensions[2]}
                                ry={shape.dimensions[3]}
                                fill={randomColor()} />

                        else if (shape.type === "p") {
                            var dim = '';
                            shape.dimensions.forEach(dimension => {
                                dim += [...dimension].join(',') + " ";
                            });
                            return <polygon
                                key={shape.type}
                                points={dim}
                                fill={randomColor()} />
                        }

                        else if (shape.type === "r")
                            return <rect
                                key={shape.type}
                                x={shape.dimensions[0]}
                                y={shape.dimensions[1]}
                                width={shape.dimensions[2]}
                                height={shape.dimensions[3]}
                                fill={randomColor()} />
                    }
                    ) : ''
                }
            </svg>
        </React.Fragment>
    )
}

export default Input;