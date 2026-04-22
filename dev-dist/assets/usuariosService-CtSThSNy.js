import { t as pb } from "./client-DISGv6Ul.js";
import { r as trackAcao } from "./use-auth-sAVSj_-c.js";
//#region src/services/usuariosService.ts
var buildFormData = (data) => {
	const fd = new FormData();
	for (const key in data) if (data[key] !== void 0 && data[key] !== null) if (data[key] instanceof File) fd.append(key, data[key]);
	else if (Array.isArray(data[key]) || typeof data[key] === "object") fd.append(key, JSON.stringify(data[key]));
	else fd.append(key, String(data[key]));
	return fd;
};
var usuariosService = {
	fetchUsuarios: async () => {
		return await pb.collection("users").getFullList({ sort: "-created" });
	},
	checkEmailExists: async (email, excludeId) => {
		try {
			const filter = excludeId ? `email='${email}' && id != '${excludeId}'` : `email='${email}'`;
			return (await pb.collection("users").getList(1, 1, { filter })).totalItems > 0;
		} catch {
			return false;
		}
	},
	fetchRolePermissoes: async (role) => {
		try {
			return (await pb.collection("roles_permissoes").getFirstListItem(`role='${role}'`)).permissoes || [];
		} catch {
			return [];
		}
	},
	createUsuario: async (data, motivo) => {
		const payload = buildFormData(data);
		const user = await pb.collection("users").create(payload);
		await trackAcao("criar_usuario", `Criou o usuário ${data.email}`, user.id, motivo);
		return user;
	},
	updateUsuario: async (id, data, motivo) => {
		const payload = buildFormData(data);
		const user = await pb.collection("users").update(id, payload);
		await trackAcao("editar_usuario", `Atualizou perfil do usuário ${user.email}`, user.id, motivo);
		return user;
	},
	updateFotoPerfil: async (id, file) => {
		const fd = new FormData();
		if (file) fd.append("foto_perfil", file);
		else fd.append("foto_perfil", "");
		const user = await pb.collection("users").update(id, fd);
		await trackAcao("alteracao_perfil", `Atualizou a foto de perfil`, user.id);
		return user;
	},
	toggle2FA: async (id, enabled, secret) => {
		const data = { two_fa_enabled: enabled };
		if (secret) data.two_fa_secret = secret;
		else if (!enabled) data.two_fa_secret = "";
		const user = await pb.collection("users").update(id, data);
		await trackAcao("habilitar_2fa", `${enabled ? "Habilitou" : "Desabilitou"} 2FA para o usuário`, user.id, "Solicitado pelo administrador ou próprio usuário");
		return user;
	},
	checkActiveSessionsFor2FA: async (userId) => {
		return (await pb.collection("usuarios_sessoes").getList(1, 1, { filter: `user_id='${userId}' && expirada=false` })).totalItems > 0;
	},
	resetSenha: async (id, motivo) => {
		const tempPassword = Math.random().toString(36).slice(-8) + "A1@";
		const user = await pb.collection("users").update(id, {
			password: tempPassword,
			passwordConfirm: tempPassword
		});
		await trackAcao("resetar_senha", `Resetou a senha do usuário ${user.email}`, user.id, motivo);
		return tempPassword;
	},
	alterarRole: async (userId, novoRole, motivo) => {
		const user = await pb.collection("users").update(userId, { role: novoRole });
		await trackAcao("alterar_role", `Alterou role do usuário ${user.email} para ${novoRole}`, user.id, motivo);
		return user;
	},
	permitirUsuario: async (id, motivo) => {
		const user = await pb.collection("users").update(id, { status_conta: "ativo" });
		await trackAcao("alterar_status_usuario", `Ativou o usuário ${user.email}`, user.id, motivo);
		return user;
	},
	bloquearUsuario: async (id, motivo) => {
		const user = await pb.collection("users").update(id, { status_conta: "bloqueado" });
		await trackAcao("alterar_status_usuario", `Bloqueou o usuário ${user.email}`, user.id, motivo);
		return user;
	},
	fetchSessoes: async (userId) => {
		return await pb.collection("usuarios_sessoes").getFullList({
			filter: `user_id='${userId}' && expirada=false`,
			sort: "-created"
		});
	},
	forceLogout: async (sessionId) => {
		const session = await pb.collection("usuarios_sessoes").update(sessionId, { expirada: true });
		await trackAcao("logout", `Forçou logout remoto da sessão ${sessionId}`, session.user_id, "Ação administrativa");
		return session;
	}
};
//#endregion
export { usuariosService as t };

//# sourceMappingURL=usuariosService-CtSThSNy.js.map