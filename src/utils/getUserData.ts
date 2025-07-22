export const getUserData = () => {
	try {
		const key = "loggedinUserData";
		const stored = localStorage.getItem(key);
		return stored ? JSON.parse(stored) : null;
	} catch (error) {
		console.error("LocalStorage error:", error);
		return null;
	}
};
