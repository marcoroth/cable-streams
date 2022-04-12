import { StreamElement } from "@hotwired/turbo/dist/types/elements/stream_element"
import { TurboStreamActions } from "./types"

// @ts-ignore
import CableReady from 'cable_ready'

export class CableStreams {
  get streamElement() {
    return window.customElements.get("turbo-stream")
  }

  get actions(): TurboStreamActions {
    return {
      ...window.TurboStreamActions,
      ...window.CustomTurboStreamActions
    }
  }

  get performActionFunction() {
    const _this = this

    return function performAction(this: StreamElement) {
      if (this.action) {
        const actionFunction = _this.actions[this.action]
        if (actionFunction) {
          return actionFunction
        }
        // @ts-ignore
        this.raise("unknown action")
      }
      // @ts-ignore
      this.raise("action attribute is missing")
    }
  }

  start() {
    delete this.streamElement.prototype.performAction

    Object.defineProperty(this.streamElement.prototype, 'performAction', { get: this.performActionFunction })
  }

  registerCableReadyOperations() {
    // @ts-ignore
    if (!window.CableReady) {
      console.error("[CableStreams] Make sure you have CableReady installed and imported in your application")

      return
    }

    Object.keys(CableReady.operations).forEach((name: any) => {

      // We don't need to override the action if it already exists
      if (!this.actions[name]) {
        window.CustomTurboStreamActions[name] = function() {
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
      }
    })
  }
}
