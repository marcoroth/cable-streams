import { CableStreams } from "./cable_streams"
import { StreamActions } from "./stream_actions"
import { TurboStreamActions } from "./types"

declare global {
  interface Window {
    TurboStreamActions: TurboStreamActions
    CustomTurboStreamActions: TurboStreamActions
    CableStreams: CableStreams
  }
}

window.TurboStreamActions = StreamActions
window.CustomTurboStreamActions = {}

window.CableStreams = new CableStreams()
window.CableStreams.start()

// TODO: figure out if this should be enabled by default
window.CableStreams.registerCableReadyOperations()
