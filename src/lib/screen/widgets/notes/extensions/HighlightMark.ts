import { Mark, mergeAttributes } from '@tiptap/core';

export const createHighlight = (name: string, className: string) => {
	return Mark.create({
		name,
		addOptions() {
			return {
				HTMLAttributes: {}
			};
		},
		parseHTML() {
			return [
				{
					tag: `span.${className}`
				}
			];
		},
		renderHTML({ HTMLAttributes }) {
			return ['span', mergeAttributes(HTMLAttributes, { class: className }), 0];
		},
		addCommands() {
			return {
				setHighlight:
					() =>
					({ commands }) => {
						return commands.setMark(this.name);
					},
				unsetHighlight:
					() =>
					({ commands }) => {
						return commands.unsetMark(this.name);
					}
			};
		}
	});
};
