import * as Turbo from "@hotwired/turbo"
import CableReady from "cable_ready"
import CableStreams from "cable-streams"

CableStreams.customActions.customAppend = function() {
  this.removeDuplicateTargetChildren()
  this.targetElements.forEach(e => e.append(this.templateContent))
}

Turbo.StreamActions.myCustomAction = function() {
  console.log("Hello from my custom turbo stream action")
}

Turbo.StreamActions.log = function() {
  console.log(this.getAttribute("message"))
}
