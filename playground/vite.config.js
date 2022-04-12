const path = require('path');

export default {
  resolve: {
    alias: {
      'cable-streams': path.resolve(__dirname, '../dist/index.js')
    }
  }
}
