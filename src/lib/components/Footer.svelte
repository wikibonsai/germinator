<script lang='ts'>
  import { theme } from '$lib/util/store';
  import Logo from '$lib/components/Logo.svelte';

  const logoGitHub: string = `/img/social/github-mark-${$theme}.svg`;
  const logoX: string = `/img/social/x-${$theme}.png`;
</script>

<footer class="footer">
  <div class="footer-content">
    <div class="footer-column">
      <div class="logo-container">
        <Logo size={'small'}></Logo>
        <div class="logo">WikiBonsai</div>
      </div>
      <div class="connect-container">
        <div class="social-links">
          <a href="https://github.com/wikibonsai" class="social-link" aria-label="GitHub">
            <img src={logoGitHub} alt="GitHub" style="height:20px;width:20px;">
          </a>
          <a href="https://x.com/wibomd" class="social-link" aria-label="Twitter">
            <img src={logoX} alt="X" style="height:20px;width:20px;">
          </a>
        </div>
      </div>
    </div>
    <div class="footer-column links">
      <!-- <div class="footer-column">
        <span class="footer-title">Projects</span>
        <a href="https://github.com/wikibonsai/wikibonsai/">WikiBonsai</a>
        <a href="https://github.com/wikibonsai/vscode-wikibonsai/">vscode-wikibonsai</a>
        <a href="https://github.com/wikibonsai/tendr-cli/">tendr-cli</a>
        <a href="https://github.com/wikibonsai/astro-wikibonsai/">astro-wikibonsai</a>
        <a href="https://github.com/wikibonsai/eleventy-wikibonsai/">eleventy-wikibonsai</a>
        <a href="https://github.com/wikibonsai/jekyll-wikibonsai/">jekyll-wikibonsai</a>
      </div> -->
      <div class="footer-column">
        <span class="footer-title">How To</span>
        <a href="https://github.com/wikibonsai/wikibonsai/tree/main/docs/USE.md">
          Getting Started
        </a>
      </div>
      <div class="footer-column">
        <span class="footer-title">About</span>
        <a href="https://github.com/wikibonsai/wikibonsai/tree/main/docs/PHILOSOPHY.md">
          Philosophy
        </a>
        <a href="https://github.com/wikibonsai/wikibonsai/tree/main/docs/DESIGN.md">
          Design
        </a>
        <a href="https://github.com/wikibonsai/wikibonsai/tree/main/docs/CITE.md">
          Influences
        </a>
      </div>
    </div>
  </div>
  <div class="copyright">
    © 2024 WikiBonsai
  </div>
</footer>

<style>
  .connect-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
  }

  .copyright {
    color: var(--accent-text-color);
    width: 100%;
    font-size: 0.75rem;
    /* small */
    text-align: center;
  }

  .footer {
    background-color: var(--accent-color-light);
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .footer-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
    padding: 1rem 1.5rem;
  }

  .footer-column a {
    text-decoration: none;
    color: var(--text-color);
    margin-bottom: 0;
    padding: 0.25rem 0;
  }

  .footer-column a:hover {
    color: var(--hover-color);
  }

  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    /* small */
    flex-direction: column-reverse; /* stack logo at the bottom on small screens */
  }

  .footer-title {
    color: var(--accent-text-color);
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .logo {
    font-size: 1.5rem;
  }

  .logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;
  }

  .social-link {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.5rem 0;
  }

  .social-link img {
    height: 20px;
    width: 20px;
  }

  .social-links {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  @media (min-width: 768px) {
    .copyright {
      justify-content: start;
      text-align: left;
      padding: 0 4rem;
    }

    .footer {
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: 2rem 0;
    }

    .footer-column {
      align-items: flex-start;
      margin-bottom: 0;
    }

    .footer-content {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      padding: 0 2rem;
    }

    .links {
      flex-direction: row;
      justify-content: flex-end;
      width: 50%;
    }

    .social-links {
      flex-direction: row;
    }
  }
</style>