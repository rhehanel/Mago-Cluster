//#region src/assets/images/blocks/tigergang/blocks/1/value/images/1/image.jpg
var image_default = new Proxy({
	"src": "/_astro/image.CVRLO866.jpg",
	"width": 800,
	"height": 1867,
	"format": "jpg"
}, { get(target, name, receiver) {
	if (name === "clone") return structuredClone(target);
	if (name === "fsPath") return "/Users/hanel/Desktop/☘️/Mago Cluster Web/src/assets/images/blocks/tigergang/blocks/1/value/images/1/image.jpg";
	return target[name];
} });
//#endregion
export { image_default as default };
