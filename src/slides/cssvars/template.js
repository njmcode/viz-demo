import { synHi } from 'core/utils'
import cssText from './css.sample'
import jsText from './js.sample'

export default `
<section>
  <h2>Using CSS variables</h2>
  <div>
    <pre class="example-code language-css"><code>${synHi(cssText, 'css')}</code></pre>
    <pre class="example-code language-js"><code>${synHi(jsText)}</code></pre>
  </div>
</section>
`
