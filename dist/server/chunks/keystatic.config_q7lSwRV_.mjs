import { createElement } from "react";
import { collection, config, fields, singleton } from "@keystatic/core";
import { block } from "@keystatic/core/content-components";
//#region src/keystatic/components/customBlocks.tsx
var gridSpanField$1 = fields.select({
	label: "Block Width (Grid Span)",
	options: [
		{
			label: "Full Width (12/12)",
			value: "12"
		},
		{
			label: "11 Width (11/12)",
			value: "11"
		},
		{
			label: "10 Width (10/12)",
			value: "10"
		},
		{
			label: "9 Width (9/12)",
			value: "9"
		},
		{
			label: "8 Width (8/12)",
			value: "8"
		},
		{
			label: "7 Width (7/12)",
			value: "7"
		},
		{
			label: "1/2 Width (6/12)",
			value: "6"
		},
		{
			label: "5 Width (5/12)",
			value: "5"
		},
		{
			label: "1/3 Width (4/12)",
			value: "4"
		},
		{
			label: "1/4 Width (3/12)",
			value: "3"
		},
		{
			label: "1/6 Width (2/12)",
			value: "2"
		},
		{
			label: "1 Width (1/12)",
			value: "1"
		}
	],
	defaultValue: "12"
});
var customBlocks = fields.blocks({
	markdoc: {
		label: "📄 Markdoc Content Position",
		schema: fields.empty()
	},
	video: {
		label: "🎬 Video Player",
		schema: fields.object({
			gridSpan: gridSpanField$1,
			link: fields.text({
				label: "Video URL",
				description: "YouTube, Vimeo, 또는 Google Drive 공유 링크를 입력하세요."
			})
		})
	},
	image: {
		label: "🖼️ Image With Link",
		schema: fields.object({
			gridSpan: gridSpanField$1,
			image: fields.image({
				label: "Image",
				directory: "src/assets/images/blocks",
				publicPath: "../../assets/images/blocks/"
			}),
			link: fields.url({ label: "Link URL (Optional)" }),
			alt: fields.text({ label: "Alt Text (Optional)" })
		})
	},
	columnImages: {
		label: "🗂️ Column Images",
		schema: fields.object({
			gridSpan: gridSpanField$1,
			scrollable: fields.conditional(fields.checkbox({
				label: "Enable Vertical Scroll & Fixed Height",
				description: "체크하면 컨테이너 높이를 지정하고 수직 스크롤을 활성화합니다."
			}), {
				false: fields.empty(),
				true: fields.object({ containerHeight: fields.text({
					label: "Container Height",
					description: "예: 400px, 50vh"
				}) })
			}),
			images: fields.array(fields.object({
				image: fields.image({
					label: "Image",
					directory: "src/assets/images/blocks",
					publicPath: "../../assets/images/blocks/"
				}),
				alt: fields.text({ label: "Alt & Caption" }),
				caption: fields.checkbox({ label: "Show alt text as a Caption" }),
				link: fields.url({ label: "Link URL (Optional)" })
			}), {
				label: "Images",
				itemLabel: (props) => props.fields.alt.value || "Image"
			})
		})
	},
	rowImages: {
		label: "🎞️ Row Images",
		schema: fields.object({
			gridSpan: gridSpanField$1,
			wrapMode: fields.select({
				label: "Row Layout Mode",
				options: [
					{
						label: "1. Wrap (줄바꿈 허용)",
						value: "wrap"
					},
					{
						label: "2. No-wrap + 컨테이너 폭에 맞추기 (균등 분할)",
						value: "fit"
					},
					{
						label: "3. No-wrap + 원본/지정 크기 유지 + 가로 스크롤",
						value: "scroll"
					}
				],
				defaultValue: "wrap"
			}),
			alignItems: fields.select({
				label: "Vertical Alignment (세로 정렬)",
				options: [
					{
						label: "Stretch (높이 채우기 / 동일 맞춤)",
						value: "stretch"
					},
					{
						label: "Top (상단 정렬)",
						value: "flex-start"
					},
					{
						label: "Center (중앙 정렬)",
						value: "center"
					},
					{
						label: "Bottom (하단 정렬)",
						value: "flex-end"
					},
					{
						label: "Baseline (글자 기준선 정렬)",
						value: "baseline"
					}
				],
				defaultValue: "stretch"
			}),
			images: fields.array(fields.object({
				image: fields.image({
					label: "Image",
					directory: "src/assets/images/blocks",
					publicPath: "../../assets/images/blocks/"
				}),
				alt: fields.text({ label: "Alt & Caption" }),
				caption: fields.checkbox({ label: "Show alt text as a Caption" }),
				link: fields.url({ label: "Link URL (Optional)" }),
				width: fields.text({ label: "Width (Optional, e.g. 200px)" }),
				height: fields.text({ label: "Height (Optional, e.g. 150px)" })
			}), {
				label: "Images",
				itemLabel: (props) => props.fields.alt.value || "Image"
			})
		})
	},
	dynamicList: {
		label: "🔄 Dynamic List",
		schema: fields.object({
			gridSpan: gridSpanField$1,
			collectionType: fields.select({
				label: "Select Collection",
				options: [
					{
						label: "Posts",
						value: "posts"
					},
					{
						label: "Works",
						value: "works"
					},
					{
						label: "Archives",
						value: "archives"
					}
				],
				defaultValue: "posts"
			}),
			limit: fields.integer({
				label: "Item Limit",
				defaultValue: 3
			})
		})
	},
	manualList: {
		label: "📝 Manual List",
		schema: fields.object({
			gridSpan: gridSpanField$1,
			title: fields.text({ label: "List Title" }),
			items: fields.array(fields.object({
				title: fields.text({ label: "Item Title" }),
				description: fields.text({
					label: "Description",
					multiline: true
				})
			}), {
				label: "List Items",
				itemLabel: (props) => props.fields.title.value || "Item"
			})
		})
	},
	textBlock: {
		label: "텍스트 블록",
		schema: fields.object({
			gridSpan: gridSpanField$1,
			title: fields.text({ label: "Block Title (Optional)" }),
			content: fields.text({
				label: "Content",
				multiline: true
			})
		})
	}
}, { label: "Dynamic Content Blocks" });
//#endregion
//#region src/keystatic/components/glob/TimeFields.ts
var publishDateField = fields.date({
	label: "System Date (For Sorting)",
	description: "웹사이트 목록에서 글을 정렬할 때 기준이 되는 시스템 날짜입니다.",
	validation: { isRequired: true },
	defaultValue: (/* @__PURE__ */ new Date(Date.now() - (/* @__PURE__ */ new Date()).getTimezoneOffset() * 6e4)).toISOString().slice(0, 10)
});
var displayTimeField = fields.conditional(fields.select({
	label: "Display Time Format",
	description: "실제 화면에 표시될 시간 형식을 선택하세요.",
	options: [
		{
			label: "Date",
			value: "date"
		},
		{
			label: "Year",
			value: "year"
		},
		{
			label: "Time Period",
			value: "time"
		}
	],
	defaultValue: "date"
}), {
	date: fields.object({
		value: fields.date({
			label: "Date",
			defaultValue: (/* @__PURE__ */ new Date(Date.now() - (/* @__PURE__ */ new Date()).getTimezoneOffset() * 6e4)).toISOString().slice(0, 10)
		}),
		time: fields.text({ label: "Time (Optional)" })
	}),
	year: fields.object({ value: fields.text({ label: "Year" }) }),
	time: fields.conditional(fields.checkbox({ label: "Custom Date String" }), {
		true: fields.object({
			time: fields.text({ label: "Time (e.g., 11:00 AM - 7:00 PM)" }),
			dates: fields.text({ label: "Dates String (e.g. 2024.10 - 2025.01)" })
		}),
		false: fields.object({
			time: fields.text({ label: "Time (e.g., 11:00 AM - 7:00 PM)" }),
			date: fields.date({
				label: "Start Date",
				defaultValue: (/* @__PURE__ */ new Date(Date.now() - (/* @__PURE__ */ new Date()).getTimezoneOffset() * 6e4)).toISOString().slice(0, 10)
			}),
			enddate: fields.date({ label: "End Date" })
		})
	})
});
//#endregion
//#region src/keystatic/components/glob/PeopleSelectFields.ts
var peopleField = fields.blocks({
	list: {
		label: "From List",
		itemLabel: (props) => props.value ? `People: ${props.value}` : "Select people who are relevant to this post",
		schema: fields.relationship({
			label: "Select People",
			description: "Select people who are relevant to this post.",
			collection: "people"
		})
	},
	text: {
		label: "By Text",
		itemLabel: (props) => props.fields?.name?.value || "By Text (No name entered)",
		schema: fields.object({
			name: fields.text({
				label: "Name",
				validation: {
					length: { min: 1 },
					isRequired: true
				}
			}),
			link: fields.text({
				label: "Link (Optional)",
				description: "Link URL to the person's page"
			})
		})
	}
}, {
	label: "People",
	description: "Select people who are relevant to this post."
});
//#endregion
//#region src/keystatic/contentFields.ts
/**
* Markdoc components are embedded inside the independent Markdoc editor.
* They are intentionally separate from the page-level ordered blocks below.
*/
function createMarkdocComponents(collectionName) {
	const imageDirectory = `public/images/${collectionName}`;
	const publicPath = `/images/${collectionName}/`;
	return {
		CustomImage: block({
			label: "Custom Image",
			schema: {
				file: fields.image({
					label: "Image",
					directory: imageDirectory,
					publicPath
				}),
				displayType: fields.select({
					label: "Display Style",
					description: "이미지 출력 방식을 선택하세요.",
					options: [{
						label: "Full Width (100%)",
						value: "full"
					}, {
						label: "Inline / Natural Size",
						value: "inline"
					}],
					defaultValue: "full"
				}),
				link: fields.text({ label: "Link URL (Optional)" }),
				caption: fields.text({ label: "Caption (Optional)" })
			},
			ContentView: (props) => {
				const fileData = props.value?.file;
				let imageSrc = typeof fileData === "string" ? fileData : "";
				if (fileData?.data instanceof Uint8Array) imageSrc = URL.createObjectURL(new Blob([fileData.data]));
				else if (fileData?.filename) imageSrc = `${publicPath}${fileData.filename}`;
				return createElement("div", { style: {
					padding: "8px",
					border: "1px dashed #ccc",
					marginBottom: "8px"
				} }, createElement("div", null, `이미지 출력 형태: ${props.value?.displayType ?? "full"}`), imageSrc ? createElement("img", {
					src: imageSrc,
					alt: "",
					style: {
						maxWidth: "100%",
						maxHeight: "150px"
					}
				}) : null, props.value?.caption ? createElement("div", null, props.value.caption) : null);
			}
		}),
		ImageGallery: block({
			label: "Image Gallery (Flex)",
			schema: {
				images: fields.array(fields.object({
					file: fields.image({
						label: "Image",
						directory: imageDirectory,
						publicPath
					}),
					link: fields.text({ label: "Link URL" })
				}), {
					label: "Images",
					itemLabel: (props) => props.value?.file?.filename || "Image Item"
				}),
				align: fields.select({
					label: "Gallery Alignment",
					options: [
						{
							label: "Left",
							value: "left"
						},
						{
							label: "Center",
							value: "center"
						},
						{
							label: "Right",
							value: "right"
						}
					],
					defaultValue: "center"
				}),
				flexAlign: fields.select({
					label: "Flex Alignment",
					options: [
						{
							label: "Center",
							value: "center"
						},
						{
							label: "Flex Start",
							value: "flex-start"
						},
						{
							label: "Flex End",
							value: "flex-end"
						},
						{
							label: "Space Between",
							value: "space-between"
						}
					],
					defaultValue: "center"
				}),
				direction: fields.select({
					label: "Flex Direction",
					options: [{
						label: "Row",
						value: "row"
					}, {
						label: "Column",
						value: "column"
					}],
					defaultValue: "row"
				}),
				displayType: fields.select({
					label: "Display Style",
					options: [{
						label: "Block",
						value: "block"
					}, {
						label: "Inline",
						value: "inline"
					}],
					defaultValue: "block"
				}),
				widthType: fields.select({
					label: "Width Type",
					options: [{
						label: "Full Width (100%)",
						value: "full"
					}, {
						label: "Custom Width",
						value: "custom"
					}],
					defaultValue: "full"
				}),
				customWidth: fields.text({ label: "Custom Width Value" })
			},
			ContentView: (props) => {
				return createElement("div", { style: {
					padding: "8px",
					border: "1px dashed #888"
				} }, createElement("div", null, `Flex 이미지 갤러리 (${props.value?.images?.length ?? 0}개 이미지)`), createElement("div", null, `정렬: ${props.value?.align ?? "center"}`), createElement("div", null, `방향: ${props.value?.direction ?? "row"}`));
			}
		}),
		VideoPlayer: block({
			label: "Video Player (YouTube / Drive / Vimeo)",
			schema: {
				url: fields.text({
					label: "Video URL",
					description: "YouTube, Google Drive 또는 Vimeo 주소를 입력하세요.",
					validation: { isRequired: true }
				}),
				displayType: fields.select({
					label: "Display Style",
					options: [{
						label: "Block",
						value: "block"
					}, {
						label: "Inline",
						value: "inline"
					}],
					defaultValue: "block"
				}),
				widthType: fields.select({
					label: "Width Type",
					options: [{
						label: "Full Width",
						value: "full"
					}, {
						label: "Custom Width",
						value: "custom"
					}],
					defaultValue: "full"
				}),
				customWidth: fields.text({ label: "Custom Width Value" })
			},
			ContentView: (props) => createElement("div", { style: {
				padding: "8px",
				border: "1px dashed #666"
			} }, createElement("div", null, "비디오 플레이어"), createElement("div", { style: {
				fontSize: "0.85rem",
				color: "#888"
			} }, props.value?.url || "URL을 입력하세요"))
		})
	};
}
//#endregion
//#region src/keystatic/components/glob/commonFields.ts
var gridSpanField = fields.select({
	label: "Block Width (Grid Span)",
	options: [
		{
			label: "Full Width (12/12)",
			value: "12"
		},
		{
			label: "11 Width (11/12)",
			value: "11"
		},
		{
			label: "10 Width (10/12)",
			value: "10"
		},
		{
			label: "9 Width (9/12)",
			value: "9"
		},
		{
			label: "8 Width (8/12)",
			value: "8"
		},
		{
			label: "7 Width (7/12)",
			value: "7"
		},
		{
			label: "1/2 Width (6/12)",
			value: "6"
		},
		{
			label: "5 Width (5/12)",
			value: "5"
		},
		{
			label: "1/3 Width (4/12)",
			value: "4"
		},
		{
			label: "1/4 Width (3/12)",
			value: "3"
		},
		{
			label: "1/6 Width (2/12)",
			value: "2"
		},
		{
			label: "1 Width (1/12)",
			value: "1"
		}
	],
	defaultValue: "12"
});
var tagsField = fields.array(fields.relationship({
	label: "Category and tags",
	collection: "tags",
	validation: { isRequired: true }
}), {
	label: "Tags",
	itemLabel: (props) => props.value ?? "Select a category or tag"
});
function createContentField(collectionName, imageDirectory, imagePublicPath) {
	return fields.markdoc({
		label: "Markdoc Content",
		options: { image: {
			directory: imageDirectory,
			publicPath: imagePublicPath
		} },
		components: createMarkdocComponents(collectionName)
	});
}
var contentDivision = fields.checkbox({ label: "Unset Markdoc Content Division" });
var markdocSizeField = fields.conditional(fields.checkbox({ label: "Custom Markdoc Size" }), {
	true: fields.object({
		gridSpan: gridSpanField,
		height: fields.text({ label: "Height (Optional, e.g., max-content, 500px)" }),
		margin: fields.checkbox({ label: "Center the content (Center Align)" })
	}),
	false: fields.empty()
});
//#endregion
//#region src/keystatic/collections/archives.ts
var archives = collection({
	label: "archives",
	slugField: "slug",
	path: "src/content/archives/*",
	format: { contentField: "content" },
	columns: ["title", "publishDate"],
	schema: {
		title: fields.text({
			label: "Title",
			validation: { isRequired: true }
		}),
		secondTitle: fields.text({ label: "Second Title (Optional)" }),
		slug: fields.text({
			label: "URL Slug (파일명/주소)",
			description: "URL에 사용될 고유 영문 주소 (띄어쓰기 대신 하이픈(-) 사용. 예: my-test-post)"
		}),
		publishDate: publishDateField,
		displayTime: displayTimeField,
		people: peopleField,
		tags: tagsField,
		content: createContentField("posts", "src/assets/images/posts", "../../assets/images/posts/"),
		markdocSize: markdocSizeField,
		contentDivision,
		blocks: customBlocks
	}
});
//#endregion
//#region src/keystatic/collections/people.ts
var people = collection({
	label: "People",
	slugField: "slug",
	path: "src/content/people/*",
	format: { contentField: "content" },
	columns: ["name"],
	schema: {
		name: fields.text({
			label: "Name",
			validation: { isRequired: true }
		}),
		slug: fields.text({
			label: "URL Slug (파일명/주소)",
			description: "URL에 사용될 고유 영문 주소 (띄어쓰기 대신 하이픈(-) 사용. 예: yi-sang)"
		}),
		tags: tagsField,
		content: createContentField("people", "src/assets/images/people", "../../assets/images/people/"),
		markdocSize: markdocSizeField,
		blocks: customBlocks
	}
});
//#endregion
//#region src/keystatic/collections/posts.ts
var posts = collection({
	label: "Posts",
	slugField: "slug",
	path: "src/content/posts/*",
	format: { contentField: "content" },
	columns: ["title", "publishDate"],
	schema: {
		title: fields.text({
			label: "Title",
			validation: { isRequired: true }
		}),
		secondTitle: fields.text({ label: "Second Title (Optional)" }),
		slug: fields.text({
			label: "URL Slug (파일명/주소)",
			description: "URL에 사용될 고유 영문 주소 (띄어쓰기 대신 하이픈(-) 사용. 예: my-test-post)"
		}),
		publishDate: publishDateField,
		displayTime: displayTimeField,
		people: peopleField,
		tags: tagsField,
		content: createContentField("posts", "src/assets/images/posts", "../../assets/images/posts/"),
		markdocSize: markdocSizeField,
		contentDivision,
		blocks: customBlocks
	}
});
//#endregion
//#region src/keystatic/collections/scraps.tsx
var scraps = collection({
	label: "Scraps",
	slugField: "slug",
	path: "src/content/scraps/*",
	format: { contentField: "content" },
	columns: ["title", "publishDate"],
	schema: {
		title: fields.text({
			label: "Title",
			validation: { isRequired: true }
		}),
		secondTitle: fields.text({ label: "Second Title (Optional)" }),
		slug: fields.text({
			label: "URL Slug (파일명/주소)",
			description: "URL에 사용될 고유 영문 주소 (띄어쓰기 대신 하이픈(-) 사용. 예: my-test-post)"
		}),
		publishDate: publishDateField,
		displayTime: displayTimeField,
		people: peopleField,
		tags: tagsField,
		content: createContentField("scraps", "src/assets/images/scraps", "../../assets/images/scraps/"),
		markdocSize: markdocSizeField,
		blocks: customBlocks
	}
});
//#endregion
//#region src/keystatic/collections/works.ts
var works = collection({
	label: "Works",
	slugField: "slug",
	path: "src/content/works/*",
	format: { contentField: "content" },
	columns: ["title", "publishDate"],
	schema: {
		title: fields.text({
			label: "Title",
			validation: { isRequired: true }
		}),
		secondTitle: fields.text({ label: "Second Title (Optional)" }),
		slug: fields.text({
			label: "URL Slug (파일명/주소)",
			description: "URL에 사용될 고유 영문 주소 (띄어쓰기 대신 하이픈(-) 사용. 예: my-test-post)"
		}),
		publishDate: publishDateField,
		displayTime: displayTimeField,
		people: peopleField,
		tags: tagsField,
		content: createContentField("posts", "src/assets/images/posts", "../../assets/images/posts/"),
		markdocSize: markdocSizeField,
		contentDivision,
		blocks: customBlocks
	}
});
//#endregion
//#region src/keystatic/collections/tags.ts
var tags = collection({
	label: "Tags / Categories",
	slugField: "name",
	path: "src/content/tags/*",
	columns: ["name", "description"],
	schema: {
		name: fields.slug({ name: {
			label: "Tag Name",
			description: "Please use English letters only (no spaces or special characters)."
		} }),
		description: fields.text({ label: "Description" })
	}
});
//#endregion
//#region src/keystatic/singletons/home.ts
var home = singleton({
	label: "Home",
	path: "content/singletons/home",
	schema: { description: fields.text({ label: "Description" }) }
});
//#endregion
//#region src/keystatic/singletons/settings.ts
var settings = singleton({
	label: "Settings",
	path: "content/singletons/settings",
	schema: {
		title: fields.text({ label: "Website Title" }),
		description: fields.text({ label: "Website Description" }),
		favicon: fields.image({
			label: "Favicon",
			directory: "src/assets/favicon",
			publicPath: "../../src/assets/favicon"
		}),
		navigation: fields.array(fields.object({
			label: fields.text({ label: "Menu Name (e.g., About)" }),
			href: fields.text({ label: "Link URL (e.g., /about)" })
		}), {
			label: "Menu Items",
			itemLabel: (props) => props.fields.label.value || "New Menu"
		})
	}
});
//#endregion
//#region keystatic.config.ts
var keystatic_config_default = config({
	storage: { kind: "local" },
	ui: { navigation: {
		"The living": ["archives", "scraps"],
		"The dead": ["posts", "works"],
		"Sort": ["people", "tags"],
		"Settings": ["home", "settings"]
	} },
	collections: {
		archives,
		people,
		works,
		posts,
		scraps,
		tags
	},
	singletons: {
		home,
		settings
	}
});
//#endregion
export { keystatic_config_default as t };
