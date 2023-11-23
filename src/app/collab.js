"use client"
/**
 * @typedef {import("@excalidraw/excalidraw/types/element/types").ExcalidrawElement} ExcalidrawElement
 */

import { getSceneVersion } from "@excalidraw/excalidraw";

/**
 * Maintains the state of broadcasted elements, to avoid broadcasting
 * too many DRAWING events.
 * @public
 * @constructor
 */
export class SyncState {
  /**
   *
   * @param {import("react-use-websocket/src/lib/types").SendJsonMessage} sendWsJson
   */
  constructor(sendWsJson) {
    /**
     * Map of element id (string) to last broadcasted element version (int)
     * @type {Map<string, number}}
     */
    this.broadcastedElementVersions = new Map();
    /**
     * The last broadcasted scene's version
     */
    this.lastBroadcastedSceneVersion = 0;
    this.sendWsJson = sendWsJson;
    /**
     * Tracks the latest versions of all elements to be displayed
     * by VIEWERS canvases.
     * @type {Map<string, ExcalidrawElement>}
     */
    this.displayElements = new Map();

    this.send = this.send.bind(this);
    this.shouldUpdate = this.shouldUpdate.bind(this);
    this.elementShouldBeSent = this.elementShouldBeSent.bind(this);
    this.updateViewerState = this.updateViewerState.bind(this);
    this.getViewerBoardElements = this.getViewerBoardElements.bind(this);
  }

  /**
   *
   * @param {Array<ExcalidrawElement>} elements
   * @returns {boolean}
   */
  shouldUpdate(elements) {
    return getSceneVersion(elements) > this.lastBroadcastedSceneVersion;
  }

  /**
   * Check if the given element must be broadcasted.
   * @param {ExcalidrawElement} element
   * @returns {boolean}
   */
  elementShouldBeSent(element) {
    // If the same version of this element has been broadcasted before, it should not be sent again
    return !(
      this.broadcastedElementVersions.has(element.id) &&
      this.broadcastedElementVersions.get(element.id) === element.version
    );
  }

  // method for broadcasters
  /**
   *
   * @param {Array<ExcalidrawElement>} elements
   */
  send(elements) {
    // Send only the elements that changed since last broadcast
    // TODO: occasionally send the entire frame across (possibly as a different event)
    // to keep all clients in sync with the entire picture, in case some messages
    // are dropped due to any reason
    if (this.shouldUpdate(elements)) {
      let changedElements = elements.filter(this.elementShouldBeSent);
      if (changedElements.length > 0) {
        this.sendWsJson({
          event_type: "drawing",
          data: {
            elements: changedElements
          }
        });
        changedElements.forEach((element) => {
          this.broadcastedElementVersions.set(element.id, element.version);
        });
        console.log(`Sent ${changedElements.length} elements`);
      }
    }
  }

  // methods for VIEWERS
  /**
   * Called by users in VIEWER mode to track the 
   * latest state of the elements that was broadcasted
   * by the user currently drawing.
   * @param {ExcalidrawElement[]} elements 
   */
  updateViewerState(elements) {
    elements.forEach((element) => {
      if (!element.isDeleted) {
        this.displayElements.set(element.id, element);
      } else {
        this.displayElements.delete(element.id);
      }
    })
  }

  /**
   * @returns {ExcalidrawElement[]}
   */
  getViewerBoardElements() {
    return Array.from(this.displayElements.values())
  }
}
