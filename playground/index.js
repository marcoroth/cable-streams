import * as Turbo from "@hotwired/turbo"
import CableReady from "cable_ready"
import CableStreams from "cable-streams"

CableStreams.customActions.append2 = function() {
  this.removeDuplicateTargetChildren()
  this.targetElements.forEach(e => e.append(this.templateContent))
}

CableStreams.customActions.myCustomAction = function() {
  console.log("Hello from my custom turbo stream action")
}
