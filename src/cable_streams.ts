import { StreamActions } from "@hotwired/turbo"
import { TurboStreamActions } from "./types"

// @ts-ignore
import CableReady from 'cable_ready'

export class CableStreams {
  get streamElement() {
    return window.customElements.get("turbo-stream")
  }

  get actions(): TurboStreamActions {
    return {
      ...this.defaultActions,
      ...this.customActions
    }
  }

  get defaultActions(): TurboStreamActions {
    return StreamActions
  }

  get customActions(): TurboStreamActions {
    return StreamActions
  }

  start() {
    window.CableStreams = this
  }

  registerCableReadyOperations() {
    // @ts-ignore
    if (!window.CableReady) {
      console.error("[CableStreams] Make sure you have CableReady installed and imported in your application")

      return
    }

    Object.keys(CableReady.operations).forEach((name: any) => {
      // We don't need to override the action if it already exists
      if (!StreamActions[name]) {
        StreamActions[name] = function() {
          let operations = JSON.parse(this?.templateContent?.textContent || "")

          if (!Array.isArray(operations)) {
            operations = [operations]
          }

          operations = operations.map((operation: any) => {
            if (!operation.operation) {
              operation.operation = name
            }

            return operation
          })

          CableReady.perform(operations)
        }
      } else {
        console.log(`[CableStreams] didn't register "${name}" since the action already exists`)
      }
    })
  }
}
