import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-B1AmfilC.js";
import "./react-dom-BFAuQCE8.js";
import { a as format, r as ptBR } from "./utils-BmdpXeKV.js";
import { t as pb } from "./client-Di-ki1zB.js";
import "./use-auth-Cx9SfgZR.js";
import { A as AvatarFallback, j as AvatarImage, k as Avatar } from "./index-DeK3xgtG.js";
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
	const { hours, minutes, time } = useDigitalClock();
	if (error) throw error;
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/UserGreeting.tsx:21:7",
		"data-prohibitions": "[]",
		className: "flex flex-col items-center justify-center gap-4 bg-card rounded-lg p-6 shadow-sm mb-6 border border-gray-200 dark:border-gray-800",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/components/UserGreeting.tsx:22:9",
				"data-prohibitions": "[editContent]",
				className: "h-8 w-64"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/components/UserGreeting.tsx:23:9",
				"data-prohibitions": "[editContent]",
				className: "w-24 h-24 md:w-32 md:h-32 rounded-full"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/components/UserGreeting.tsx:24:9",
				"data-prohibitions": "[editContent]",
				className: "h-4 w-48"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/components/UserGreeting.tsx:25:9",
				"data-prohibitions": "[editContent]",
				className: "h-10 w-24"
			})
		]
	});
	const formattedDate = format(time, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR }).split(" ").map((word) => {
		if (word.toLowerCase() === "de") return word.toLowerCase();
		return word.charAt(0).toUpperCase() + word.slice(1);
	}).join(" ");
	const currentHour = time.getHours();
	let saudacao = "BOA NOITE";
	if (currentHour >= 5 && currentHour < 12) saudacao = "BOM DIA";
	else if (currentHour >= 12 && currentHour < 18) saudacao = "BOA TARDE";
	const firstName = (user?.name || user?.nome || "Usuário").trim().split(" ")[0].toUpperCase();
	const greetingString = `${saudacao} ${firstName}`;
	const fotoPerfilUrl = user?.foto_perfil ? pb.files.getUrl(user, user.foto_perfil) : avatarUrl;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/UserGreeting.tsx:55:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col items-center justify-center gap-4 bg-card rounded-lg p-6 shadow-sm mb-6 border border-gray-200 dark:border-gray-800",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				"data-uid": "src/components/UserGreeting.tsx:56:7",
				"data-prohibitions": "[editContent]",
				className: "text-xl md:text-2xl lg:text-3xl font-bold text-foreground text-center uppercase tracking-tight",
				children: greetingString
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
				"data-uid": "src/components/UserGreeting.tsx:60:7",
				"data-prohibitions": "[editContent]",
				className: "w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-primary shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
					"data-uid": "src/components/UserGreeting.tsx:61:9",
					"data-prohibitions": "[editContent]",
					src: fotoPerfilUrl,
					className: "object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
					"data-uid": "src/components/UserGreeting.tsx:62:9",
					"data-prohibitions": "[editContent]",
					className: "flex items-center justify-center bg-secondary text-secondary-foreground text-3xl md:text-4xl font-bold w-full h-full uppercase",
					children: firstName.charAt(0)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/components/UserGreeting.tsx:67:7",
				"data-prohibitions": "[editContent]",
				className: "text-muted-foreground text-sm md:text-base text-center font-medium",
				children: formattedDate
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/UserGreeting.tsx:71:7",
				"data-prohibitions": "[editContent]",
				className: "text-4xl md:text-5xl font-bold text-foreground tracking-tighter",
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

//# sourceMappingURL=UserGreeting-CpSOCMdk.js.map