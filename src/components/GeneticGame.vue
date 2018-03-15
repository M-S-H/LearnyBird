<template>
  <div class="neurogame">
    <div class="game-info">
      <span class="generation">Gen: {{generation}}</span>
      <span class="current-scroe">Score: {{currentScore}}</span>
      <span class="max-score">Max: {{maxScore}}</span>
    </div>
    <canvas id="game" height="512px" @click="jump"></canvas>
  </div>
</template>

<script>
  import Pipe from '../lib/Pipe'
  import Bird from '../lib/Bird'
  import Generation from '../lib/Generation'

  export default {
    name: 'Game',
    data() {
      return {
        canvas: null,
        context: null,
        fps: 120,
        assets: {},
        loaded: false,
        paused: false,
        pausedTimer: null,
        gameParams: {
          backgroundSpeed: 0.5,
          backgroundPos: 0,
          pipeInterval: 90,
          interval: 0
        },
        pipes: [],
        birds: [],
        aliveBirds: 0,
        generation: 0,
        currentScore: 0,
        maxScore: 0,
        neuro: new Generation(10)
      }
    },

    mounted() {
      this.start()
    },

    methods: {
      start() {
        // Setup Canvas
        this.canvas = document.querySelector('#game')
        this.context = this.canvas.getContext('2d')

        // Load Image Assets
        this.loadAssets()

        this.reset();
      },

      reset() {
        // Birds
        this.birds = []
        for (let i = 0; i < this.neuro.numGenomes; i++) {
          let b = new Bird()
          this.birds.push(b)
        }

        this.gameParams.interval = 0;
        this.pipes = []

        this.currentScore = 0;
        this.generation++;

        // Dev
        this.update()

        window.addEventListener('resize', () => {
          this.paused = true

          clearTimeout(this.pausedTimer)
          this.pausedTimer = setTimeout(() => {
            this.paused = false
            
          }, 250);
        })
      },

      // Load the images
      loadAssets() {
        let numLoaded = 0
        for (let img of ['bird', 'background', 'pipetop', 'pipebottom']) {
          this.assets[img] = new Image()
          this.assets[img].src = "static/neuro/" + img + ".png"
          this.assets[img].onload = () => {
            numLoaded++ 
            if (numLoaded == 4) {
              this.loaded = true
              this.render()
            }
          }
        }
      },

      jump() {
        this.birds[0].fly()
      },

      update() {
        // Scale
        let scale = 512 / window.innerHeight

        // Move Background
        this.gameParams.backgroundPos += this.gameParams.backgroundSpeed

        // Birds     
        let nextHoll = 0
        if (this.birds.length > 0) {
          for (let i = 0; i < this.pipes.length; i += 2) {
            if (this.pipes[i].x + this.pipes[i].width > this.birds[0].x) {
              nextHoll = this.pipes[i].height / window.innerHeight
              break
            }
          }
        }
          
        for (let i in this.birds) {
          if (this.birds[i].alive) {
            let inputs = [
              this.birds[i].y / window.innerHeight,
              nextHoll
            ]

            let out = this.neuro.genomes[i].activate(inputs)[0]
            // console.log(out)
            if (out > 0.5) {
              
              this.birds[i].fly()
            }
            
            this.birds[i].update()
            if (this.birds[i].isDead(window.innerHeight, this.pipes)) {
              this.birds[i].alive = false
              this.neuro.genomes[i].fitness = this.currentScore
            }
          }
        }

        // Pipes
        if (this.gameParams.interval === 0) {
          let deltaBoard = 50
          let pipeHole = 120
          let holePosition = Math.round(Math.random() * (512 - deltaBoard * 2 - pipeHole)) + deltaBoard

          this.pipes.push(new Pipe(window.outerWidth * scale, 0, holePosition))
          this.pipes.push(new Pipe(window.outerWidth * scale, holePosition+pipeHole, window.outerHeight))
        }

        // Update Pipe position
        for (let i = 0; i < this.pipes.length; i++) {
          this.pipes[i].update()
        }

        this.gameParams.interval = (window.outerWidth * scale) - this.pipes[this.pipes.length-1].x
        if (this.gameParams.interval > 270) {
          this.gameParams.interval = 0
        }

        if (this.isOver()) {
          this.neuro.evolve()
          this.reset()
        } else {
          this.currentScore++
          if (this.currentScore > this.maxScore) {
            this.maxScore = this.currentScore
          }
          this.canUpdate()
        }
      },

      canUpdate() {
        if (this.paused) {
          setTimeout(() => {
            this.canUpdate()
          }, 250);
        } else {
          setTimeout(() => {
            this.update()
          }, 1000 / this.fps)
        }
      },

      render() {
        // Clear context
        this.context.clearRect(0, 0, this.width, this.height)

        // Size Canvas
        this.canvas.style.height = '100%'
        this.canvas.width = Math.ceil(window.outerWidth * (512 / window.innerHeight))

        let scale = window.innerHeight / 512


        // Draw background
        let backgroundWidth = this.assets.background.width
        let canvasWidth = window.outerWidth
        for (let i = 0; i < Math.ceil(canvasWidth / (backgroundWidth * scale)) + 1; i++) {
          this.context.drawImage(this.assets.background, i * backgroundWidth - Math.floor(this.gameParams.backgroundPos % this.assets.background.width), 0)
        }

        // Draw Birds
        for (let i in this.birds) {
          if (this.birds[i].alive) {
            this.context.save()
            this.context.translate(this.birds[i].x + this.birds[i].width/2, this.birds[i].y + this.birds[i].height/2)
            this.context.rotate(Math.PI/2 * this.birds[i].gravity/20)
            this.context.drawImage(this.assets.bird, -this.birds[i].width/2, -this.birds[i].height/2, this.birds[i].width, this.birds[i].height)
            this.context.restore()
          }
        }

        // Draw pipes
        for (let i in this.pipes) {
          if (i % 2 === 0) {
            this.context.drawImage(this.assets.pipetop, this.pipes[i].x, this.pipes[i].y + this.pipes[i].height - this.assets.pipetop.height, this.pipes[i].width, this.assets.pipetop.height)
          } else {
            this.context.drawImage(this.assets.pipebottom, this.pipes[i].x, this.pipes[i].y, this.pipes[i].width, this.assets.pipebottom.height)
          }
        }

        // Perform next render
        let self = this
        requestAnimationFrame(() => {self.render()})
      },

      isOver() {
        for (let i in this.birds) {
          if (this.birds[i].alive) {
            return false
          }
        }
        return true
      }
    }
  }
</script>


<style>
  .neurogame {
    width: 100vw;
    height: 100vh;
  }

  .game-info {
    display: flex;
    height: 40px;
    background: #444;
  }

  .game-info span {
    flex-grow: 1;
    text-align: center;
    line-height: 40px;
    font-family: sans-serif;
    font-size: 12px;
    color: white;
    font-weight: bold;
  }
</style>