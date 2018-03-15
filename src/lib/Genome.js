import synaptic from 'synaptic'

export default class Genome {
  // Constructs a new genome
  constructor () {
    this.fitness = 0
    this.network = new synaptic.Architect.Perceptron(2, 2, 1)
  }

  // Mutates the genome with another genome
  cross (genome) {
    let netA, netB
    if (Math.random() > 0.5) {
      netA = this.network.toJSON()
      netB = genome.network.toJSON()
    } else {
      netA = genome.network.toJSON()
      netB = this.network.toJSON()
    }
    // console.log(netA.neurons.map((x) => { return x.bias }))
    // console.log(netB.neurons.map((x) => { return x.bias }))

    let cut = Math.round(netA.neurons.length * Math.random())
    // console.log(cut)
    for (let i = cut; i < netA.neurons.length; i++) {
      let tmp = netA.neurons[i]['bias']
      netA.neurons[i]['bias'] = netB.neurons[i]['bias']
      netB.neurons[i]['bias'] = tmp
    }

    // console.log(netA.neurons.map((x) => { return x.bias }))
    // console.log('END')
    this.network = synaptic.Network.fromJSON(netA)
  }

  mutate () {
    let net = this.network.toJSON()

    let mutationProb = 0.9
    // console.log(net.neurons.map((x) => { return x.bias }))
    // Mutate bias
    for (let i = 0; i < net.neurons.length; i++) {
      if (Math.random() < mutationProb) {
        continue
      }
      net.neurons[i]['bias'] += net.neurons[i]['bias'] * (Math.random() - 0.5) * 3 + (Math.random() - 0.5)
    }

    // Mutate weights
    for (let i = 0; i < net.connections.length; i++) {
      if (Math.random() < mutationProb) {
        continue
      }
      net.connections[i]['weight'] += net.connections[i]['weight'] * (Math.random() - 0.5) * 3 + (Math.random() - 0.5)
    }

    // console.log(net.neurons.map((x) => { return x.bias }))
    this.network = synaptic.Network.fromJSON(net)
  }

  activate (input) {
    return this.network.activate(input)
  }
}
