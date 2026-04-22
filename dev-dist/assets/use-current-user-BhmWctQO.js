import { a as __toESM, n as require_react } from "./jsx-runtime-B1AmfilC.js";
import { t as pb } from "./client-DISGv6Ul.js";
import { n as useAuth } from "./use-auth-sAVSj_-c.js";
//#region src/hooks/use-current-user.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useCurrentUser() {
	const { user: authUser, loading: authLoading } = useAuth();
	const [user, setUser] = (0, import_react.useState)(authUser);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (authLoading) return;
		if (!authUser) {
			setUser(null);
			setLoading(false);
			return;
		}
		setUser((prev) => {
			if (!prev) return authUser;
			const hasImageChanged = prev.foto_perfil !== authUser.foto_perfil || prev.avatar !== authUser.avatar;
			return {
				...prev,
				...authUser,
				computedAvatarUrl: hasImageChanged ? void 0 : prev.computedAvatarUrl
			};
		});
		const fetchUser = async () => {
			try {
				const record = await pb.collection("users").getOne(authUser.id, { fields: "id,name,email,foto_perfil,avatar,role" });
				let finalAvatarUrl = void 0;
				if (record.foto_perfil) finalAvatarUrl = pb.files.getUrl(record, record.foto_perfil);
				else if (record.avatar) finalAvatarUrl = pb.files.getUrl(record, record.avatar);
				else if (record.role === "agente") try {
					const agenteRecord = await pb.collection("agentes").getFirstListItem(`user_id="${record.id}"`, { fields: "id,foto_perfil" });
					if (agenteRecord?.foto_perfil) finalAvatarUrl = pb.files.getUrl(agenteRecord, agenteRecord.foto_perfil);
				} catch (e) {}
				setUser({
					...record,
					computedAvatarUrl: finalAvatarUrl
				});
				setError(null);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};
		fetchUser();
	}, [authUser, authLoading]);
	let avatarUrl = user?.computedAvatarUrl;
	if (!avatarUrl && user) {
		if (user.foto_perfil) avatarUrl = pb.files.getUrl(user, user.foto_perfil);
		else if (user.avatar) avatarUrl = pb.files.getUrl(user, user.avatar);
	}
	return {
		user,
		avatarUrl,
		loading,
		error
	};
}
//#endregion
export { useCurrentUser as t };

//# sourceMappingURL=use-current-user-BhmWctQO.js.map