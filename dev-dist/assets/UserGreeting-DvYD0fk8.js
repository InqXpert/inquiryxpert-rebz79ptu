import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-B1AmfilC.js";
import "./react-dom-BFAuQCE8.js";
import { a as format, r as ptBR } from "./utils-BmdpXeKV.js";
import "./client-Di-ki1zB.js";
import "./use-auth-Cx9SfgZR.js";
import { A as AvatarFallback, j as AvatarImage, k as Avatar } from "./index-jzwx2Nny.js";
import { t as Skeleton } from "./skeleton-D0bIxZts.js";
import { t as useCurrentUser } from "./use-current-user-BM9Lhy7g.js";
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
	const { hours, minutes, time } = useDigitalClock();
	if (error) throw error;
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/UserGreeting.tsx:21:7",
		"data-prohibitions": "[]",
		className: "flex flex-col items-center justify-center gap-3 bg-card rounded-lg p-4 shadow-sm mb-6 border border-gray-200 dark:border-gray-800",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/components/UserGreeting.tsx:22:9",
				"data-prohibitions": "[editContent]",
				className: "h-6 w-48"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/components/UserGreeting.tsx:23:9",
				"data-prohibitions": "[editContent]",
				className: "w-16 h-16 md:w-20 md:h-20 rounded-full"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/components/UserGreeting.tsx:24:9",
				"data-prohibitions": "[editContent]",
				className: "h-4 w-40"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/components/UserGreeting.tsx:25:9",
				"data-prohibitions": "[editContent]",
				className: "h-8 w-20"
			})
		]
	});
	const formattedDate = format(time, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR }).split(" ").map((word) => {
		if (word.toLowerCase() === "de") return word.toLowerCase();
		return word.charAt(0).toUpperCase() + word.slice(1);
	}).join(" ");
	const currentHour = time.getHours();
	let saudacao = "Boa Noite";
	if (currentHour >= 5 && currentHour < 12) saudacao = "Bom Dia";
	else if (currentHour >= 12 && currentHour < 18) saudacao = "Boa Tarde";
	const firstName = (user?.name || user?.nome || "Usuário").trim().split(" ")[0].toUpperCase();
	const fotoPerfilUrl = avatarUrl;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/UserGreeting.tsx:53:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col items-center justify-center gap-3 bg-card rounded-lg p-4 shadow-sm mb-6 border border-gray-200 dark:border-gray-800",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				"data-uid": "src/components/UserGreeting.tsx:54:7",
				"data-prohibitions": "[editContent]",
				className: "font-semibold text-foreground text-center tracking-tight text-lg md:text-xl",
				children: [
					saudacao,
					", ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-uid": "src/components/UserGreeting.tsx:55:21",
						"data-prohibitions": "[editContent]",
						className: "font-bold uppercase",
						children: firstName
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
				"data-uid": "src/components/UserGreeting.tsx:58:7",
				"data-prohibitions": "[editContent]",
				className: "w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-primary shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
					"data-uid": "src/components/UserGreeting.tsx:59:9",
					"data-prohibitions": "[editContent]",
					src: fotoPerfilUrl,
					className: "object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
					"data-uid": "src/components/UserGreeting.tsx:60:9",
					"data-prohibitions": "[editContent]",
					className: "flex items-center justify-center bg-secondary text-secondary-foreground text-xl md:text-2xl font-bold w-full h-full uppercase",
					children: firstName.charAt(0)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/components/UserGreeting.tsx:65:7",
				"data-prohibitions": "[editContent]",
				className: "text-muted-foreground text-xs md:text-sm text-center font-medium m-0",
				children: formattedDate
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/UserGreeting.tsx:69:7",
				"data-prohibitions": "[editContent]",
				className: "font-bold text-foreground tracking-tight text-2xl md:text-3xl",
				children: [
					hours,
					":",
					minutes
				]
			})
		]
	});
});
//#endregion
export { UserGreeting };

//# sourceMappingURL=UserGreeting-DvYD0fk8.js.map