import Heading from '@tiptap/extension-heading';
import { mergeAttributes } from '@tiptap/core';

export default Heading.extend({
	addAttributes() {
		return {
			...this.parent?.(),
			class: {
				default: null,
				renderHTML: (attributes) => {
					return {
						class: attributes.class
					};
				}
			}
		};
	},
	renderHTML({ node, HTMLAttributes }) {
		const level = node.attrs.level;
		const levelClassMap: Record<number, string> = {
			1: 'w-full bg-mist-note-border py-1 text-2xl font-bold text-mist-note-box uppercase font-title',
			2: 'text-lg font-semibold text-black',
			3: 'text-md font-semibold text-gray-700'
		};
		return [
			`h${level}`,
			mergeAttributes(HTMLAttributes, {
				class: levelClassMap[level] || ''
			}),
			0
		];
	}
});
