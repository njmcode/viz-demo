import Prism from 'prismjs'

export function dom (tplStr) {
  const wrap = document.createElement('template')
  wrap.innerHTML = tplStr
  return wrap.content.firstElementChild
}

export const lz = n => (n.toString().length < 2) ? '0' + n : n

export const getIdxFromHash = () => parseInt(window.location.hash.substr(1)) || 0

export const synHi = (src, lang = 'javascript') => Prism.highlight(src, Prism.languages[lang])
