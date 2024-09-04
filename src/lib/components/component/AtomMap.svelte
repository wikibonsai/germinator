<script lang="ts">

  import { onMount } from 'svelte';
  let ForceGraph: any;
  let graph: any;
  let atommap: any;

  import { default as matter } from 'gray-matter';
  import * as caml from 'caml-mkdn';
  import * as wikirefs from 'wikirefs';
  import { COLORS, LIGHT_BROWN } from '$lib/util/const';
  import { mkdnFrmt, theme, userConcept } from '$lib/util/store';

  export let markdown: string = 'no markdown received';
  export let height: number = 100;
  export let width: number = 100;
  const nodes: any[] = [];
  const links: any[] = [];
  const groupColors: Record<string, string> = {};
  let colorIndex = 0;
  
  $: sourceUserConcept = `[[${$userConcept}]]`;
  // update text color on theme change
  $: render($theme);
  // update graph on markdown change
  $: if (markdown && markdown.length > 0 && atommap) {
    render();
  }

  onMount(async () => {
    // Import force-graph only on the client side
    ForceGraph = (await import('force-graph')).default;
    render();
  });

  function render(theme?: string) {
    if (!ForceGraph) return;
    getData();
    draw();
  }

  function getData() {
    nodes.length = 0;
    links.length = 0;
    groupColors[''] = getNextColor();
    const coreNode: any = {
      id: sourceUserConcept,
      label: sourceUserConcept,
      color: groupColors[''],
    };
    nodes.push(coreNode);
    // yaml
    if (markdown.includes('---')) {
      const payload: any = matter(markdown);
      const data: any = payload.data;
      for (const [key, value] of Object.entries(data)) {
        if (!groupColors[key]) {
          groupColors[key] = getNextColor();
        }
        // single
        if (typeof value === 'string' && wikirefs.RGX.WIKI.LINK.test(value)) {
          add(key, value);
        // list
        } else {
          for (const v of value) {
            if (wikirefs.RGX.WIKI.LINK.test(v)) {
              add(key, v);
            }
          }
        }
      }
    // caml
    } else {
      const payload: any = wikirefs.scan(markdown);
      for (const i of payload) {
        for (const fname of i.filenames) {
          const attrtype: string = i.type[0];
          const wikilink: string = `[[${fname[0]}]]`;
          if (!groupColors[attrtype]) {
            groupColors[attrtype] = getNextColor();
          }
          add(attrtype, wikilink);
        }
      }
    }
  }

  function add(key: string, value: string) {
    nodes.push({
      id: value,
      label: value,
      group: key,
      color: groupColors[key],
    });
    links.push({
      source: sourceUserConcept,
      target: value,
      color: LIGHT_BROWN,
    });
  }

  function draw() {
    while (atommap && atommap.firstChild) {
      atommap.removeChild(atommap.firstChild);
    }
    if (!ForceGraph) return;
    console.log({ nodes, links });

    graph = ForceGraph()(atommap)
      .graphData({ nodes, links })
      .width(vToPx(`${width}vw`))
      .height(vToPx(`${height}vh`))
      .linkColor('color')
      // .linkDirectionalParticles(2)
      // .linkDirectionalParticleSpeed(d => d.value * 0.001)
      .nodeId('id')
      .nodeCanvasObject((node, ctx, globalScale) => {
        // node
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, 2 * Math.PI, false);
        ctx.fill();
        // label
        ctx.font = `${12 / globalScale}px Sans-Serif`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        const rootStyle: CSSStyleDeclaration = getComputedStyle(document.documentElement);
        const textColor: string = rootStyle.getPropertyValue('--text-color').trim();
        ctx.fillStyle = textColor;
        ctx.fillText(node.label, node.x + 5, node.y);
      })
      .onNodeDragEnd(node => {
        node.fx = node.x;
        node.fy = node.y;
      });
  }

  function getNextColor(): string {
    // increment color
    const color: string = COLORS[colorIndex];
    // cycle colors
    colorIndex = (colorIndex + 1) % COLORS.length;
    return color;
  }

  function vToPx(value: string) {
    const match: RegExpMatchArray | null = value.match(/^(\d+)(vh|vw)$/);
    if (match) {
      const [_, number, unit] = match;
      const window: any = document.documentElement;
      const pixels: number =
        unit === 'vh'
          ? (window.clientHeight * parseFloat(number)) / 100
          : (window.clientWidth * parseFloat(number)) / 100;
      return pixels;
    }
    return parseFloat(value);
  }
</script>

<!-- width/height matches that of graph -->
<div id='atom' bind:this={atommap} style={`height: ${height}vh; width: ${width}vw;`}></div>
