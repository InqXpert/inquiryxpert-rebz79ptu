import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-B1AmfilC.js";
import "./react-dom-BFAuQCE8.js";
import { t as Camera } from "./camera-luBbDYM9.js";
import { a as format, r as ptBR } from "./utils-D2yNQxT3.js";
import "./client-DISGv6Ul.js";
import "./use-auth-sAVSj_-c.js";
import { A as AvatarFallback, d as toast, j as AvatarImage, k as Avatar } from "./index-5ZyRFE9x.js";
import { t as Skeleton } from "./skeleton-CPY9-4NM.js";
import { t as useCurrentUser } from "./use-current-user-BhAlgbZS.js";
import { t as usuariosService } from "./usuariosService-CtSThSNy.js";
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
	const fileInputRef = (0, import_react.useRef)(null);
	const [isUploading, setIsUploading] = (0, import_react.useState)(false);
	const [localAvatarUrl, setLocalAvatarUrl] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setLocalAvatarUrl(avatarUrl || null);
	}, [avatarUrl]);
	if (error) throw error;
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/UserGreeting.tsx:31:7",
		"data-prohibitions": "[]",
		className: "flex flex-col items-center justify-center gap-3 bg-card rounded-lg p-6 shadow-sm mb-6 border border-gray-200 dark:border-gray-800",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/components/UserGreeting.tsx:32:9",
				"data-prohibitions": "[editContent]",
				className: "h-6 w-48"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/components/UserGreeting.tsx:33:9",
				"data-prohibitions": "[editContent]",
				className: "w-24 h-24 md:w-32 md:h-32 rounded-full"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/components/UserGreeting.tsx:34:9",
				"data-prohibitions": "[editContent]",
				className: "h-4 w-40"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
				"data-uid": "src/components/UserGreeting.tsx:35:9",
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
	const handleAvatarClick = () => {
		if (isUploading) return;
		fileInputRef.current?.click();
	};
	const handleFileChange = async (event) => {
		const file = event.target.files?.[0];
		if (!file) return;
		if (!file.type.startsWith("image/")) {
			toast.error("Por favor, selecione uma imagem válida (jpg, png, webp).");
			return;
		}
		if (file.size > 5 * 1024 * 1024) {
			toast.error("A imagem deve ter no máximo 5MB.");
			return;
		}
		const objectUrl = URL.createObjectURL(file);
		const previousAvatarUrl = localAvatarUrl;
		setLocalAvatarUrl(objectUrl);
		try {
			setIsUploading(true);
			if (user?.id) {
				await usuariosService.updateFotoPerfil(user.id, file);
				toast.success("Foto de perfil atualizada com sucesso!");
			}
		} catch (err) {
			toast.error("Erro ao atualizar foto de perfil. Tente novamente.");
			console.error(err);
			setLocalAvatarUrl(previousAvatarUrl);
		} finally {
			setIsUploading(false);
			if (fileInputRef.current) fileInputRef.current.value = "";
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-uid": "src/components/UserGreeting.tsx:105:5",
		"data-prohibitions": "[editContent]",
		className: "flex flex-col items-center justify-center gap-3 bg-card rounded-lg p-6 shadow-sm mb-6 border border-gray-200 dark:border-gray-800",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				"data-uid": "src/components/UserGreeting.tsx:106:7",
				"data-prohibitions": "[editContent]",
				className: "font-semibold text-foreground text-center tracking-tight text-lg md:text-xl",
				children: [
					saudacao,
					", ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-uid": "src/components/UserGreeting.tsx:107:21",
						"data-prohibitions": "[editContent]",
						className: "font-bold uppercase",
						children: firstName
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/UserGreeting.tsx:110:7",
				"data-prohibitions": "[editContent]",
				className: "relative group cursor-pointer rounded-full overflow-hidden",
				onClick: handleAvatarClick,
				title: "Alterar foto de perfil",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
						"data-uid": "src/components/UserGreeting.tsx:115:9",
						"data-prohibitions": "[editContent]",
						className: `w-24 h-24 md:w-32 md:h-32 shadow-sm transition-opacity duration-200 ${isUploading ? "opacity-50" : "group-hover:opacity-90"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
							"data-uid": "src/components/UserGreeting.tsx:118:11",
							"data-prohibitions": "[editContent]",
							src: localAvatarUrl || "",
							className: "object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
							"data-uid": "src/components/UserGreeting.tsx:119:11",
							"data-prohibitions": "[editContent]",
							className: "flex items-center justify-center bg-secondary text-secondary-foreground text-3xl md:text-4xl font-bold w-full h-full uppercase",
							children: firstName.charAt(0)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"data-uid": "src/components/UserGreeting.tsx:124:9",
						"data-prohibitions": "[]",
						className: "absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, {
							"data-uid": "src/components/UserGreeting.tsx:125:11",
							"data-prohibitions": "[editContent]",
							className: "w-8 h-8 text-white"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						"data-uid": "src/components/UserGreeting.tsx:128:9",
						"data-prohibitions": "[editContent]",
						type: "file",
						ref: fileInputRef,
						onChange: handleFileChange,
						accept: "image/jpeg, image/png, image/webp",
						className: "hidden"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"data-uid": "src/components/UserGreeting.tsx:137:7",
				"data-prohibitions": "[editContent]",
				className: "text-muted-foreground text-xs md:text-sm text-center font-medium m-0 mt-1",
				children: formattedDate
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-uid": "src/components/UserGreeting.tsx:141:7",
				"data-prohibitions": "[editContent]",
				className: "font-bold text-foreground tracking-tight text-3xl md:text-4xl",
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

//# sourceMappingURL=UserGreeting-DESVcg55.js.map