import G6, { Graph } from "@antv/g6";
import {useEffect, useRef} from "react";

interface Node {
    id: string;
    label: string;
    comboId?: string;
    style?: {
        fill: string;
        stroke: string;
    };
}

interface Edge {
    source: string;
    target: string;
}

interface Combo {
    id: string;
    label: string;
    style: {
        fill: string;
        stroke: string;
    };
}

interface Data {
    nodes: Node[];
    edges: Edge[];
    combos: Combo[];
}


// ts-ignore
const data : Data = {
    nodes: [
        {
            id: '0',
            label: '0',
        },
        {
            id: '1',
            label: '1',
        },
        {
            id: '2',
            label: '2',
        },
        {
            id: '3',
            label: '3',
        },
        {
            id: '4',
            label: '4',
            comboId: 'A',
        },
        {
            id: '5',
            label: '5',
            comboId: 'B',
        },
        {
            id: '6',
            label: '6',
            comboId: 'A',
        },
        {
            id: '7',
            label: '7',
            comboId: 'C',
        },
        {
            id: '8',
            label: '8',
            comboId: 'C',
        },
        {
            id: '9',
            label: '9',
            comboId: 'A',
        },
        {
            id: '10',
            label: '10',
            comboId: 'B',
        },
        {
            id: '11',
            label: '11',
            comboId: 'B',
        },
    ],
    edges: [
        {
            source: '0',
            target: '1',
        },
        {
            source: '0',
            target: '2',
        },
        {
            source: '1',
            target: '4',
        },
        {
            source: '0',
            target: '3',
        },
        {
            source: '3',
            target: '4',
        },
        {
            source: '2',
            target: '5',
        },
        {
            source: '1',
            target: '6',
        },
        {
            source: '1',
            target: '7',
        },
        {
            source: '3',
            target: '8',
        },
        {
            source: '3',
            target: '9',
        },
        {
            source: '5',
            target: '10',
        },
        {
            source: '5',
            target: '11',
        },
    ],
    combos: [
        {
            id: 'A',
            label: 'combo A',
            style: {
                fill: '#C4E3B2',
                stroke: '#C4E3B2',
            },
        },
        {
            id: 'B',
            label: 'combo B',
            style: {
                stroke: '#99C0ED',
                fill: '#99C0ED',
            },
        },
        {
            id: 'C',
            label: 'combo C',
            style: {
                stroke: '#eee',
                fill: '#eee',
            },
        },
    ],
};
data.nodes.forEach((node) => {
    // ts-ignore
    switch (node?.comboId) {
        case 'A':
            node.style = {
                fill: '#C4E3B2',
                stroke: '#aaa',
            };
            break;
        case 'B':
            node.style = {
                fill: '#99C0ED',
                stroke: '#aaa',
            };
            break;
        case 'C':
            node.style = {
                fill: '#eee',
                stroke: '#aaa',
            };
            break;
        default:
            node.style = {
                fill: '#FDE1CE',
                stroke: '#aaa',
            };
            break;
    }
});

function LearnG6() {

    let graph: Graph | null = null
    let graphRef = useRef(null);

    const draw = () => {

        let sortByCombo = false;
        const descriptionDiv = document.createElement('button');
        descriptionDiv.innerHTML = 'Enable sortByCombo';
        const container = document.getElementById('container');
        container?.appendChild(descriptionDiv);

        descriptionDiv.addEventListener('click', () => {
            sortByCombo = !sortByCombo;
            descriptionDiv.innerHTML = sortByCombo ? 'Disable sortByCombo' : 'Enable sortByCombo';
            // @ts-ignore
            graph.updateLayout({
                sortByCombo,
            });
        });
        // // 如果图形实例已经存在，则销毁它
        if (graph && !graph.get('destroyed')) {
            graph.destroy();
        }


        // @ts-ignore
        const width = graphRef.current?.clientWidth;
        // @ts-ignore
        const height = graphRef.current?.clientHeight;

        graph = new G6.Graph({
            container: 'container',
            width,
            height: height - 50,
            fitView: true,
            fitViewPadding: 30,
            animate: true,
            groupByTypes: false,
            modes: {
                default: [
                    'drag-combo',
                    'drag-node',
                    'drag-canvas',
                    {
                        type: 'collapse-expand-combo',
                        relayout: false,
                    },
                ],
            },
            layout: {
                type: 'dagre',
                sortByCombo: false,
                ranksep: 10,
                nodesep: 10,
            },
            defaultNode: {
                size: [60, 30],
                type: 'rect',
                anchorPoints: [[0.5, 0], [0.5, 1]]
            },
            defaultEdge: {
                type: 'line',
            },
            defaultCombo: {
                type: 'rect',
                style: {
                    fillOpacity: 0.1,
                },
            },
        });
        // @ts-ignore
        graph.data(data);
        graph.render();


        if (typeof window !== 'undefined')
            window.onresize = () => {
                if (!graph || graph.get('destroyed')) return;
                if (!container || !container.scrollWidth || !container.scrollHeight) return;
                graph.changeSize(container.scrollWidth, container.scrollHeight - 30);
            };


    };

    useEffect(() => {
        draw()
    }, []);

    return (
        <>
            <div ref={graphRef} className={'w-full min-h-[800px] border border-1 border-gray-100 rounded m-auto'}
                 id="container"></div>
        </>
    );
}

export default LearnG6;