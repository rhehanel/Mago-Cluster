//#region src/assets/images/scraps/test/mqdefault.jpg
var mqdefault_default = new Proxy({
	"src": "/_astro/mqdefault.B-bqJqiB.jpg",
	"width": 320,
	"height": 180,
	"format": "jpg"
}, { get(target, name, receiver) {
	if (name === "clone") return structuredClone(target);
	if (name === "fsPath") return "/Users/hanel/Desktop/☘️/Mago Cluster Web/src/assets/images/scraps/test/mqdefault.jpg";
	return target[name];
} });
//#endregion
export { mqdefault_default as default };
