import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-B1AmfilC.js";
import "./react-dom-BFAuQCE8.js";
import { a as format, r as ptBR } from "./utils-BmdpXeKV.js";
import "./client-Di-ki1zB.js";
import "./use-auth-Cx9SfgZR.js";
import { A as AvatarFallback, j as AvatarImage, k as Avatar } from "./index-RzBvyUt7.js";
import { t as Skeleton } from "./skeleton-D0bIxZts.js";
import { t as useCurrentUser } from "./use-current-user-qqgDB7BD.js";
//#region src/hooks/use-digital-clock.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useDigitalClock() {
	const [time, setTime] = (0, import_react.useState)(/* @__PURE__ */ new Date());
	(0, import_react.useEffect)(() => {
		const interval = setInterval(() => {
			setTime(/* @__PURE__ */ new Date());
		}, 1e3);
		return () => clearInterval(interval);
	}, []);
	return {
		hours: time.getHours().toString().padStart(2, "0"),
		minutes: time.getMinutes().toString().padStart(2, "0"),
		seconds: time.getSeconds().toString().padStart(2, "0"),
		time
	};
}
//#endregion
//#region src/components/UserGreeting.tsx
var import_jsx_runtime = require_jsx_runtime();
var UserGreeting = (0, import_react.memo)(function UserGreeting() {
	const { user, avatarUrl, loading, error } = useCurrentUser();
	const { hours, minutes, seconds, time } = useDigitalClock();
	if (error) throw error;
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/UserGreeting.tsx:20:7",
		"data-prohibitions": "[]",
		className: "flex flex-col lg:flex-row items-center justify-between gap-4 bg-card rounded-lg p-6 shadow-sm mb-6 border border-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/UserGreeting.tsx:21:9",
			"data-prohibitions": "[]",
			className: "flex flex-col gap-1 w-full lg:w-auto items-center lg:items-start",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/components/UserGreeting.tsx:22:11",
					"data-prohibitions": "[editContent]",
					className: "h-8 w-64"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/components/UserGreeting.tsx:23:11",
					"data-prohibitions": "[editContent]",
					className: "h-4 w-48"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
					"data-uid": "src/components/UserGreeting.tsx:24:11",
					"data-prohibitions": "[editContent]",
					className: "h-6 w-32"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/components/UserGreeting.tsx:26:9",
			"data-prohibitions": "[]",
			className: "flex flex-col items-center lg:items-end gap-3 w-full lg:w-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/components/UserGreeting.tsx:27:11",
				"data-prohibitions": "[editContent]",
				className: "w-12 h-12 md:w-16 md:h-16 rounded-full"
			})
		})]
	});
	const formattedDate = format(time, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR }).split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/UserGreeting.tsx:40:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col lg:flex-row items-center justify-between gap-4 bg-card rounded-lg p-6 shadow-sm mb-6 border border-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-uid": "src/components/UserGreeting.tsx:41:7",
			"data-prohibitions": "[editContent]",
			className: "flex flex-col gap-1 w-full lg:w-auto items-center lg:items-start text-center lg:text-left",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					"data-uid": "src/components/UserGreeting.tsx:42:9",
					"data-prohibitions": "[editContent]",
					className: "text-2xl font-bold text-foreground",
					children: ["Olá, ", user?.name || user?.nome || "Usuário"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"data-uid": "src/components/UserGreeting.tsx:45:9",
					"data-prohibitions": "[editContent]",
					className: "text-sm text-muted-foreground",
					children: formattedDate
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					"data-uid": "src/components/UserGreeting.tsx:46:9",
					"data-prohibitions": "[editContent]",
					className: "text-lg font-mono text-primary font-semibold",
					children: [
						hours,
						":",
						minutes,
						":",
						seconds
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-uid": "src/components/UserGreeting.tsx:51:7",
			"data-prohibitions": "[editContent]",
			className: "flex flex-col items-center lg:items-end gap-3 w-full lg:w-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
				"data-uid": "src/components/UserGreeting.tsx:52:9",
				"data-prohibitions": "[editContent]",
				className: "w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-primary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
					"data-uid": "src/components/UserGreeting.tsx:53:11",
					"data-prohibitions": "[editContent]",
					src: avatarUrl,
					className: "object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
					"data-uid": "src/components/UserGreeting.tsx:54:11",
					"data-prohibitions": "[editContent]",
					className: "flex items-center justify-center bg-secondary text-secondary-foreground w-full h-full",
					children: user?.name?.[0] || user?.nome?.[0] || "U"
				})]
			})
		})]
	});
});
//#endregion
export { UserGreeting };

//# sourceMappingURL=UserGreeting-Dz7L1cJp.js.map