import { a as __toESM, n as require_react } from "./jsx-runtime-B1AmfilC.js";
import { t as pb } from "./client-C__982te.js";
import { n as useAuth } from "./use-auth-BBvLxjMC.js";
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
		setUser(authUser);
		const fetchUser = async () => {
			try {
				setLoading(true);
				setUser(await pb.collection("users").getOne(authUser.id, { fields: "id,name,email,foto_perfil" }));
				setError(null);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};
		fetchUser();
	}, [authUser, authLoading]);
	return {
		user,
		avatarUrl: user && user.foto_perfil ? pb.files.getUrl(user, user.foto_perfil) : void 0,
		loading,
		error
	};
}
//#endregion
export { useCurrentUser as t };

//# sourceMappingURL=use-current-user-BSVmamw1.js.map