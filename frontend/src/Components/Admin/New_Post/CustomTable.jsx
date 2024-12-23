// CustomTable.js
import { Table } from '@tiptap/extension-table';

const CustomTable = Table.extend({
    addAttributes() {
      return {
        ...this.parent?.(),
        class: {
          default: null,
          parseHTML: (element) => element.getAttribute('class'),
          renderHTML: (attributes) => {
            return {
              class: attributes.class,
            };
          },
        },
      };
    },
  });

export default CustomTable;
