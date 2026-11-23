import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { T as createAstro, _ as addAttribute, a as Fragment, d as renderTemplate, h as maybeRenderHead, i as renderComponent } from "./server_D5nMgjVk.mjs";
import { t as createComponent } from "./compiler_BYPEd_ML.mjs";
import { i as renderScript, n as getCollection, t as $$Layout } from "./Layout_DByewf4r.mjs";
import { i as $$Image } from "./_astro_assets_Dp1ccy61.mjs";
//#region src/components/glob/TimeDisplay.astro
createAstro("https://astro.build");
var $$TimeDisplay = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$TimeDisplay;
	const { timeData } = Astro.props;
	if (!timeData) return null;
	const formatType = timeData.discriminant;
	const data = timeData.value;
	function formatDate(dateInput) {
		if (!dateInput) return "";
		let dateString = dateInput;
		if (dateInput instanceof Date) dateString = dateInput.toISOString();
		if (typeof dateString !== "string") dateString = String(dateString);
		const parts = dateString.split("T")[0].split("-");
		if (parts.length !== 3) return dateString;
		const [year, month, day] = parts;
		return `${year}.${month}.${day}`;
	}
	return renderTemplate`${maybeRenderHead($$result)}<div class="time-display">${formatType === "date" && renderTemplate`<span class="date-format"><time>${formatDate(data.value)}</time>${data.time ? renderTemplate`<span class="period-time">${data.time}</span>` : ""}</span>`}${formatType === "year" && renderTemplate`<span class="year-format"><time>${data.value}</time></span>`}${formatType === "time" && renderTemplate`<span class="period-format">${data.discriminant === true && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<time class="period-dates">${data.value.dates}</time>${data.value.time && renderTemplate`<span class="period-time"> (${data.value.time})</span>`}` })}`}${data.discriminant === false && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<time class="period-dates">${formatDate(data.value.date)}${data.value.enddate ? ` — ${formatDate(data.value.enddate)}` : ""}</time>${data.value.time && renderTemplate`<span class="period-time">${data.value.time}</span>`}` })}`}</span>`}</div>`;
}, "/Users/hanel/Desktop/☘️/Mago Cluster Web/src/components/glob/TimeDisplay.astro", void 0);
//#endregion
//#region src/components/GlobalImage.astro
createAstro("https://astro.build");
var $$GlobalImage = createComponent(async ($$result, $$props, $$slots) => {
	const Astro2 = $$result.createAstro($$props, $$slots);
	Astro2.self = $$GlobalImage;
	const { src, alt = "Image", imgStyle, imgClass = "" } = Astro2.props;
	function resolveSrcInput(input) {
		if (!input) return null;
		if (input instanceof Promise) return input;
		if (typeof input === "string") return input;
		if (typeof input === "object") {
			if (typeof input.src === "string") return input.src;
			if (input.src && typeof input.src === "object") return input.src;
			if (typeof input.image === "string") return input.image;
			if (typeof input.url === "string") return input.url;
			if (typeof input.value === "string") return input.value;
			for (const key of Object.keys(input)) {
				const found = resolveSrcInput(input[key]);
				if (found) return found;
			}
		}
		return null;
	}
	let resolvedSrc = resolveSrcInput(src);
	if (resolvedSrc instanceof Promise) {
		resolvedSrc = await resolvedSrc;
		resolvedSrc = resolveSrcInput(resolvedSrc);
	}
	const R2_DOMAIN = "https://pub-77073e32045b4430843d2be903d5893e.r2.dev";
	const isString = typeof resolvedSrc === "string";
	const isObject = typeof resolvedSrc === "object" && resolvedSrc !== null;
	let finalImageSrc = "";
	let finalAstroImage = null;
	let rawPathForR2 = "";
	if (isString) rawPathForR2 = resolvedSrc;
	else if (isObject && resolvedSrc.src) rawPathForR2 = resolvedSrc.src;
	const fileName = rawPathForR2 ? rawPathForR2.split("/").pop()?.split("?")[0] : "";
	if (fileName) finalImageSrc = `${R2_DOMAIN}/works/${fileName}`;
	else if (isObject && "src" in resolvedSrc) finalAstroImage = resolvedSrc;
	else if (isString) {
		const idx = resolvedSrc.indexOf("assets/images");
		if (idx !== -1) {
			const imagePath = `/src/assets/images${resolvedSrc.substring(idx + 13)}`;
			const imageModule = (/* @__PURE__ */ Object.assign({
				"/src/assets/images/blocks/because-we-are-bordering-on-the-sea-and-falling/blocks/1/value/images/0/image.jpeg": () => import("./image_DgGiKFRW.mjs"),
				"/src/assets/images/blocks/because-we-are-bordering-on-the-sea-and-falling/blocks/1/value/images/1/image.jpeg": () => import("./image_COvMYjar.mjs"),
				"/src/assets/images/blocks/because-we-are-bordering-on-the-sea-and-falling/blocks/1/value/images/2/image.jpeg": () => import("./image_COaSzFmm.mjs"),
				"/src/assets/images/blocks/brain-in-a-jar/blocks/0/value/image.jpeg": () => import("./image_bFg9inf9.mjs"),
				"/src/assets/images/blocks/concrete-walk-with-general-nam-yi/blocks/0/value/images/0/image.png": () => import("./image_ClNA6JDi.mjs"),
				"/src/assets/images/blocks/concrete-walk-with-general-nam-yi/blocks/0/value/images/1/image.png": () => import("./image_B9BAhDQH.mjs"),
				"/src/assets/images/blocks/concrete-walk-with-general-nam-yi/blocks/0/value/images/2/image.png": () => import("./image_BimnmQwq.mjs"),
				"/src/assets/images/blocks/concrete-walk-with-general-nam-yi/blocks/0/value/images/3/image.png": () => import("./image_CjGv_klZ.mjs"),
				"/src/assets/images/blocks/concrete-walk-with-general-nam-yi/blocks/0/value/images/4/image.png": () => import("./image_DZaR7LAU.mjs"),
				"/src/assets/images/blocks/concrete-walk-with-general-nam-yi/blocks/0/value/images/5/image.jpeg": () => import("./image_Wx6znyXG.mjs"),
				"/src/assets/images/blocks/dear-rocks-trees-and-cheolgeun/blocks/1/value/images/0/image.jpeg": () => import("./image_CBAwIeRN.mjs"),
				"/src/assets/images/blocks/dear-rocks-trees-and-cheolgeun/blocks/1/value/images/1/image.jpeg": () => import("./image_BlZusb8O.mjs"),
				"/src/assets/images/blocks/dear-rocks-trees-and-cheolgeun/blocks/1/value/images/2/image.jpeg": () => import("./image_BF2LygAm.mjs"),
				"/src/assets/images/blocks/do-not-be-alarmed-by-the-sbuspended-worker-outside-the-window/blocks/1/value/images/0/image.jpeg": () => import("./image_C6rk_-2c.mjs"),
				"/src/assets/images/blocks/do-not-be-alarmed-by-the-sbuspended-worker-outside-the-window/blocks/1/value/images/1/image.jpeg": () => import("./image_Drz_T08F.mjs"),
				"/src/assets/images/blocks/do-not-be-alarmed-by-the-sbuspended-worker-outside-the-window/blocks/1/value/images/2/image.jpeg": () => import("./image_DmyLAWY2.mjs"),
				"/src/assets/images/blocks/human-battery-in-matrix/blocks/0/value/image.jpeg": () => import("./image_DOEgbXLa.mjs"),
				"/src/assets/images/blocks/ito-junji-the-hole/blocks/0/value/images/0/image.jpg": () => import("./image_C-fHDzqm.mjs"),
				"/src/assets/images/blocks/ito-junji-the-hole/blocks/0/value/images/1/image.jpeg": () => import("./image_YmeixhW6.mjs"),
				"/src/assets/images/blocks/ito-junji-the-hole/blocks/0/value/images/2/image.jpeg": () => import("./image_DUReP_nE.mjs"),
				"/src/assets/images/blocks/ito-junji-the-hole/blocks/0/value/images/3/image.jpeg": () => import("./image_CBtnqY0J.mjs"),
				"/src/assets/images/blocks/ito-junji-the-hole/blocks/0/value/images/4/image.jpg": () => import("./image_CV3gySC2.mjs"),
				"/src/assets/images/blocks/my-sequence-dies-within-every-breath/blocks/1/value/images/0/image.png": () => import("./image_CHRpgjB-.mjs"),
				"/src/assets/images/blocks/my-sequence-dies-within-every-breath/blocks/1/value/images/1/image.png": () => import("./image_CHqQE_gL.mjs"),
				"/src/assets/images/blocks/my-sequence-dies-within-every-breath/blocks/1/value/images/2/image.png": () => import("./image_BYOZF7rc.mjs"),
				"/src/assets/images/blocks/no-bu-water/blocks/1/value/images/0/image.jpeg": () => import("./image_BWfbcm6g.mjs"),
				"/src/assets/images/blocks/no-bu-water/blocks/1/value/images/1/image.jpeg": () => import("./image_DTRLslV72.mjs"),
				"/src/assets/images/blocks/no-bu-water/blocks/1/value/images/2/image.jpeg": () => import("./image_C5jaQ8Yd2.mjs"),
				"/src/assets/images/blocks/no-bu-water/blocks/1/value/images/3/image.jpeg": () => import("./image_DyK2AGIp2.mjs"),
				"/src/assets/images/blocks/no-bu-water/blocks/1/value/images/4/image.jpeg": () => import("./image_BPOOMNMn2.mjs"),
				"/src/assets/images/blocks/origin-of-language/blocks/0/value/image.jpeg": () => import("./image_Be6rc1gJ2.mjs"),
				"/src/assets/images/blocks/red-rosa/blocks/0/value/image.jpeg": () => import("./image_DYjxYWNu2.mjs"),
				"/src/assets/images/blocks/riichi-ueshiba-mysterious-girlfriend-x/blocks/0/value/image.jpeg": () => import("./image_T0uBzisK2.mjs"),
				"/src/assets/images/blocks/sometimes-you-mix-the-past-with-the-present-and-your-happiness-disappears/blocks/1/value/images/0/image.jpeg": () => import("./image_CBGt1eKD2.mjs"),
				"/src/assets/images/blocks/sometimes-you-mix-the-past-with-the-present-and-your-happiness-disappears/blocks/1/value/images/1/image.jpeg": () => import("./image_D0s7sPWN2.mjs"),
				"/src/assets/images/blocks/sometimes-you-mix-the-past-with-the-present-and-your-happiness-disappears/blocks/1/value/images/2/image.jpeg": () => import("./image_CPqrHBYb2.mjs"),
				"/src/assets/images/blocks/they-dont-know-or-am-I-the-one-doesnt-know/blocks/0/value/image.jpeg": () => import("./image_Cpcj9LqU2.mjs"),
				"/src/assets/images/blocks/thomas-putting-his-finger-into-the-sacred-wound/blocks/0/value/image.png": () => import("./image_BNkPMz1y2.mjs"),
				"/src/assets/images/blocks/tigergang/blocks/1/value/images/0/image.jpg": () => import("./image_B_hkQwOd2.mjs"),
				"/src/assets/images/blocks/tigergang/blocks/1/value/images/1/image.jpg": () => import("./image_D2XOf39p.mjs"),
				"/src/assets/images/blocks/tigergang/blocks/2/value/images/0/image.jpeg": () => import("./image_BvA3GAFD.mjs"),
				"/src/assets/images/blocks/tigergang/blocks/2/value/images/1/image.jpeg": () => import("./image_DBaqfEgn.mjs"),
				"/src/assets/images/blocks/where-is-title/blocks/1/value/image.webp": () => import("./image_xEHUvCb-.mjs"),
				"/src/assets/images/blocks/where-is-title/blocks/2/value/images/0/image.webp": () => import("./image_7ROSUe04.mjs"),
				"/src/assets/images/blocks/where-is-title/blocks/2/value/images/1/image.jpg": () => import("./image_FsGMfqJ_.mjs"),
				"/src/assets/images/blocks/where-is-title/blocks/2/value/images/2/image.webp": () => import("./image_BJNYUnpV.mjs"),
				"/src/assets/images/blocks/where-is-title/blocks/3/value/images/0/image.png": () => import("./image_BKRBJYI1.mjs"),
				"/src/assets/images/blocks/where-is-title/blocks/3/value/images/1/image.png": () => import("./image_DNgtC9h7.mjs"),
				"/src/assets/images/blocks/where-is-title/blocks/3/value/images/2/image.png": () => import("./image_BHs4PsEM.mjs"),
				"/src/assets/images/blocks/who-did-you-exploited-today/blocks/1/value/images/0/image.jpeg": () => import("./image_PY0feX9R.mjs"),
				"/src/assets/images/blocks/who-did-you-exploited-today/blocks/1/value/images/1/image.jpeg": () => import("./image_iYK8eIW7.mjs"),
				"/src/assets/images/blocks/who-did-you-exploited-today/blocks/1/value/images/2/image.jpeg": () => import("./image_BDCf_KkW.mjs"),
				"/src/assets/images/scraps/test/839d5729da0ffb8d4958e20f86313523.webp": () => import("./839d5729da0ffb8d4958e20f86313523_CK_I-1t6.mjs"),
				"/src/assets/images/scraps/test/QU_q-plFGd9TSPvGqW1XCEQQx7LPtfCQuq7ESH_QujsYx31iTu2JO6cHprEW67glp5NJLBQ04fsSm-SyDdOJaJNLRYhzZdRN8VBnZlaS-RzdFh5c3ezO0coGpSj5dF8TQBxvEj6K2Ld2p3CQo5YtLqTFyXgyLJQS3Z0Sih-7k0g.webp": () => import("./QU_q-plFGd9TSPvGqW1XCEQQx7LPtfCQuq7ESH_QujsYx31iTu2JO6cHprEW67glp5NJLBQ04fsSm-SyDdOJaJNLRYhzZdRN8VBnZlaS-RzdFh5c3ezO0coGpSj5dF8TQBxvEj6K2Ld2p3CQo5YtLqTFyXgyLJQS3Z0Sih-7k0g_4MFOhh8s.mjs"),
				"/src/assets/images/scraps/test/dn28086-2_800.jpg": () => import("./dn28086-2_800_7f-7ixty.mjs"),
				"/src/assets/images/scraps/test/mqdefault.jpg": () => import("./mqdefault_mvpWMa6V.mjs")
			}))[imagePath];
			if (imageModule) finalAstroImage = (await imageModule()).default;
			else finalImageSrc = resolvedSrc;
		} else finalImageSrc = resolvedSrc;
	}
	const appliedStyle = imgStyle || {
		maxWidth: "100%",
		height: "auto"
	};
	return renderTemplate`${finalAstroImage ? renderTemplate`${renderComponent($$result, "Image", $$Image, {
		"src": finalAstroImage,
		"alt": alt || "이미지",
		"widths": [
			400,
			800,
			1200
		],
		"sizes": "(max-width: 768px) 100vw, 800px",
		"format": "webp",
		"style": appliedStyle,
		"class": imgClass,
		"inferSize": true
	})}` : finalImageSrc ? renderTemplate`${maybeRenderHead($$result)}<img${addAttribute(finalImageSrc, "src")}${addAttribute(alt || "이미지", "alt")} loading="lazy"${addAttribute(appliedStyle, "style")}${addAttribute(imgClass, "class")}>` : renderTemplate`<div style="padding: 1rem; border: 1px dashed red; color: red;">⚠️ 이미지를 불러올 수 없거나 경로가 비어있습니다. (받은 값: ${JSON.stringify(src)?.slice(0, 100)})</div>`}`;
}, "/Users/hanel/Desktop/☘️/Mago Cluster Web/src/components/GlobalImage.astro", void 0);
//#endregion
//#region src/components/timeline/PostItem.astro
createAstro("https://astro.build");
var $$PostItem = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PostItem;
	const { item, targetUrl, timeData } = Astro.props;
	const title = item.data.title;
	return renderTemplate`${maybeRenderHead($$result)}<article class="timeline-item post-item col-span-4 md:col-span-8"><div class="title"><a${addAttribute(targetUrl, "href")}><h2>${title}</h2></a>${timeData && renderTemplate`${renderComponent($$result, "TimeDisplay", $$TimeDisplay, { "timeData": timeData })}`}</div><a${addAttribute(targetUrl, "href")}>${item.thumbnail && renderTemplate`<div class="thumb-wrap">${renderComponent($$result, "GlobalImage", $$GlobalImage, {
		"src": item.thumbnail,
		"alt": title,
		"imgStyle": {
			width: "100%",
			height: "100%",
			objectFit: "cover"
		}
	})}</div>`}</a><div class="meta"><a${addAttribute(targetUrl, "href")}>${item.excerpt && renderTemplate`<p class="excerpt">${item.excerpt}</p>`}</a></div></article>`;
}, "/Users/hanel/Desktop/☘️/Mago Cluster Web/src/components/timeline/PostItem.astro", void 0);
//#endregion
//#region src/components/blocks/VideoPlayer.astro
createAstro("https://astro.build");
var $$VideoPlayer = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$VideoPlayer;
	const props = Astro.props;
	function extractRawUrl(input) {
		if (!input) return "";
		if (typeof input === "string") return input;
		if (typeof input === "object") {
			if (typeof input.link === "string") return input.link;
			if (typeof input.url === "string") return input.url;
			if (typeof input.value === "string") return input.value;
			for (const key of Object.keys(input)) {
				const found = extractRawUrl(input[key]);
				if (found && typeof found === "string" && (found.includes("youtube") || found.includes("youtu.be") || found.includes("vimeo") || found.includes("drive.google.com") || found.startsWith("http"))) return found;
			}
		}
		return "";
	}
	const rawUrl = extractRawUrl(props.link) || extractRawUrl(props);
	function getEmbedUrl(inputUrl) {
		if (!inputUrl) return "";
		const cleanUrl = inputUrl.trim();
		const ytMatch = cleanUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
		if (ytMatch && ytMatch[1]) return `https://www.youtube.com/embed/${ytMatch[1]}`;
		const vimeoMatch = cleanUrl.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/);
		if (vimeoMatch && vimeoMatch[1]) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
		const driveMatch = cleanUrl.match(/drive\.google\.com\/file\/d\/([^\/\?]+)/);
		if (driveMatch && driveMatch[1]) return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
		if (cleanUrl.includes("drive.google.com") && cleanUrl.includes("/view")) return cleanUrl.replace(/\/view.*$/, "/preview");
		if (cleanUrl.startsWith("http://") || cleanUrl.startsWith("https://")) return cleanUrl;
		return "";
	}
	const embedUrl = getEmbedUrl(rawUrl);
	const rawSize = props.size ?? "100%";
	const containerWidth = typeof rawSize === "number" ? `${rawSize}%` : rawSize;
	return renderTemplate`${maybeRenderHead($$result)}<article class="video-player"${addAttribute(`width: ${containerWidth};`, "style")} data-astro-cid-a32ibcco>${embedUrl ? renderTemplate`<div class="video-container" data-astro-cid-a32ibcco><iframe${addAttribute(embedUrl, "src")} title="Video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen data-astro-cid-a32ibcco></iframe></div>` : renderTemplate`<div class="error-msg" data-astro-cid-a32ibcco>⚠️ Please enter a valid video URL. (Input was: ${String(rawUrl || "empty")})</div>`}</article>`;
}, "/Users/hanel/Desktop/☘️/Mago Cluster Web/src/components/blocks/VideoPlayer.astro", void 0);
//#endregion
//#region src/components/timeline/WorkItem.astro
createAstro("https://astro.build");
var $$WorkItem = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$WorkItem;
	const { item, targetUrl, timeData } = Astro.props;
	const title = item.data.title;
	const videoData = item.video;
	return renderTemplate`${maybeRenderHead($$result)}<article class="timeline-item work-item col-span-4 md:col-span-12" data-astro-cid-kbs2szqr><div class="media-container" data-astro-cid-kbs2szqr><a${addAttribute(targetUrl, "href")} data-astro-cid-kbs2szqr>${videoData ? renderTemplate`<div class="media-wrap video-wrap" data-astro-cid-kbs2szqr>${videoData.isDirectFile ? renderTemplate`<video${addAttribute(videoData.url, "src")} autoplay loop muted playsinline data-astro-cid-kbs2szqr></video>` : videoData.isEmbed ? renderTemplate`<iframe${addAttribute(videoData.url, "src")} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen data-astro-cid-kbs2szqr></iframe>` : renderTemplate`${renderComponent($$result, "VideoPlayer", $$VideoPlayer, {
		...videoData,
		"data-astro-cid-kbs2szqr": true
	})}`}</div>` : item.thumbnail ? renderTemplate`<div class="media-wrap thumb-wrap" data-astro-cid-kbs2szqr>${renderComponent($$result, "GlobalImage", $$GlobalImage, {
		"src": item.thumbnail,
		"alt": title,
		"imgStyle": {
			width: "100%",
			height: "100%"
		},
		"data-astro-cid-kbs2szqr": true
	})}</div>` : item.excerpt ? renderTemplate`<div class="text-fallback-wrap" data-astro-cid-kbs2szqr><p class="excerpt" data-astro-cid-kbs2szqr>${item.excerpt}</p></div>` : null}</a></div><div class="title" data-astro-cid-kbs2szqr><a${addAttribute(targetUrl, "href")} data-astro-cid-kbs2szqr><h2 data-astro-cid-kbs2szqr>${title}</h2></a><a${addAttribute(targetUrl, "href")} data-astro-cid-kbs2szqr>${timeData && renderTemplate`${renderComponent($$result, "TimeDisplay", $$TimeDisplay, {
		"timeData": timeData,
		"data-astro-cid-kbs2szqr": true
	})}`}</a></div></article>`;
}, "/Users/hanel/Desktop/☘️/Mago Cluster Web/src/components/timeline/WorkItem.astro", void 0);
//#endregion
//#region src/components/timeline/ScrapItem.astro
createAstro("https://astro.build");
var $$ScrapItem = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ScrapItem;
	const { item, targetUrl, timeData } = Astro.props;
	const title = item.data.title;
	return renderTemplate`${maybeRenderHead($$result)}<article class="timeline-item scrap-item col-span-4 md:col-span-3" data-astro-cid-lxr2y26l><div class="title" data-astro-cid-lxr2y26l><a${addAttribute(targetUrl, "href")} data-astro-cid-lxr2y26l><h2 data-astro-cid-lxr2y26l>${title}</h2></a>${timeData && renderTemplate`${renderComponent($$result, "TimeDisplay", $$TimeDisplay, {
		"timeData": timeData,
		"data-astro-cid-lxr2y26l": true
	})}`}</div><a${addAttribute(targetUrl, "href")} data-astro-cid-lxr2y26l>${item.thumbnail && renderTemplate`<div class="thumb-wrap" data-astro-cid-lxr2y26l><a${addAttribute(targetUrl, "href")} data-astro-cid-lxr2y26l>${renderComponent($$result, "GlobalImage", $$GlobalImage, {
		"src": item.thumbnail,
		"alt": title,
		"imgStyle": {
			width: "100%",
			height: "100%",
			objectFit: "cover"
		},
		"data-astro-cid-lxr2y26l": true
	})}</a></div>`}</a><a${addAttribute(targetUrl, "href")} data-astro-cid-lxr2y26l>${item.excerpt && renderTemplate`<p class="excerpt" data-astro-cid-lxr2y26l>${item.excerpt}</p>`}</a></article>`;
}, "/Users/hanel/Desktop/☘️/Mago Cluster Web/src/components/timeline/ScrapItem.astro", void 0);
//#endregion
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const posts = await getCollection("posts");
	const works = await getCollection("works");
	const archives = await getCollection("archives");
	const scraps = await getCollection("scraps");
	function getSortDate(data) {
		let dateString = null;
		const displayTime = data.displayTime;
		if (displayTime) {
			if (displayTime.discriminant === "date" && displayTime.value?.value) dateString = displayTime.value.value;
			else if (displayTime.discriminant === "year" && displayTime.value?.value) dateString = `${displayTime.value.value}-01-01`;
			else if (displayTime.discriminant === "time") {
				const timeData = displayTime.value;
				if (timeData?.discriminant === false && timeData.value?.date) dateString = timeData.value.date;
			}
		}
		const finalString = dateString || data.publishDate;
		const parsedDate = new Date(finalString);
		return isNaN(parsedDate.getTime()) ? /* @__PURE__ */ new Date() : parsedDate;
	}
	function extractFirstVideo(data, body) {
		const blocks = data.blocks || [];
		for (const block of blocks) {
			if (!block.value) continue;
			if (block.discriminant === "video") return block.value;
		}
		if (body) {
			const videoTagMatch = body.match(/<video[^>]*src=["'](.*?)["']/i);
			if (videoTagMatch && videoTagMatch[1]) return {
				url: videoTagMatch[1],
				isDirectFile: true
			};
			const iframeMatch = body.match(/<iframe[^>]*src=["'](.*?)["']/i);
			if (iframeMatch && iframeMatch[1]) return {
				url: iframeMatch[1],
				isEmbed: true
			};
			const videoUrlMatch = body.match(/(https?:\/\/[\S]+\.(?:mp4|webm|ogv))/i);
			if (videoUrlMatch && videoUrlMatch[1]) return {
				url: videoUrlMatch[1],
				isDirectFile: true
			};
		}
		return null;
	}
	function extractFirstImage(data, body) {
		if (data.coverImage) return data.coverImage;
		const blocks = data.blocks || [];
		for (const block of blocks) {
			if (!block.value) continue;
			if (block.discriminant === "image" && block.value.image) return block.value.image;
			if ((block.discriminant === "rowImages" || block.discriminant === "columnImages") && block.value.images?.length > 0) {
				if (block.value.images[0]?.image) return block.value.images[0].image;
			}
		}
		if (body) {
			const mdImageMatch = body.match(/!\[.*?\]\((.*?)\)/);
			if (mdImageMatch && mdImageMatch[1]) return mdImageMatch[1];
			const htmlImageMatch = body.match(/<img.*?src=["'](.*?)["']/);
			if (htmlImageMatch && htmlImageMatch[1]) return htmlImageMatch[1];
		}
		return null;
	}
	function extractExcerpt(body) {
		if (!body) return "";
		const plainText = body.replace(/<[^>]*>?/gm, "").replace(/[#*_[\]>]/g, "").replace(/\n{3,}/g, "\n\n").trim();
		return plainText.length > 300 ? plainText.substring(0, 300) + "..." : plainText;
	}
	const allItems = [
		...posts.map((p) => ({
			...p,
			collectionType: "posts"
		})),
		...works.map((w) => ({
			...w,
			collectionType: "works"
		})),
		...archives.map((a) => ({
			...a,
			collectionType: "archives"
		})),
		...scraps.map((s) => ({
			...s,
			collectionType: "scraps"
		}))
	].map((item) => ({
		...item,
		sortDate: getSortDate(item.data),
		video: extractFirstVideo(item.data, item.body),
		thumbnail: extractFirstImage(item.data, item.body),
		excerpt: extractExcerpt(item.body)
	}));
	allItems.sort((a, b) => b.sortDate.getTime() - a.sortDate.getTime());
	const NUM_COLUMNS = 3;
	const columns = Array.from({ length: NUM_COLUMNS }, () => []);
	allItems.forEach((item, index) => {
		columns[index % NUM_COLUMNS].push(item);
	});
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main id="Content"><div class="timeline-masonry">${columns.map((colItems) => renderTemplate`<div class="masonry-column">${colItems.map((item) => {
		const rawId = item.id;
		const cleanSlug = item.slug || rawId.replace(/\/index$/, "").replace(/\.(mdoc|md|mdx)$/, "").toLowerCase().trim().replace(/\s+/g, "-");
		const targetUrl = `/${item.collectionType}/${cleanSlug}`;
		const timeData = item.data.displayTime || null;
		switch (item.collectionType) {
			case "posts": return renderTemplate`${renderComponent($$result, "PostItem", $$PostItem, {
				"item": item,
				"targetUrl": targetUrl,
				"timeData": timeData
			})}`;
			case "works": return renderTemplate`${renderComponent($$result, "WorkItem", $$WorkItem, {
				"item": item,
				"targetUrl": targetUrl,
				"timeData": timeData
			})}`;
			case "scraps": return renderTemplate`${renderComponent($$result, "ScrapItem", $$ScrapItem, {
				"item": item,
				"targetUrl": targetUrl,
				"timeData": timeData
			})}`;
			default: return null;
		}
	})}</div>`)}<div id="timeline-modal" class="modal-overlay" aria-hidden="false"><div class="modal-window" role="dialog" aria-modal="true"><button type="button" id="modal-close-btn" class="modal-close-btn" aria-label="닫기">&times;</button><div id="modal-body" class="modal-body">REVOLUTION<br>IS<br>NOW</div></div></div></div></main>` })}${renderScript($$result, "/Users/hanel/Desktop/☘️/Mago Cluster Web/src/pages/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/hanel/Desktop/☘️/Mago Cluster Web/src/pages/index.astro", void 0);
var $$file = "/Users/hanel/Desktop/☘️/Mago Cluster Web/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
