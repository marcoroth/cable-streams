import { CableStreams } from "./cable_streams"
import { TurboStreamActions } from "./types"

declare global {
  interface Window {
    TurboStreamActions: TurboStreamActions
    CustomTurboStreamActions: TurboStreamActions
    CableStreams: CableStreams
  }
}

const cableStreams = new CableStreams()
cableStreams.start()
cableStreams.registerCableReadyOperations() // TODO: figure out if this should be enabled by default

export {
  cableStreams as CableStreams
}
