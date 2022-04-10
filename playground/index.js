import * as Turbo from "@hotwired/turbo"
import CableReady from "cable_ready"
import CableStreams from "cable-streams"

window.CustomTurboStreamActions.append2 = function() {
  this.removeDuplicateTargetChildren()
  this.targetElements.forEach(e => e.append(this.templateContent))
}

window.CustomTurboStreamActions.myCustomAction = function() {
  console.log("Hello from my custom turbo stream action")
}
