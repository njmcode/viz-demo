import { synHi } from 'core/utils'
import style from './styles.css'
import cssText from './css.example'

export default `
<section>
  <h2>Normalise & usage</h2>
  <div class="${style.cols}">
    <div>
      <pre data-raw class="${style.output}"></pre>
      <h3>x</h3>
    </div>
    <div class="${style.sep}">
      <span>--&gt;</span>
      <span>--&gt;</span>
      <span>--&gt;</span>
      <h3>&nbsp;</h3>
    </div>
    <div>
      <pre data-norm class="${style.output}"></pre>
      <h3>x / 255</h3>
    </div>
    <div class="${style.sep}">
      <span>--&gt;</span>
      <span>--&gt;</span>
      <span>--&gt;</span>
      <h3>&nbsp;</h3>
    </div>
    <div>
      <pre class="example-code language-css"><code>${synHi(cssText, 'css')}</code></pre>
      <h3>&nbsp;</h3>
    </div>
  </div>
</section>
`
