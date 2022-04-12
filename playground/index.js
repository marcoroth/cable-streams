import * as Turbo from "@hotwired/turbo"
import CableReady from "cable_ready"
import CableStreams from "cable-streams"

CableStreams.customActions.customAppend = function() {
  this.removeDuplicateTargetChildren()
  this.targetElements.forEach(e => e.append(this.templateContent))
}

CableStreams.customActions.myCustomAction = function() {
  console.log("Hello from my custom turbo stream action")
}

CableStreams.customActions.log = function() {
  console.log(this.getAttribute("message"))
}
