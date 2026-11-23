import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { _ as addAttribute, d as renderTemplate, h as maybeRenderHead, i as renderComponent } from "./server_D5nMgjVk.mjs";
import { t as createComponent } from "./compiler_BYPEd_ML.mjs";
import { i as renderScript, n as getCollection, r as getEntry, t as $$Layout } from "./Layout_DByewf4r.mjs";
//#region src/pages/sitemap.astro
var sitemap_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Sitemap,
	file: () => $$file,
	url: () => $$url
});
var $$Sitemap = createComponent(async ($$result, $$props, $$slots) => {
	const postsData = await getCollection("posts");
	const worksData = await getCollection("works");
	const artistsData = await getCollection("artists");
	function parseTimeField(timeField) {
		if (!timeField || !timeField.discriminant) return {
			timestamp: 0,
			display: ""
		};
		const type = timeField.discriminant;
		const data = timeField.value || {};
		let dateObj = /* @__PURE__ */ new Date(0);
		let display = "";
		if (type === "year") {
			const y = parseInt(data.value, 10);
			if (!isNaN(y)) {
				dateObj = new Date(y, 0, 1);
				display = String(y);
			}
		} else if (type === "date") {
			if (data.value) {
				dateObj = new Date(data.value);
				display = `${dateObj.getFullYear()}.${String(dateObj.getMonth() + 1).padStart(2, "0")}.${String(dateObj.getDate()).padStart(2, "0")}`;
			}
		} else if (type === "time") {
			const isCustom = data.discriminant === true;
			const subData = data.value || {};
			if (isCustom) {
				const match = subData.dates?.match(/\d{4}/);
				if (match) dateObj = new Date(parseInt(match[0], 10), 0, 1);
				display = subData.dates || "";
			} else if (subData.date) {
				dateObj = new Date(subData.date);
				const y = dateObj.getFullYear();
				const m = String(dateObj.getMonth() + 1).padStart(2, "0");
				const d = String(dateObj.getDate()).padStart(2, "0");
				let endDisplay = "";
				if (subData.enddate) {
					const eDate = new Date(subData.enddate);
					endDisplay = ` ~ ${eDate.getFullYear()}.${String(eDate.getMonth() + 1).padStart(2, "0")}.${String(eDate.getDate()).padStart(2, "0")}`;
				}
				display = `${y}.${m}.${d}${endDisplay}`;
			}
		}
		return {
			timestamp: dateObj.getTime(),
			display
		};
	}
	async function parseArtistsField(artistsField) {
		if (!artistsField || !Array.isArray(artistsField)) return "";
		return (await Promise.all(artistsField.map(async (item) => {
			if (item.discriminant === "list") {
				const slug = item.value;
				if (!slug) return null;
				return (await getEntry("artists", slug))?.data?.name || slug;
			} else if (item.discriminant === "text") return item.value?.name || "";
			return null;
		}))).filter(Boolean).join(", ");
	}
	const processedPosts = await Promise.all(postsData.map(async (post) => {
		const timeData = parseTimeField(post.data.time);
		const artistStr = await parseArtistsField(post.data.artists);
		return {
			id: post.id.replace(/\/index$/, ""),
			type: "post",
			title: post.data.title || "",
			artist: artistStr,
			timestamp: timeData.timestamp,
			displayDate: timeData.display,
			coverImage: post.data.coverImage?.src || ""
		};
	}));
	processedPosts.sort((a, b) => b.timestamp - a.timestamp);
	const processedWorks = await Promise.all(worksData.map(async (work) => {
		const timeData = parseTimeField(work.data.time);
		const artistStr = await parseArtistsField(work.data.artists);
		return {
			id: work.id.replace(/\/index$/, ""),
			type: "work",
			title: work.data.title || "",
			artist: artistStr,
			timestamp: timeData.timestamp,
			displayDate: timeData.display,
			coverImage: work.data.coverImage?.src || ""
		};
	}));
	processedWorks.sort((a, b) => b.timestamp - a.timestamp);
	const processedArtists = await Promise.all(artistsData.map(async (artist) => {
		return {
			id: artist.id.replace(/\/index$/, ""),
			type: "artist",
			name: artist.data.name || "",
			coverImage: artist.data.coverImage?.src || ""
		};
	}));
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-wjhs5gsu": true }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="index" data-astro-cid-wjhs5gsu><article class="collections-wrapper" data-astro-cid-wjhs5gsu>${processedPosts.length > 0 && renderTemplate`<div class="collection-list" data-section="posts" data-astro-cid-wjhs5gsu><h2 data-astro-cid-wjhs5gsu>Posts</h2><div class="sortable-table" data-astro-cid-wjhs5gsu><table data-astro-cid-wjhs5gsu><thead data-astro-cid-wjhs5gsu><tr data-astro-cid-wjhs5gsu><th data-type="string" data-astro-cid-wjhs5gsu>Title <span class="indicator" data-astro-cid-wjhs5gsu></span></th><th data-type="number" class="desc" data-astro-cid-wjhs5gsu>Date <span class="indicator" data-astro-cid-wjhs5gsu></span></th><th data-type="string" data-astro-cid-wjhs5gsu>Artist <span class="indicator" data-astro-cid-wjhs5gsu></span></th></tr></thead><tbody data-astro-cid-wjhs5gsu>${processedPosts.map((post) => renderTemplate`<tr data-astro-cid-wjhs5gsu><td${addAttribute(post.title, "data-value")} data-astro-cid-wjhs5gsu><a${addAttribute(`/${post.type}s/${post.id}`, "href")}${addAttribute(post.coverImage, "data-image")} data-astro-cid-wjhs5gsu>${post.title}</a></td><td${addAttribute(post.timestamp, "data-value")} data-astro-cid-wjhs5gsu>${post.displayDate}</td><td${addAttribute(post.artist, "data-value")} data-astro-cid-wjhs5gsu>${post.artist}</td></tr>`)}</tbody></table></div></div>`}${processedWorks.length > 0 && renderTemplate`<div class="collection-list" data-section="works" data-astro-cid-wjhs5gsu><h2 data-astro-cid-wjhs5gsu>Works</h2><div class="sortable-table" data-astro-cid-wjhs5gsu><table data-astro-cid-wjhs5gsu><thead data-astro-cid-wjhs5gsu><tr data-astro-cid-wjhs5gsu><th data-type="string" data-astro-cid-wjhs5gsu>Title <span class="indicator" data-astro-cid-wjhs5gsu></span></th><th data-type="number" class="desc" data-astro-cid-wjhs5gsu>Date <span class="indicator" data-astro-cid-wjhs5gsu></span></th><th data-type="string" data-astro-cid-wjhs5gsu>Artist <span class="indicator" data-astro-cid-wjhs5gsu></span></th></tr></thead><tbody data-astro-cid-wjhs5gsu>${processedWorks.map((work) => renderTemplate`<tr data-astro-cid-wjhs5gsu><td${addAttribute(work.title, "data-value")} data-astro-cid-wjhs5gsu><a${addAttribute(`/${work.type}s/${work.id}`, "href")}${addAttribute(work.coverImage, "data-image")} data-astro-cid-wjhs5gsu>${work.title}</a></td><td${addAttribute(work.timestamp, "data-value")} data-astro-cid-wjhs5gsu>${work.displayDate}</td><td${addAttribute(work.artist, "data-value")} data-astro-cid-wjhs5gsu>${work.artist}</td></tr>`)}</tbody></table></div></div>`}${processedArtists.length > 0 && renderTemplate`<div class="collection-list" data-section="artists" data-astro-cid-wjhs5gsu><h2 data-astro-cid-wjhs5gsu>Artists</h2><div class="sortable-table" data-astro-cid-wjhs5gsu><table data-astro-cid-wjhs5gsu><thead data-astro-cid-wjhs5gsu><tr data-astro-cid-wjhs5gsu><th data-type="string" data-astro-cid-wjhs5gsu>Name <span class="indicator" data-astro-cid-wjhs5gsu></span></th></tr></thead><tbody data-astro-cid-wjhs5gsu>${processedArtists.map((artist) => renderTemplate`<tr data-astro-cid-wjhs5gsu><td${addAttribute(artist.name, "data-value")} data-astro-cid-wjhs5gsu><a${addAttribute(`/${artist.type}s/${artist.id}`, "href")}${addAttribute(artist.coverImage, "data-image")} data-astro-cid-wjhs5gsu>${artist.name}</a></td></tr>`)}</tbody></table></div></div>`}</article><div class="preview-panel" data-astro-cid-wjhs5gsu><div id="preview-container" class="preview-empty" data-astro-cid-wjhs5gsu><img id="preview-img" src="" alt="Preview" data-astro-cid-wjhs5gsu></div></div><aside class="collection-filters" data-astro-cid-wjhs5gsu><div class="filters-header" data-astro-cid-wjhs5gsu><h3 data-astro-cid-wjhs5gsu>Filters</h3><button type="button" id="clear-filters" aria-label="Clear filters" data-astro-cid-wjhs5gsu><svg viewBox="0 -1.5 130 130" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-wjhs5gsu><g id="SVGRepo_bgCarrier" stroke-width="0" data-astro-cid-wjhs5gsu></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-wjhs5gsu></g><g id="SVGRepo_iconCarrier" data-astro-cid-wjhs5gsu> <g clip-path="url(#clip0)" data-astro-cid-wjhs5gsu> <path d="M62.3649 76.0626C51.1451 86.1072 40.1732 95.8365 29.311 105.687C23.0183 111.394 16.9509 117.348 10.6729 123.069C9.0008 124.632 7.07937 125.903 4.98785 126.828C3.95649 127.261 1.72933 126.828 1.22143 126.035C0.549397 124.982 0.748089 123.114 1.11261 121.74C1.37779 120.738 2.45753 119.908 3.27208 119.104C18.7627 103.852 34.2604 88.6091 49.7649 73.3765C51.5045 71.6681 53.2942 70.0117 55.293 68.1144C48.5175 60.6052 41.7314 53.3593 35.2529 45.844C24.9134 33.8442 14.7813 21.6659 4.56355 9.56215C4.19212 9.12226 3.87261 8.64079 3.49773 8.20091C1.70969 6.08722 0.449103 3.80904 2.48505 1.24507C4.00964 -0.674661 7.65428 -0.387934 10.1921 2.22366C16.5124 8.7258 22.6693 15.3855 28.7745 22.0963C39.9226 34.3429 50.9837 46.6692 62.092 58.9522C62.5675 59.399 63.0731 59.8124 63.6053 60.1895C72.1948 51.9798 80.6892 43.7969 89.2545 35.6841C99.1881 26.2803 109.157 16.9135 119.16 7.58361C122.912 4.07666 125.921 3.44455 128.224 5.49071C130.61 7.61046 130.388 11.1519 126.582 14.9489C116.293 25.2161 105.755 35.2339 95.2268 45.2629C87.2065 52.9054 79.0583 60.4164 70.5224 68.3992C77.4586 75.5733 84.0927 82.724 91.0479 89.5439C97.7284 96.0945 104.782 102.265 111.594 108.681C114.257 111.095 116.751 113.69 119.058 116.449C120.918 118.763 121.193 121.636 118.906 123.919C116.652 126.17 114.043 125.375 111.869 123.67C107.71 120.58 103.724 117.264 99.9275 113.736C88.3069 102.355 76.8913 90.7657 65.4012 79.2517C64.4925 78.3424 63.6243 77.3883 62.3649 76.0626Z" fill="#7b0513" data-astro-cid-wjhs5gsu></path> </g> <defs data-astro-cid-wjhs5gsu> <clipPath id="clip0" data-astro-cid-wjhs5gsu> <rect width="129" height="127" fill="white" transform="translate(0.777344)" data-astro-cid-wjhs5gsu></rect> </clipPath> </defs> </g></svg></button></div><label class="filter-label" data-astro-cid-wjhs5gsu><input type="checkbox" class="collection-filter-checkbox" value="posts" data-astro-cid-wjhs5gsu> Posts</label><label class="filter-label" data-astro-cid-wjhs5gsu><input type="checkbox" class="collection-filter-checkbox" value="works" data-astro-cid-wjhs5gsu> Works</label><label class="filter-label" data-astro-cid-wjhs5gsu><input type="checkbox" class="collection-filter-checkbox" value="artists" data-astro-cid-wjhs5gsu> Artists</label></aside></section>` })}${renderScript($$result, "/Users/hanel/Desktop/☘️/Mago Cluster Web/src/pages/sitemap.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/hanel/Desktop/☘️/Mago Cluster Web/src/pages/sitemap.astro", void 0);
var $$file = "/Users/hanel/Desktop/☘️/Mago Cluster Web/src/pages/sitemap.astro";
var $$url = "/sitemap";
//#endregion
//#region \0virtual:astro:page:src/pages/sitemap@_@astro
var page = () => sitemap_exports;
//#endregion
export { page };
