<template>
    <div>
        <b-row>
            <b-col><canvas id="signature" width="565" height="150" ></canvas></b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-button class="mr-5" @click="reset">Clear</b-button>
                <b-button @click="convertCanvasToImage">Done</b-button>
            </b-col>

        </b-row>

    </div>
</template>

<script>
export default {
  data () {
    return {
      x: null,
      y: null,
      init: false,
      vueCanvas: null,
      canvas: null,
      touchX: null,
      touchY: null
    }
  },
  methods: {
    line (x0, y0, x1, y1) {
      this.vueCanvas.beginPath()
      this.vueCanvas.strokeStyle = 'black'
      this.vueCanvas.lineWidth = 1
      this.vueCanvas.moveTo(x0, y0)
      this.vueCanvas.lineTo(x1, y1)
      this.vueCanvas.stroke()
      this.vueCanvas.closePath()
      this.vueCanvas.fill()
    },

    dot (x, y) {
      const r = 0; const g = 0; const b = 0; const a = 255

      // Select a fill style
      this.vueCanvas.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + (a / 255) + ')'

      // Draw a filled circle
      this.vueCanvas.beginPath()
      this.vueCanvas.arc(x, y, 12, 0, Math.PI * 2, true)
      this.vueCanvas.closePath()
      this.vueCanvas.fill()
    },

    // WEB
    webInit (evento) {
      this.x = evento.offsetX
      this.y = evento.offsetY
      this.init = true
    },

    draw (evento) {
      if (this.init) {
        const newX = evento.offsetX
        const newY = evento.offsetY
        this.liena(this.x, this.y, newX, newY)
        this.x = newX
        this.y = newY
      }
    },

    // Mobile
    touchInit (evento) {
      // if(!evento) e = event
      if (evento.touches) {
        if (evento.touches.length === 1) {
          const touch = evento.touches[0]
          const rect = this.canvas.getBoundingClientRect()
          this.touchX = touch.pageX - touch.target.offsetLeft
          this.touchY = touch.clientY - rect.top

          this.init = true
        }
      }
      event.preventDefault()
    },

    touchDraw (evento) {
      if (this.init) {
        const touch = evento.touches[0]
        const rect = this.canvas.getBoundingClientRect()
        const newX = touch.pageX - touch.target.offsetLeft
        const newY = touch.clientY - rect.top
        this.liena(this.touchX, this.touchY, newX, newY)
        this.touchX = newX
        this.touchY = newY
        event.preventDefault()
      }
    },

    finish (evento) { this.init = false },

    reset () {
      this.vueCanvas.clearRect(0, 0, 565, 150)
      this.$emit('autoriza', false)
    },

    convertCanvasToImage () {
      const image = new Image()
      image.src = this.canvas.toDataURL('image/png')
      this.$emit('autoriza', true)
      this.$emit('resultado', { image: image, dataURL: this.canvas.toDataURL('image/png') })
    }
  },
  mounted () {
    const signature = null
    this.canvas = document.getElementById('signature')
    this.vueCanvas = this.canvas.getContext('2d')
    signature.addEventListener('mousedown', this.webInit)
    signature.addEventListener('mousemove', this.draw)
    signature.addEventListener('mouseup', this.finish)

    signature.addEventListener('touchstart', this.touchInit, false)
    signature.addEventListener('touchmove', this.touchDraw, false)
    signature.addEventListener('touchend', this.finish, false)
  }

}
</script>

<style scope lang="scss">
    #signature{
        background: white;
    }
</style>
