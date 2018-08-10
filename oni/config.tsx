import * as React from "react"
import * as Oni from "oni-api"

const clockStatusBar = (oni: Oni.Plugin.Api) => {
  // Create a status bar item on the right side
  const clockStatusBarItem = oni.statusBar.createItem(1, 1)
  // Make it visible
  clockStatusBarItem.show()
  // Create a function to get the current time
  const updateClock = () => {
    const currentDate = new Date()
    const time = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`
    clockStatusBarItem.setContents(<div>{time}</div>)
  }
  // Run it on initial load
  updateClock()
  // And again every second.
  // NOTE - This isn't a robust solution and WILL impact performance...
  // Not recommended to leave this in your config!
  window.setInterval(updateClock, 1000 /* Every second */)
}

const faceStatusBar = (oni: Oni.Plugin.Api) => {
  const faceStatusBarItem = oni.statusBar.createItem(1, 2, "face")
  faceStatusBarItem.show()
  oni.configuration.setValues({ counter: 0 })
  const faces = [
    "(´･_･`)",
    "( ´･_･)",
    "(  ´･_)",
    "(   ´･)",
    "(    ´)",
    "(     )",
    "(     )",
    "(`    )",
    "(･`   )",
    "(_･`  )",
    "(･_･` )",
  ]
  const updateFace = () => {
    let counter = Number(oni.configuration.getValue("counter"))
    const face = faces[(counter + 1) % faces.length]
    faceStatusBarItem.setContents(
      <div>
        <pre>{face}</pre>
      </div>
    )
    oni.configuration.setValues({ counter: counter + 1 })
  }

  updateFace()
  window.addEventListener("keypress", updateFace)
}

export const activate = (oni: Oni.Plugin.Api) => {
  // access the Oni plugin API here
  // or bind a new action:
  oni.input.bind("<c-enter>", () => alert("Hello world"))
  clockStatusBar(oni)
  //faceStatusBar(oni)
}

export const configuration = {
  activate,
  // change configuration values here:
  "oni.useDefaultConfig": true,
  "oni.loadInitVim": true,
  "editor.fontSize": "13px",
  "editor.fontFamily": "Monaco",
  "editor.completions.enabled": true,
}
