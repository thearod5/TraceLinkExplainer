import { primaryColor, secondaryColor } from '../../../../styles/theme'

export default {
  edges: {
    color: primaryColor
  },
  nodes: {
    color: secondaryColor
  },
  width: '600px',
  height: '600px',
  layout: {
    randomSeed: 42,
    hierarchical: {
      enabled: true,
      levelSeparation: 200,
      nodeSpacing: 100,
      treeSpacing: 200, // distance between independant trees
      direction: 'LR', // UD, DU, LR, RL
      sortMethod: 'directed' // hubsize, directed
    }
  },
  interaction: {
    dragNodes: true
  }
}
