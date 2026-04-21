const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      'assets/UserGreeting-BZQlOYXK.js',
      'assets/jsx-runtime-B1AmfilC.js',
      'assets/index-DJeO_T7s.js',
      'assets/preload-helper-t9NyTnoX.js',
      'assets/Combination-BnTJ1bTD.js',
      'assets/dist-DaqhQ5tz.js',
      'assets/dist-DRTUdseI.js',
      'assets/react-dom-BFAuQCE8.js',
      'assets/dist-CEUYTUCg.js',
      'assets/dist-DA2cmvll.js',
      'assets/dist-D9gX6dj1.js',
      'assets/dist-DL3UdAjJ.js',
      'assets/dist-C5G2WjXf.js',
      'assets/dist-DkU8s8Z2.js',
      'assets/utils-BmdpXeKV.js',
      'assets/createLucideIcon-vP0w25-2.js',
      'assets/x-w9RB1G5J.js',
      'assets/client-Di-ki1zB.js',
      'assets/use-auth-Cx9SfgZR.js',
      'assets/index-DShS-6on.css',
      'assets/skeleton-D0bIxZts.js',
      'assets/use-current-user-qqgDB7BD.js',
      'assets/AlertsBlock-xrd64jLe.js',
      'assets/addDays-Cw3TpjRo.js',
      'assets/differenceInDays-Cn3zDID-.js',
      'assets/circle-alert-B73sMfUY.js',
      'assets/clock-0KDasUZi.js',
      'assets/WorkloadCards-C8IzVDuN.js',
      'assets/PerformanceSection-Bqy2_-Cl.js',
      'assets/endOfMonth-DqLHiudX.js',
      'assets/isBefore-BmH5Ts9X.js',
      'assets/startOfMonth-CmvDAXeC.js',
      'assets/subDays-DP5MkAhw.js',
      'assets/circle-check-CSFqsJLD.js',
      'assets/trending-up-Hil7mR3N.js',
      'assets/InteractiveCalendar-DbvTwTq5.js',
      'assets/calendar-DuV7KqlJ.js',
      'assets/addMonths-DJku4PmL.js',
      'assets/differenceInCalendarMonths-DZtpmsMd.js',
      'assets/chevron-down-DJkEZnnX.js',
      'assets/chevron-left-Kca3qTeG.js',
      'assets/NotificationsPanel-_IWPHqBw.js',
      'assets/formatDistanceToNow-_HC39_M7.js',
      'assets/getRoundingMethod-WgSNsbOx.js',
      'assets/circle-check-big-DS1KsFTY.js',
      'assets/info-DDwbsJOu.js',
      'assets/mail-BbUyqolF.js',
      'assets/message-circle-B-rYwytx.js',
      'assets/refresh-cw-BcVjCybd.js',
      'assets/triangle-alert-DM5rzb4b.js',
    ]),
) => i.map((i) => d[i])
import {
  a as __toESM,
  n as require_react,
  t as require_jsx_runtime,
} from './jsx-runtime-B1AmfilC.js'
import './react-dom-BFAuQCE8.js'
import { t as __vitePreload } from './preload-helper-t9NyTnoX.js'
import { t as CircleAlert } from './circle-alert-B73sMfUY.js'
import { M as Button, d as toast } from './index-DJeO_T7s.js'
import { t as Skeleton } from './skeleton-D0bIxZts.js'
//#region src/components/hub/ZoneErrorBoundary.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1)
var import_jsx_runtime = require_jsx_runtime()
var ZoneErrorBoundary = class extends import_react.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    }
  }
  componentDidCatch(error) {
    toast.error(`Erro ao carregar zona: ${this.props.zoneName}`)
    console.error(`ErrorBoundary caught error in ${this.props.zoneName}:`, error)
  }
  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
    })
  }
  render() {
    if (this.state.hasError)
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        'data-uid': 'src/components/hub/ZoneErrorBoundary.tsx:38:9',
        'data-prohibitions': '[editContent]',
        className:
          'p-6 border border-destructive/20 bg-destructive/5 rounded-lg flex flex-col items-center justify-center text-center space-y-4 shadow-sm w-full h-full min-h-[200px]',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
            'data-uid': 'src/components/hub/ZoneErrorBoundary.tsx:39:11',
            'data-prohibitions': '[editContent]',
            className: 'w-8 h-8 text-destructive',
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            'data-uid': 'src/components/hub/ZoneErrorBoundary.tsx:40:11',
            'data-prohibitions': '[editContent]',
            className: 'space-y-1',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('p', {
                'data-uid': 'src/components/hub/ZoneErrorBoundary.tsx:41:13',
                'data-prohibitions': '[editContent]',
                className: 'text-sm font-semibold text-destructive',
                children: ['Falha ao carregar ', this.props.zoneName],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('p', {
                'data-uid': 'src/components/hub/ZoneErrorBoundary.tsx:44:13',
                'data-prohibitions': '[editContent]',
                className: 'text-xs text-destructive/80 max-w-[250px] truncate mx-auto',
                children: this.state.error?.message || 'Ocorreu um erro inesperado.',
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
            'data-uid': 'src/components/hub/ZoneErrorBoundary.tsx:48:11',
            'data-prohibitions': '[]',
            variant: 'outline',
            size: 'sm',
            onClick: this.handleRetry,
            className:
              'border-destructive/30 hover:bg-destructive/10 text-destructive hover:text-destructive',
            children: 'Tentar novamente',
          }),
        ],
      })
    return this.props.children
  }
}
//#endregion
//#region src/pages/HubPage.tsx
var UserGreeting = (0, import_react.lazy)(() =>
  __vitePreload(
    () => import('./UserGreeting-BZQlOYXK.js').then((m) => ({ default: m.UserGreeting })),
    __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]),
  ),
)
var AlertsBlock = (0, import_react.lazy)(() =>
  __vitePreload(
    () => import('./AlertsBlock-xrd64jLe.js').then((m) => ({ default: m.AlertsBlock })),
    __vite__mapDeps([
      22, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 23, 24, 25, 26, 20,
    ]),
  ),
)
var WorkloadCards = (0, import_react.lazy)(() =>
  __vitePreload(
    () => import('./WorkloadCards-C8IzVDuN.js').then((m) => ({ default: m.WorkloadCards })),
    __vite__mapDeps([
      27, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    ]),
  ),
)
var PerformanceSection = (0, import_react.lazy)(() =>
  __vitePreload(
    () =>
      import('./PerformanceSection-Bqy2_-Cl.js').then((m) => ({ default: m.PerformanceSection })),
    __vite__mapDeps([
      28, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 24, 29, 30, 31, 32, 23,
      25, 33, 26, 34, 20, 21,
    ]),
  ),
)
var InteractiveCalendar = (0, import_react.lazy)(() =>
  __vitePreload(
    () =>
      import('./InteractiveCalendar-DbvTwTq5.js').then((m) => ({ default: m.InteractiveCalendar })),
    __vite__mapDeps([
      35, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 36, 23, 37, 38, 29, 30,
      31, 39, 40, 20, 21,
    ]),
  ),
)
var NotificationsPanel = (0, import_react.lazy)(() =>
  __vitePreload(
    () =>
      import('./NotificationsPanel-_IWPHqBw.js').then((m) => ({ default: m.NotificationsPanel })),
    __vite__mapDeps([
      41, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 42, 43, 38, 29, 25, 44,
      45, 46, 47, 48, 49, 20, 21,
    ]),
  ),
)
function HubPage() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
    'data-uid': 'src/pages/HubPage.tsx:30:5',
    'data-prohibitions': '[editContent]',
    className:
      'flex flex-col lg:flex-row gap-6 p-6 w-full max-w-[1600px] mx-auto animate-fade-in font-sans relative',
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        'data-uid': 'src/pages/HubPage.tsx:32:7',
        'data-prohibitions': '[]',
        className: 'flex-1 space-y-6 min-w-0',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            'data-uid': 'src/pages/HubPage.tsx:33:9',
            'data-prohibitions': '[]',
            className: 'flex flex-col sm:flex-row sm:items-start justify-between gap-4',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                'data-uid': 'src/pages/HubPage.tsx:34:11',
                'data-prohibitions': '[]',
                className: 'flex-1',
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoneErrorBoundary, {
                  'data-uid': 'src/pages/HubPage.tsx:35:13',
                  'data-prohibitions': '[]',
                  zoneName: 'Boas-vindas',
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
                    'data-uid': 'src/pages/HubPage.tsx:36:15',
                    'data-prohibitions': '[]',
                    fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
                      'data-uid': 'src/pages/HubPage.tsx:36:35',
                      'data-prohibitions': '[editContent]',
                      className: 'h-[120px] w-full rounded-lg',
                    }),
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserGreeting, {
                      'data-uid': 'src/pages/HubPage.tsx:37:17',
                      'data-prohibitions': '[editContent]',
                    }),
                  }),
                }),
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
                'data-uid': 'src/pages/HubPage.tsx:41:11',
                'data-prohibitions': '[]',
                asChild: true,
                className:
                  'bg-brand-cyan hover:bg-brand-cyan/90 text-white font-bold w-full sm:w-auto shrink-0 shadow-md',
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoneErrorBoundary, {
            'data-uid': 'src/pages/HubPage.tsx:47:9',
            'data-prohibitions': '[]',
            zoneName: 'Alertas Críticos',
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
              'data-uid': 'src/pages/HubPage.tsx:48:11',
              'data-prohibitions': '[]',
              fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
                'data-uid': 'src/pages/HubPage.tsx:48:31',
                'data-prohibitions': '[editContent]',
                className: 'h-[250px] w-full rounded-lg',
              }),
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertsBlock, {
                'data-uid': 'src/pages/HubPage.tsx:49:13',
                'data-prohibitions': '[editContent]',
              }),
            }),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoneErrorBoundary, {
            'data-uid': 'src/pages/HubPage.tsx:53:9',
            'data-prohibitions': '[]',
            zoneName: 'Status de Trabalho',
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
              'data-uid': 'src/pages/HubPage.tsx:54:11',
              'data-prohibitions': '[]',
              fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
                'data-uid': 'src/pages/HubPage.tsx:54:31',
                'data-prohibitions': '[editContent]',
                className: 'h-[160px] w-full rounded-lg',
              }),
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkloadCards, {
                'data-uid': 'src/pages/HubPage.tsx:55:13',
                'data-prohibitions': '[editContent]',
              }),
            }),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoneErrorBoundary, {
            'data-uid': 'src/pages/HubPage.tsx:59:9',
            'data-prohibitions': '[]',
            zoneName: 'Performance Pessoal',
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
              'data-uid': 'src/pages/HubPage.tsx:60:11',
              'data-prohibitions': '[]',
              fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
                'data-uid': 'src/pages/HubPage.tsx:60:31',
                'data-prohibitions': '[editContent]',
                className: 'h-[400px] w-full rounded-lg',
              }),
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerformanceSection, {
                'data-uid': 'src/pages/HubPage.tsx:61:13',
                'data-prohibitions': '[editContent]',
              }),
            }),
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
        'data-uid': 'src/pages/HubPage.tsx:67:7',
        'data-prohibitions': '[]',
        className: 'flex lg:w-[350px] flex-col shrink-0 gap-6 w-full lg:mt-0 mt-2',
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
            'data-uid': 'src/pages/HubPage.tsx:68:9',
            'data-prohibitions': '[]',
            className:
              'lg:hidden flex items-center justify-between border-b border-border pb-2 mb-2',
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)('h3', {
              'data-uid': 'src/pages/HubPage.tsx:69:11',
              'data-prohibitions': '[]',
              className: 'text-lg font-bold text-foreground',
              children: 'Painel de Acompanhamento',
            }),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)('div', {
            'data-uid': 'src/pages/HubPage.tsx:72:9',
            'data-prohibitions': '[]',
            className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 w-full',
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                'data-uid': 'src/pages/HubPage.tsx:73:11',
                'data-prohibitions': '[]',
                className: 'min-h-[450px] flex flex-col',
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoneErrorBoundary, {
                  'data-uid': 'src/pages/HubPage.tsx:74:13',
                  'data-prohibitions': '[]',
                  zoneName: 'Calendário',
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
                    'data-uid': 'src/pages/HubPage.tsx:75:15',
                    'data-prohibitions': '[]',
                    fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
                      'data-uid': 'src/pages/HubPage.tsx:75:35',
                      'data-prohibitions': '[editContent]',
                      className: 'h-full w-full rounded-lg',
                    }),
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InteractiveCalendar, {
                      'data-uid': 'src/pages/HubPage.tsx:76:17',
                      'data-prohibitions': '[editContent]',
                    }),
                  }),
                }),
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)('div', {
                'data-uid': 'src/pages/HubPage.tsx:80:11',
                'data-prohibitions': '[]',
                className: 'min-h-[300px] flex flex-col',
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoneErrorBoundary, {
                  'data-uid': 'src/pages/HubPage.tsx:81:13',
                  'data-prohibitions': '[]',
                  zoneName: 'Notificações',
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
                    'data-uid': 'src/pages/HubPage.tsx:82:15',
                    'data-prohibitions': '[]',
                    fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
                      'data-uid': 'src/pages/HubPage.tsx:82:35',
                      'data-prohibitions': '[editContent]',
                      className: 'h-full w-full rounded-lg',
                    }),
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationsPanel, {
                      'data-uid': 'src/pages/HubPage.tsx:83:17',
                      'data-prohibitions': '[editContent]',
                    }),
                  }),
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  })
}
//#endregion
export { HubPage as default }

//# sourceMappingURL=HubPage-CKik8AFQ.js.map
