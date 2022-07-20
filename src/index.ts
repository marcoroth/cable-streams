import { CableStreams } from "./cable_streams"

declare global {
  interface Window {
    CableStreams: CableStreams
  }
}

const cableStreams = new CableStreams()
cableStreams.start()
cableStreams.registerCableReadyOperations() // TODO: figure out if this should be enabled by default

export default cableStreams
