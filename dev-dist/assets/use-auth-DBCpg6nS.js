import { a as __toESM, n as require_react, t as require_jsx_runtime } from "./jsx-runtime-B1AmfilC.js";
import { t as pb } from "./client-C09Xk8zE.js";
//#region src/utils/trackAcao.ts
var trackAcao = async (acao, descricao, usuarioAfetadoId, motivo) => {
	try {
		if (!pb.authStore.record) return;
		let descFinal = descricao;
		if (motivo) descFinal += ` | Motivo: ${motivo}`;
		await pb.collection("usuarios_historico").create({
			user_id: pb.authStore.record.id,
			acao,
			descricao: descFinal,
			usuario_afetado_id: usuarioAfetadoId || null,
			ip_address: "0.0.0.0",
			user_agent: navigator.userAgent
		});
	} catch (e) {
		console.error("Failed to log audit action", e);
	}
};
//#endregion
//#region src/hooks/use-auth.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var AuthContext = (0, import_react.createContext)(void 0);
var useAuth = () => {
	const context = (0, import_react.useContext)(AuthContext);
	if (!context) throw new Error("useAuth must be used within an AuthProvider");
	return context;
};
var AuthProvider = ({ children }) => {
	const [user, setUser] = (0, import_react.useState)(pb.authStore.record);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const handleSignOut = (0, import_react.useCallback)(async () => {
		if (pb.authStore.record) try {
			const sessionId = localStorage.getItem("current_session_id");
			if (sessionId) {
				const sessao = await pb.collection("usuarios_sessoes").getOne(sessionId);
				const start = new Date(sessao.created);
				const diffMins = Math.floor(((/* @__PURE__ */ new Date()).getTime() - start.getTime()) / 6e4);
				await pb.collection("usuarios_sessoes").update(sessionId, {
					expirada: true,
					duracao_minutos: diffMins
				});
				const u = await pb.collection("users").getOne(pb.authStore.record.id);
				await pb.collection("users").update(u.id, { tempo_uso_total: (u.tempo_uso_total || 0) + diffMins });
				localStorage.removeItem("current_session_id");
			}
			await trackAcao("logout", "Logout efetuado do sistema");
		} catch (e) {
			console.error("Falha ao encerrar sessão", e);
		}
		pb.authStore.clear();
		setUser(null);
	}, []);
	(0, import_react.useEffect)(() => {
		const initAuth = async () => {
			if (pb.authStore.isValid) try {
				const sessionId = localStorage.getItem("current_session_id");
				if (sessionId) {
					const sess = await pb.collection("usuarios_sessoes").getOne(sessionId);
					if (((/* @__PURE__ */ new Date()).getTime() - new Date(sess.updated).getTime()) / (1e3 * 60 * 60) > 8 || sess.expirada) {
						await handleSignOut();
						setLoading(false);
						return;
					}
					await pb.collection("usuarios_sessoes").update(sessionId, { updated: (/* @__PURE__ */ new Date()).toISOString() });
				}
				await pb.collection("users").authRefresh();
				setUser(pb.authStore.record);
			} catch (error) {
				console.error("Auth refresh failed:", error);
				await handleSignOut();
			}
			setLoading(false);
		};
		initAuth();
		const unsubscribe = pb.authStore.onChange((_token, record) => {
			setUser(record);
		});
		const interval = setInterval(() => {
			if (pb.authStore.isValid) initAuth();
		}, 600 * 1e3);
		return () => {
			unsubscribe();
			clearInterval(interval);
		};
	}, [handleSignOut]);
	const signIn = async (email, password) => {
		try {
			const authData = await pb.collection("users").authWithPassword(email, password);
			try {
				await pb.collection("users").update(authData.record.id, { ultimo_login: (/* @__PURE__ */ new Date()).toISOString() });
				const sessao = await pb.collection("usuarios_sessoes").create({
					user_id: authData.record.id,
					token: pb.authStore.token,
					ip_address: "0.0.0.0",
					duracao_minutos: 0,
					expirada: false
				});
				localStorage.setItem("current_session_id", sessao.id);
				await trackAcao("login", "Login efetuado com sucesso");
			} catch (e) {
				console.error("Falha ao registrar histórico de login", e);
			}
			return { error: null };
		} catch (error) {
			return { error };
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		"data-uid": "src/hooks/use-auth.tsx:136:5",
		"data-prohibitions": "[editContent]",
		value: {
			user,
			signIn,
			signOut: handleSignOut,
			loading
		},
		children
	});
};
//#endregion
export { useAuth as n, trackAcao as r, AuthProvider as t };

//# sourceMappingURL=use-auth-DBCpg6nS.js.map