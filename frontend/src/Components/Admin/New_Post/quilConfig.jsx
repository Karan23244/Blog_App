import { Quill } from 'react-quill';

export default {
  modules: {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: { matchVisual: false },
    imageResize: {
      parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize'],
    },
  },
  formats: [
    'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 
    'list', 'bullet', 'indent', 'link', 'image', 'video'
  ],
};
