import style from './styles.css'

export default `
<div class="${style.controls}">
  <button data-dir="prev">&lt;</button>
  <span data-slideno class="${style.slideCounter}"></span>
  <button data-dir="next">&gt;</button>

  <div data-timer class="${style.timer}">
    <span></span>
    <button data-start>Go</button>
    <button data-reset>Reset</button>
  </div>

  <div data-progress>
    <div>
      <div class="${style.slideProgress}"><span data-prog-slide></span></div>
      <div class="${style.timeProgress}"><span data-prog-time></span></div>
    </div>
  </div>

  <div>
    <i>&#127908;</i> <input type="radio" data-sel name="source" value="mic">
    <i>&#9835;</i> <input type="radio" data-sel name="source" value="music">
  </div>
</div>
`
