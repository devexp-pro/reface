import type { Template } from "@reface/html";
import { createLogger } from "@reface/core";
import { inspector } from "./inspector.ts";

const logger = createLogger("DevTools");

// Расширяем интерфейс Template для компонентов
interface ComponentTemplate extends Template<HTMLAttributes> {
  componentName?: string;
  originalProps?: Record<string, unknown>;
  isComponent?: boolean;
}

// Добавляем типы для React DevTools
interface FiberNode {
  tag: number;
  type: string | Function;
  stateNode: null;
  return: FiberNode | null;
  child: FiberNode | null;
  sibling: FiberNode | null;
  memoizedProps: Record<string, unknown>;
  memoizedState: null;
  updateQueue: null;
  alternate: null;
  effectTag: number;
  _debugSource: {
    fileName: string;
    lineNumber: number;
  };
  _debugOwner: null;
  elementType?: string | Function;
  key: null | string;
  displayName?: string;
}

// Константы для типов элементов
const ElementTypes = {
  HostComponent: 5, // HTML элементы
  FunctionComponent: 0, // Функциональные компоненты
};

interface DevToolsConfig {
  enabled: boolean;
  port?: number;
}

interface DevToolsHook {
  init: (fiber: unknown) => void;
  rendererInterfaces: Map<any, any>;
  supportsFiber: boolean;
  // ... другие методы React DevTools
}

declare global {
  interface Window {
    __REACT_DEVTOOLS_GLOBAL_HOOK__?: DevToolsHook;
    __REFACE_DEVTOOLS__?: {
      initDevTools(config: DevToolsConfig): Promise<DevToolsHook>;
    };
  }
}

const defaultConfig: DevToolsConfig = {
  enabled: true,
  port: 8097,
};

/**
 * Преобразует Reface шаблон в структуру Fiber
 */
function createFiberNode(
  template: ComponentTemplate,
  parent?: FiberNode,
): FiberNode {
  logger.debug("Creating fiber node", {
    tag: template.tag,
    isComponent: template.isComponent,
    componentName: template.componentName,
  });

  const isComponent = template.isComponent;
  const elementType = isComponent
    ? template.componentName || "Anonymous"
    : template.tag;

  const fiber: FiberNode = {
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

  if (isComponent) {
    logger.debug("Component props", {
      name: template.componentName,
      props: fiber.memoizedProps,
    });
  }

  // Добавляем DOM элемент после рендеринга
  if (!isComponent) {
    queueMicrotask(() => {
      const element = document.querySelector(`[data-reface-id="${fiber.key}"]`);
      if (element) {
        inspector.registerElement(element, fiber);
      }
    });
  }

  return fiber;
}

/**
 * Создает дерево Fiber из шаблона
 */
function createFiberTree(
  template: ComponentTemplate,
  parent?: FiberNode,
): FiberNode {
  logger.debug("Creating fiber tree", {
    template,
    parentType: parent?.type,
  });

  const fiber = createFiberNode(template, parent);

  if (template.children?.length) {
    let previousChild: FiberNode | null = null;

    template.children.forEach((child, index) => {
      if (typeof child === "object" && "isTemplate" in child) {
        const childTemplate = child as ComponentTemplate;
        const childFiber = createFiberTree(childTemplate, fiber);

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

/**
 * Инициализирует интеграцию с React DevTools
 */
export async function initDevTools(config: Partial<DevToolsConfig> = {}) {
  const finalConfig = { ...defaultConfig, ...config };

  if (!finalConfig.enabled) {
    logger.info("DevTools disabled");
    return;
  }

  logger.info("Initializing DevTools", { config: finalConfig });

  if (typeof window === "undefined") {
    logger.warn("DevTools can only be initialized in browser environment");
    return;
  }

  try {
    const hook = await window.__REFACE_DEVTOOLS__?.initDevTools(finalConfig);
    if (hook) {
      // ... остальной код инициализации ...
    }
  } catch (error) {
    // ... обработка ошибок ...
  }
}

/**
 * Обновляет состояние в DevTools
 */
export function updateDevTools(template: ComponentTemplate) {
  logger.debug("Updating DevTools", {
    template,
    isComponent: template.isComponent,
    componentName: template.componentName,
  });

  const hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!hook) {
    logger.warn("DevTools hook not found");
    return;
  }

  try {
    const fiber = createFiberTree(template);
    hook.init(fiber);

    // Обновляем интерфейс рендерера
    hook.rendererInterfaces.set("reface", {
      getCurrentFiber: () => fiber,
      getFiberRoots: () => new Set([fiber]),
      getDisplayNameForFiber: (fiber: FiberNode) => {
        return (
          fiber.displayName ||
          (typeof fiber.type === "string" ? fiber.type : "Anonymous")
        );
      },
      getProps: (fiber: FiberNode) => fiber.memoizedProps,
      getOwnersList: (fiber: FiberNode) => {
        const owners = [];
        let current = fiber;
        while (current.return) {
          owners.push(current.return);
          current = current.return;
        }
        return owners;
      },
      // Добавляем методы для инспектора
      startInspecting: () => {
        logger.info("Starting element inspection");
        inspector.enable();
      },
      stopInspecting: () => {
        logger.info("Stopping element inspection");
        inspector.disable();
      },
      highlightElement: (fiber: FiberNode) => {
        // Подсветка через DOM
        const element = document.querySelector(
          `[data-reface-id="${fiber.key}"]`,
        );
        if (element) {
          inspector.highlightElement(element);
        }
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error("Failed to update DevTools", error);
    } else {
      logger.error("Unknown error updating DevTools", new Error(String(error)));
    }
  }
}
