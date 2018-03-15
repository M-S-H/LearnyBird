import Genome from './Genome.js'
import _ from 'lodash'
// import async from 'async'

export default class Generation {
  constructor (nGenomes) {
    this.genomes = []
    this.numGenomes = nGenomes

    for (let i = 0; i < nGenomes; i++) {
      this.genomes.push(new Genome())
    }
  }

  executeGeneration (data) {
    for (let i = 0; i < this.numGenomes; i++) {
      this.genomes[i].fitness = 0

      for (let j = 0; j < data.length; j++) {
        let sample = [data[j][0], data[j][1]]
        let output = this.genomes[i].activate(sample)[0]

        if ((output >= 0.5 && data[j][2] === 1) || (output < 0.5 && data[j][2] === -1)) {
          this.genomes[i].fitness += 1
        }
      }
    }
  }

  bestGenomes () {
    this.genomes.sort((a, b) => { return b.fitness - a.fitness })

    return [this.genomes[0], this.genomes[1]]
  }

  evolve () {
    // Keep best genomes
    this.genomes = this.bestGenomes()

    // Mutate
    for (let i = 0; i < 2; i++) {
      let newGen = _.cloneDeep(this.genomes[i])
      newGen.mutate()
      this.genomes.push(newGen)
    }

    // Cross over and mutate
    while (this.genomes.length < this.numGenomes) {
      let genA = _.cloneDeep(this.genomes[0])
      let genB = _.cloneDeep(this.genomes[1])

      genA.cross(genB)
      genA.mutate()
      this.genomes.push(genA)
    }
  }
}
