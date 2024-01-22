<script lang='ts'>
  import type { PageData } from './$types'
  import { DEMO_MKDN } from '$lib/util/const';
  import { goTo } from '$lib/util/func';
  import AppTabSelect from '$lib/components/landing/AppTabSelect.svelte';
  import BonsaisDropDown from '$lib/components/DropDown.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Header from '$lib/components/Header.svelte';
  import MarkMap from '$lib/components/MarkMap.svelte';
  import TendNTinkerCards from '$lib/components/landing/TendNTinkerCards.svelte';
  // import VinesSVG from '$lib/components/landing/VinesSVG.svelte';
  import WorkflowsShowCase from '$lib/components/landing/WorkflowsShowCase.svelte';

  export let data: PageData;

  let temp: SVGSVGElement | null ;

  const localGerm: string = '/germ';
  const localBonsai: string = '/bonsai'
  const repo: string = 'https://github.com/wikibonsai/';
  const appVSCodeWikiBonsai: string = 'https://marketplace.visualstudio.com/items?itemName=manunamz.vscode-wikibonsai';
  const appTendrCLI: string = 'https://www.npmjs.com/package/tendr-cli';
</script>

<Header></Header>
<main class="main-content">
  <section class="intro">
    <div class="title-container">
      <h1 class="main-title">a jungle gym for thought,</h1>
      <h1 class="main-title">with an API for the mind.</h1>
    </div>
    <div class="subtitle-container">
      <p class="subtitle">
        WikiBonsai is a methodology and set of tools that
      </p>
      <p class="subtitle">
        nudge note-taking toward meaningful mind-training
      </p>
      <!-- <p class="subtitle">
        and bridges the divide between plaintext, spatial computing, and AI.
      </p> -->
    </div>
    <div class="dropdown-container">
      <BonsaisDropDown title={'bonsais'} items={data.bonsais}></BonsaisDropDown>
    </div>
  </section>
  <!-- <VinesSVG></VinesSVG> -->
  <!-- workflows section -->
  <section class="description">
    <h1 class="description-title">Workflows</h1>
    <div class="description-body description-body-col">
      The WikiBonsai project strives to add specific workflows to the infrastructure of the internet:
      <WorkflowsShowCase></WorkflowsShowCase>
    </div>
  </section>
  <!-- ai section -->
  <section class="description">
    <h1 class="description-title">🌱 Tools for Germinating</h1>
    <div class="description-body description-body-col">
      Tease apart complex concepts with the help of AI analysis.
      <div class="germ-viz">
        <span class="germinator">🤖</span>
        <MarkMap markdown={DEMO_MKDN}
                 markmap={temp}
                 move={false}
                 height={25}
                 width={45}>
        </MarkMap>
      </div>
      <div class="come-with-me">
        <span>Come with me if you want to</span>
        <button class="btn" on:click={goTo(localGerm)}>grow</button>
      </div>
    </div>
  </section>
  <!-- app-group section -->
  <section class="description">
    <h1 class="description-title">✂️ Tools for Tending</h1>
    <div class="description-body description-body-col">
      Tend your digital garden and knowledge bonsai from...
      <AppTabSelect></AppTabSelect>
    </div>
  </section>
  <!-- ssg section -->
  <section class="description">
    <h1 class="description-title">💐 Tools for Showcasing</h1>
    <div class="description-body description-body-col">
      Showcase what you've cultivated with your favorite static site generator.
      <div class="ssg">
        <a href="https://astro-wikibonsai.netlify.app">
          <img class="ssg-logo img-btn" src="/img/social/Astro.svg" alt="astro-wikibonsai"/>
        </a>
        <a href="https://eleventy-wikibonsai.netlify.app">
          <img class="ssg-logo img-btn" src="/img/social/eleventy-logo.svg" alt="eleventy-wikibonsai"/>
        </a>
        <a href="https://jekyll-wikibonsai.netlify.app">
          <img class="ssg-logo img-btn" src="/img/social/jekyll.png"alt="jekyll-wikibonsai"/>
        </a>
      </div>
    </div>
  </section>
  <!-- open source section -->
  <section class="description">
    <h1 class="description-title">✨ Tools for Tinkering</h1>
    <div class="description-body description-body-row">
      <img class="oss-logo" src="/img/social/oss.svg" alt="oss"/>
      <div class="oss-description">
        <span class="oss-description-txt">
           Many of the the WikiBonsai projects are open source to encourage standardization and long-term sustainability.
        </span>
        <button class="btn" on:click={goTo(repo)}>GitHub</button>
      </div>
    </div>
  </section>
  <!-- call to action -->
  <section class="description">
    <h1 class="description-title">So Go Tend'n'Tinker...</h1>
    <span class="description-body description-body-col">
      <TendNTinkerCards content={
        {
          'Maps': [localBonsai, 'Browse some example knowledge bonsais.'],
          'The Germinator': [localGerm, 'Query an LLM to generate conceptual analyses.'],
          'Markdown': [appVSCodeWikiBonsai, 'Tend your markdown notes in VSCode.'],
          // 'CLI': [appTendrCLI, 'Tend your markdown notes in the CLI.'],
        }
      }></TendNTinkerCards>
    </span>
  </section>
</main>
<Footer></Footer>

<style>
  /* todo: logo img + text styles are duplicated in header/footer */
  @import url('https://fonts.cdnfonts.com/css/terminator-2');

  .btn {
    background: var(--btn-color);
    color: white;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    margin: 0.5rem;
  }

  .btn:hover {
    background: var(--btn-color--hover);
  }

  /* .btn-pad {
    margin-right: 1rem;
  } */

  .dropdown-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    padding-top: 4rem;
  }

  .intro {
    padding: 1rem;
  }

  .main-content {
    background-color: var(--background-color);
    padding: 1rem;
  }

  .main-title {
    text-align: center;
    /* small */
    font-size: 2rem;
    margin: 0.5rem 0;
  }

  .subtitle {
    color: var(--accent-text-color);
    /* small */
    font-size: 0.83rem;
  }

  .subtitle-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .title-container {
    padding: 1rem;
  }

  .description {
    padding: 1rem;
    text-align: center;
  }

  .description-title {
    text-align: left;
    font-weight: bold;
    margin-bottom: 2rem;
    /* small */
    font-size: 2rem;
  }

  /* todo: split description-body into row v column arrangement */

  .description-body {
    display: flex;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    text-align: left;
  }

  .description-body-col {
    flex-direction: column;
  }

  .description-body-row {
    justify-content: space-around;
    align-items: center;
    /* small */
    flex-direction: column;
  }

  .germ-viz {
    align-self: center;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
  }

  .germinator {
    margin-right: 1rem;
    /* small */
    font-size: 3rem;
  }

  .come-with-me {
    font-family: 'Terminator', sans-serif;
    align-self: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1rem;
  }

  .ssg {
    align-self: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 2rem;
    padding-bottom: 0;
  }

  .ssg-logo {
    width: 80%;
    /* small */
    height: 90px;
    width: 90px;
    margin: 0.5rem;
  }

  .oss-description {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    font-size: 1rem;
    padding: 2rem;
  }

  .oss-description-txt {
    font-size: 1.25rem;
    padding: 1rem;
    text-align: center;
  }

  .oss-logo {
    /* small */
    width: 50%;
    margin: 1rem;
  }

  @media (min-width: 768px) {

    .btn {
      display: block;
    }

    /* .btn-pad {
      margin-right: 2rem;
    } */

    .description {
      padding: 2rem;
    }

    .description-title {
      /* margin-bottom: 2rem; */
      font-size: 3rem;
    }

    .description-body-row {
      flex-direction: row;
    }

    .germinator {
      font-size: 5rem;
    }

    .intro {
      padding-top: 5rem;
    }

    .main-content {
      margin: auto;
      max-width: 1200px;
    }

    .main-title {
      font-size: 3rem;
      margin: 0;
    }

    .oss-logo {
      width: 25%;
      margin: 4rem;
    }

    .ssg-logo {
      height: 150px;
      width: 150px;
      margin: 2rem;
    }

    .subtitle {
      font-size: 1.25rem;
    }
  }

  @media (min-width: 1200px) {
    .main-content {
      padding: 2rem;
    }
  }
</style>
