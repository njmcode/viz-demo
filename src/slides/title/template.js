import style from './styles.css'

export default `
<section>
  <div class="${style.introOverlay}">
    <h1 class="${style.retroTitle}">Browser Audio Visualization</h1>
    <aside class="${style.introDetails}">
      <p>Neil McCallion</p>
      <p>BelfastJS December 2017</p>
      <p>
        <a href="https://github.com/njmcode/viz-demo" target="_blank">
          github.com/njmcode/viz-demo
        </a>
      </p>
    </aside>
  </div>
  <canvas class="${style.introCanvas}"></canvas>
</section>
`
