class Blackboard {
  constructor (el) {
    this.el = el
    this.app = this.el.getContext('2d')
    this.width = this.el.width
    this.height = this.el.height
    this.btns = document.createElement('div')
    this.bgcolor = '#34D399'
    this.linecolor = '#fff'
    this.initCanvas()
    this.BindEvent()
  }
  BindEvent () {
    const callBack = this.drawLine.bind(this)
    this.el.addEventListener('touchstart', () => {
      this.app.beginPath()
      this.app.strokeStyle = this.linecolor
      this.el.addEventListener('touchmove', callBack)
    })
    document.addEventListener('touchmove', () => {
      this.el.removeEventListener('touchend', callBack)
    })
  }
  drawLine (e) {
    const event = e.touches[0]
    console.log(event)
    this.app.lineTo(
      e.touches[0].clientX - this.el.offsetLeft,
      e.touches[0].clientY - this.el.offsetTop
    )
    this.app.stroke()
  }
  initCanvas () {
    this.app.fillStyle = this.bgcolor
    this.app.fillRect(0, 0, this.width, this.height)
    this.el.insertAdjacentElement('afterend', this.btns)
  }
  clear () {
    let el = document.createElement('button')
    el.innerText = '重置'
    this.btns.insertAdjacentElement('afterbegin', el)
    el.addEventListener('click', () => {
      this.app.fillStyle = this.bgcolor
      this.app.fillRect(0, 0, this.width, this.height)
    })
    return this
  }
  setBgColor (color) {
    this.bgcolor = color
    this.app.fillStyle = color
    this.app.fillRect(0, 0, this.width, this.height)
  }
}
// const blackboard = new Blackboard()
// blackboard.clear().setBgColor('#34D399')
export default Blackboard
