import { defineMarkdocConfig, nodes, component } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
  nodes: {
    image: {
      ...nodes.image,
      render: component('./src/components/GlobalImage.astro'),
    },
  },
  tags: {
    CustomImage: {
      render: component('./src/components/markdoc/CustomImage.astro'),
      attributes: {
        // file 속성은 객체가 아닌 String 문자열 경로로 넘어오므로 type: String으로 지정
        file: { type: String, required: true },
        displayType: { type: String, required: false, default: 'full' },
        link: { type: String, required: false },
        caption: { type: String, required: false },
      },
    },
    ImageGallery: {
      render: component('./src/components/markdoc/ImageGallery.astro'),
      attributes: {
        images: { type: Array, required: true },
        align: { type: String, required: false, default: 'center' },      // 갤러리 전체 정렬
        flexAlign: { type: String, required: false, default: 'center' },  // 갤러리 내부 요소 정렬
        displayType: { type: String, required: false, default: 'block' },
        widthType: { type: String, required: false, default: 'full' },
        customWidth: { type: String, required: false },
        direction: { type: String, required: false, default: 'row' },
      },
    },
    VideoPlayer: {
      render: component('./src/components/markdoc/VideoPlayer.astro'),
      attributes: {
        url: { type: String, required: false },
        link: { type: String, required: false },
        displayType: { type: String, required: false, default: 'block' },
        widthType: { type: String, required: false, default: 'full' },
        customWidth: { type: String, required: false },
      },
    },
    // VideoPlayer: {
    //   render: component('./src/components/VideoPlayer.astro'),
    //   attributes: {
    //     url: { type: String, required: false },
    //     link: { type: String, required: false },
    //     displayType: { type: String, required: false, default: 'block' },
    //     widthType: { type: String, required: false, default: 'full' },
    //     customWidth: { type: String, required: false },
    //   },
    // },
  },
});