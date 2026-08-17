import * as JXG from "jsxgraph";

export function complexPlane(div, { width, height }) {
    const board = JXG.JSXGraph.initBoard(div, {
        boundingbox: [-width, height, width, -height], 
        axis: false,
        showCopyright: false, 
        showNavigation: false
    });

    board.create("axis", [[0, 0], [1, 0]], {
        name: "Re",
        withLabel: true,
        label: {
            offset: [-10, 10],
            strokeColor: "gray"
        },
        ticks: {
            label: {
                strokeColor: "gray"
            }
        }
    });

    board.create("axis", [[0, 0], [0, 1]], {
        name: "Im",
        withLabel: true,
        label: {
            offset: [-10, 10],
            strokeColor: "gray"
        },
        ticks: {
            generateLabelText: (tick, zero) => {
                const val = Math.round(tick.usrCoords[2]);
                if (val === 0) return '0';
                if (val === 1) return 'i';
                if (val === -1) return '-i';
                return val + 'i';
            },
            label: {
                strokeColor: "gray"
            }
        }
    });

    return board;
}

export function complexPoint(board, { x, y }) {
    const z = board.create("point", [x, y], {
        name: "", 
        showInfobox: false,
        size: 4, 
        color: "steelblue",
        label: {
            strokeColor: "steelblue"
        }
    });

    z.setAttribute({
        name: () => {
            const re = z.X();
            const im = z.Y();
            const sign = im < 0 ? '-' : '+';
            return `${re.toFixed(2)} ${sign} ${Math.abs(im).toFixed(2)}i`;
        }
    })

    /*{
        const re = z.X();
        const im = z.Y();
        const sign = im < 0 ? '-' : '+';
        z.setAttribute({
            infoboxText: `${re.toFixed(2)} ${sign} ${Math.abs(im).toFixed(2)}i`
        });
    }

    z.on('drag', function () {
        const re = z.X();
        const im = z.Y();
        const sign = im < 0 ? '-' : '+';
        z.setAttribute({
            infoboxText: `${re.toFixed(2)} ${sign} ${Math.abs(im).toFixed(2)}i`
        });
    });*/

    return z;
}