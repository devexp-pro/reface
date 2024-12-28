(function () {
  /**
   * @typedef {Object} RawTemplateAttributes
   * @property {string[]} [classes]
   * @property {Object<string, string>} [styles]
   * @property {*} [key]
   */

  /**
   * @typedef {Object} RawTemplate
   * @property {string} type
   * @property {string} [tag]
   * @property {boolean} [void]
   * @property {RawTemplateAttributes} attributes
   * @property {RawTemplate[]} children
   * @property {Object} payload
   */

  /**
   * @typedef {Object} DevToolsComponent
   * @property {string} uid
   * @property {string} id
   * @property {string} name
   * @property {{ name: string, devtools: Object }} type
   * @property {string} __VUE_DEVTOOLS_UID__
   * @property {string} __VUE_DEVTOOLS_NEXT_UID__
   * @property {Object} __VUE_DEVTOOLS_NEXT_APP_RECORD__
   * @property {{ app: Object }} appContext
   * @property {{ el: HTMLElement, component: null, children: Array<{ el: HTMLElement, component: DevToolsComponent }> }} subTree
   * @property {Object} props
   * @property {DevToolsComponent[]} [children]
   */

  let componentCounter = 0;

  /**
   * Преобразует RawTemplate в компонент для Vue DevTools
   * @param {RawTemplate} template - Исходный шаблон
   * @param {Object} appRecord - Запись приложения
   * @param {Object} app - Экземпляр приложения
   * @returns {DevToolsComponent}
   */
  function transformTemplate(template, appRecord, app) {
    const id = `comp${++componentCounter}`;

    const component = {
      uid: id,
      id,
      name: template.tag || template.type,
      type: {
        name: template.tag || template.type,
        devtools: {},
      },
      __VUE_DEVTOOLS_UID__: id,
      __VUE_DEVTOOLS_NEXT_UID__: id,
      __VUE_DEVTOOLS_NEXT_APP_RECORD__: appRecord,
      appContext: {
        app,
        mixins: [],
        provides: {},
        components: {},
        directives: {},
      },
      provides: {},
      subTree: {
        el: document.createElement(template.tag || "div"),
        component: null,
        children: [],
      },
      props: {},
      attrs: {
        ...template.attributes,
      },
      setupState: {},
      data: {},
      refs: {},
    };

    // Рекурсивно обрабатываем дочерние элементы
    if (template.children && template.children.length > 0) {
      component.children = template.children.map((child) =>
        transformTemplate(child, appRecord, app)
      );

      // Связываем subTree.children с дочерними компонентами
      component.subTree.children = component.children.map((child) => ({
        el: child.subTree.el,
        component: child,
      }));
    }

    return component;
  }

  /**
   * Инициализирует компоненты для Vue DevTools из данных в теге script
   * @returns {{ app: Object, appRecord: Object, components: DevToolsComponent[] }}
   */
  function initDevToolsComponents() {
    const dataScript = document.getElementById("__REFACE_DEVTOOLS_DATA__");
    if (!dataScript) {
      console.warn("No DevTools data found");
      return { app: null, appRecord: null, components: [] };
    }

    try {
      /** @type {RawTemplate[]} */
      const templates = JSON.parse(dataScript.textContent || "[]");

      const app = {
        id: ":root",
        uid: 0,
        _name: "Reface App",
        version: "1.0.0",
        config: {
          devtools: true,
          globalProperties: {},
        },
        instanceMap: new Map(),
        _instance: {
          type: {
            devtools: {},
          },
          appContext: {
            app: null,
            mixins: [],
            provides: {},
            components: {},
            directives: {},
          },
          provides: {},
          attrs: {},
          setupState: {},
          data: {},
          refs: {},
          __VUE_DEVTOOLS_NEXT_APP_RECORD__: null,
          subTree: {
            el: document.documentElement,
            component: null,
            children: [],
          },
        },
      };

      const appRecord = {
        id: ":root",
        app,
        version: "3.2.0",
        instanceMap: app.instanceMap,
        rootInstance: app._instance,
      };

      // Устанавливаем циклические ссылки
      app._instance.appContext.app = app;
      app._instance.__VUE_DEVTOOLS_NEXT_APP_RECORD__ = appRecord;
      app.__VUE_DEVTOOLS_NEXT_APP_RECORD__ = appRecord;

      // Преобразуем шаблоны в компоненты
      const components = templates.map((template) =>
        transformTemplate(template, appRecord, app)
      );

      // Связываем subTree.children с компонентами
      app._instance.subTree.children = components.map((component) => ({
        el: component.subTree.el,
        component,
      }));

      // Добавляем компоненты в instanceMap
      components.forEach((component) => {
        app.instanceMap.set(component.id, component);
        if (component.children) {
          component.children.forEach((child) => {
            app.instanceMap.set(child.id, child);
          });
        }
      });

      return { app, appRecord, components };
    } catch (e) {
      console.error("Failed to parse DevTools data:", e);
      return { app: null, appRecord: null, components: [] };
    }
  }

  // Эмулируем Vue.js для DevTools
  window.__VUE__ = {
    version: "3.2.0",
    config: {
      devtools: true,
      productionTip: false,
    },
  };

  const { app, appRecord, components } = initDevToolsComponents();
  if (!app || !components.length) return;

  // Инициализируем хук DevTools
  if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
    const hook = window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

    hook.Vue = window.__VUE__;
    hook.enabled = true;

    window.postMessage(
      {
        source: "vue-devtools-backend",
        payload: {
          type: "init",
          vue: window.__VUE__,
          timestamp: Date.now(),
        },
      },
      "*"
    );

    hook.apps = [app];
    hook.app = app;

    hook.emit("app:init", app);

    // Добавляем обработчик для инспектора состояния
    hook.on("inspectComponent", ({ instanceData, id }) => {
      const component = app.instanceMap.get(id);
      if (component) {
        instanceData.state = [
          {
            type: "props",
            key: "props",
            value: component.props,
            editable: false,
          },
        ];
      }
    });

    components.forEach((component) => {
      hook.emit("component:new", {
        app,
        uid: component.uid,
        id: component.id,
        instance: component,
        name: component.name,
        props: component.props || {},
        children: component.children || [],
      });

      if (component.children) {
        component.children.forEach((child) => {
          hook.emit("component:new", {
            app,
            uid: child.uid,
            id: child.id,
            instance: child,
            name: child.name,
            props: child.props || {},
            children: [],
          });
        });
      }
    });
  }
})();
