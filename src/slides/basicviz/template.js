import chatImg from './avatar.png'
import style from './styles.css'

export default `
<section>
  <h2>Examples</h2>
  <div class="${style.container}">
    <div data-example="eq">
      <div class="${style.eqExample}"></div>
    </div>

    <div data-example="spec">
      <canvas class="${style.specExample}"></canvas>
    </div>

    <div data-example="chat">
      <img src="${chatImg}" class="${style.chatAvatar}" />
    </div>
  </div>
</section>
`
