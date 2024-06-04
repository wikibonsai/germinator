<script lang='ts'>
  import { onMount } from 'svelte';
  import { Graph } from '@antv/g6';
  // from: https://github.com/jonschlinkert/gray-matter/issues/171#issuecomment-2072454372
  import { default as matter } from 'gray-matter';
  import * as caml from 'caml-mkdn';
  import * as wikirefs from 'wikirefs';
  import { COLORS, DARK_GREEN, GREEN, LIGHT_BROWN } from '$lib/util/const';
  import { mkdnFrmt, theme, userConcept } from '$lib/util/store';

  export let markdown: string = 'no markdown received';
  export let height: number = 100;
  export let width: number = 100;
  let textColor: string = getTextColor();
  let atommap: any;
  let graph: any;
  const nodes = [];
  const edges = [];

  // update text color on theme change
  // (only passing in $theme to trigger reactivity)
  $: render($theme);
  // update graph on markdown change
  $: if (markdown && markdown.length > 0) {
    if (atommap) {
      render();
    }
  }

  onMount(() => {
    render();
  });

  function render(theme?: string) {
    textColor = getTextColor();
    getData();
    draw();
  }

  function getData() {
    nodes.length = 0;
    edges.length = 0;
    const coreNode: any = {
      id: $userConcept,
      style: {
        labelFill: textColor,
        labelPlacement: 'top',
      },
    };
    nodes.push(coreNode);
    // yaml
    if (markdown.includes('---')) {
      const payload: any = matter(markdown);
      const data: any = payload.data;
      for (const [key, value] of Object.entries(data)) {
        console.log('key: ', key, 'value: ', value);
        // single
        if(typeof value === 'string' && wikirefs.RGX.WIKI.LINK.test(value)) {
          add(key, value);
        // list
        } else {
          for (const v of value) {
            if(wikirefs.RGX.WIKI.LINK.test(v)) {
              add(key, v);
            }
          }
        }
      }
    // caml
    } else {
      const payload = wikirefs.scan(markdown);
      for (const i of payload) {
        for (const fname of i.filenames) {
          const attrtype: string = i.type[0];
          const wikilink: string = `[[${fname[0]}]]`;
          add(attrtype, wikilink);
        }
      }
    }
  }

  function add(key: string, value: string) {
    nodes.push({
      id: value,
      data: {
        cluster: key,
      },
      style: {
        labelFill: textColor,
        labelPlacement: 'top',
      },
    });
    edges.push({
      source: $userConcept,
      target: value,
      style: {
        color: LIGHT_BROWN,
      }
    });
  }

  function draw() {
    while (atommap && atommap.firstChild) {
      atommap.removeChild(atommap.firstChild);
    }
    graph = new Graph({
      container: 'atom',
      autoFit: 'center',
      // width/height matches that of parent div
      height: vToPx(`${height}vh`),
      width: vToPx(`${width}vw`),
      data: { nodes, edges, },
      layout: {
        type: 'radial',
        unitRadius: 100,
        linkDistance: 200,
        preventOverlap: true,
        maxPreventOverlapIteration: 100,
      },
      node: {
        style: {
          labelPlacement: 'center',
          labelText: (d) => d.id,
          lineWidth: 1,
          size: 20,
        },
        palette: {
          field: 'cluster',
          color: COLORS,
        },
      },
      edge: {
        style: {
          endArrow: false,
          color: LIGHT_BROWN,
        },
      },
      behaviors: [
        'zoom-canvas',
        'drag-canvas',
        'drag-element',
      ],
    });
    graph.render();
  }

  function getTextColor(): string {
    const cssVar: string = '--text-color';
    const computedStyle = getComputedStyle(document.documentElement);
    const colorValue = computedStyle.getPropertyValue(cssVar).trim();
    return colorValue;
  }

  // convert 'vh' and 'vw' to raw pixel size
  function vToPx(value) {
    const match = value.match(/^(\d+)(vh|vw)$/);
    if (match) {
      const [_, number, unit] = match;
      const window = document.documentElement;
      const pixels =
        unit === 'vh'
          ? (window.clientHeight * parseFloat(number)) / 100
          : (window.clientWidth * parseFloat(number)) / 100;
      return pixels;
    }
    return parseFloat(value);
  }
</script>

<!-- width/height matches that of graph -->
<div id='atom'
     bind:this={atommap}
     style={`height: ${height}vh; width: ${width}vw;`}></div>
