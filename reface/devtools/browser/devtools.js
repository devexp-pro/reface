import { ElementTypes } from "./types.js";

function createFiberNode(template, parent) {
  const isComponent = template.isComponent;
  const elementType = isComponent
    ? template.componentName || "Anonymous"
    : template.tag;

  return {
    tag: isComponent
      ? ElementTypes.FunctionComponent
      : ElementTypes.HostComponent,
    type: elementType,
    elementType,
    stateNode: null,
    return: parent || null,
    child: null,
    sibling: null,
    memoizedProps: {
      ...template.attributes,
      children: template.children,
      ...(template.originalProps || {}),
    },
    memoizedState: null,
    updateQueue: null,
    alternate: null,
    effectTag: 0,
    _debugSource: {
      fileName: "reface",
      lineNumber: 1,
    },
    _debugOwner: null,
    key: null,
    displayName: template.componentName,
  };
}

function createFiberTree(template, parent) {
  const fiber = createFiberNode(template, parent);

  if (template.children?.length) {
    let previousChild = null;

    template.children.forEach((child, index) => {
      if (typeof child === "object" && "isTemplate" in child) {
        const childFiber = createFiberTree(child, fiber);

        if (index === 0) {
          fiber.child = childFiber;
        } else if (previousChild) {
          previousChild.sibling = childFiber;
        }

        previousChild = childFiber;
      }
    });
  }

  return fiber;
}

function initDevTools(config) {
  const script = document.createElement("script");
  script.src = `http://localhost:${config.port}`;
  document.head.appendChild(script);

  return new Promise((resolve) => {
    const checkInterval = setInterval(() => {
      const hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (hook && !hook.rendererInterfaces.size) {
        clearInterval(checkInterval);

        // Регистрируем наш рендерер
        hook.rendererInterfaces.set("reface", {
          getCurrentFiber: () => null,
          getFiberRoots: () => new Set([]),
          getDisplayNameForFiber: (fiber) => {
            return (
              fiber.displayName ||
              (typeof fiber.type === "string" ? fiber.type : "Anonymous")
            );
          },
          getProps: (fiber) => fiber.memoizedProps,
          getOwnersList: (fiber) => {
            const owners = [];
            let current = fiber;
            while (current.return) {
              owners.push(current.return);
              current = current.return;
            }
            return owners;
          },
        });

        resolve(hook);
      }
    }, 200);
  });
}

window.__REFACE_DEVTOOLS__ = {
  initDevTools,
  createFiberTree,
  ElementTypes,
};
