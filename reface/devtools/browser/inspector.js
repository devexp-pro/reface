class Inspector {
  constructor() {
    this.domToFiber = new WeakMap();
    this.overlay = null;
    this.isEnabled = false;
    this.createOverlay();
  }

  createOverlay() {
    this.overlay = document.createElement("div");
    Object.assign(this.overlay.style, {
      position: "fixed",
      pointerEvents: "none",
      zIndex: "10000",
      backgroundColor: "rgba(67, 133, 244, 0.2)",
      border: "2px solid rgb(67, 133, 244)",
      borderRadius: "2px",
      display: "none",
    });

    document.body.appendChild(this.overlay);
  }

  getElementBox(element) {
    const rect = element.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    };
  }

  highlightElement(element) {
    if (!this.overlay) return;

    const box = this.getElementBox(element);
    Object.assign(this.overlay.style, {
      display: "block",
      width: box.width + "px",
      height: box.height + "px",
      top: box.top + "px",
      left: box.left + "px",
    });
  }

  hideHighlight() {
    if (this.overlay) {
      this.overlay.style.display = "none";
    }
  }

  registerElement(element, fiber) {
    this.domToFiber.set(element, fiber);
  }

  enable() {
    if (this.isEnabled) return;
    this.isEnabled = true;
    document.addEventListener("mouseover", this.handleMouseOver);
    document.addEventListener("mouseout", this.handleMouseOut);
    document.addEventListener("click", this.handleClick, true);
  }

  disable() {
    if (!this.isEnabled) return;
    this.isEnabled = false;
    this.hideHighlight();
    document.removeEventListener("mouseover", this.handleMouseOver);
    document.removeEventListener("mouseout", this.handleMouseOut);
    document.removeEventListener("click", this.handleClick, true);
  }

  handleMouseOver = (event) => {
    const element = event.target;
    if (element && this.domToFiber.has(element)) {
      this.highlightElement(element);
    }
  };

  handleMouseOut = () => {
    this.hideHighlight();
  };

  handleClick = (event) => {
    const element = event.target;
    if (!element || !this.domToFiber.has(element)) return;

    event.preventDefault();
    event.stopPropagation();

    const fiber = this.domToFiber.get(element);
    if (fiber) {
      const devTools = window.__REFACE_DEVTOOLS__;
      const hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (hook && devTools) {
        const fiberTree = devTools.createFiberTree(fiber);
        hook.emit("selectFiber", fiberTree);
      }
    }
  };
}

window.__REFACE_INSPECTOR__ = new Inspector();
