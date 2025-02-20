import { Mark, markInputRule, markPasteRule, mergeAttributes } from '@tiptap/core';

export interface MistHighlightOptions {
	/**
	 * HTML attributes to add to the mistHighlight element.
	 * @default {}
	 * @example { class: 'foo' }
	 */
	HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		mistHighlight: {
			/**
			 * Set a mistHighlight mark
			 * @param attributes The mistHighlight attributes
			 * @example editor.commands.setTag({ color: 'red' })
			 */
			setTag: (attributes?: { color: string }) => ReturnType;
			/**
			 * Toggle a mistHighlight mark
			 * @param attributes The mistHighlight attributes
			 * @example editor.commands.toggleTag({ color: 'red' })
			 */
			toggleTag: (attributes?: { color: string }) => ReturnType;
			/**
			 * Unset a mistHighlight mark
			 * @example editor.commands.unsetTag()
			 */
			unsetTag: () => ReturnType;
		};
	}
}

export const generalInputRegex = /(?:^|\s)(\{(?!\s+\{)((?:[^\}]+))\}(?!\s+\}))$/;
export const spectrumRegex = /:\d+}/;
export const statusRegex = /-\d+}/;

export const generalPasteRegex = /(?:^|\s)(\{(?!\s+\{)((?:[^\}]+))\}(?!\s+\}))$/g;
export const kindClassMap = {
	tag: 'bg-yellow-300',
	status: 'bg-green-300',
	spectrum: 'bg-red-300'
};

export const MistHighlight = Mark.create<MistHighlightOptions>({
	name: 'mistHighlight',

	addOptions() {
		return {
			HTMLAttributes: {}
		};
	},

	addAttributes() {
		return {
			kind: {
				default: 'tag',
				parseHTML: (element) => element.getAttribute('data-type') || 'tag',
				renderHTML: (attributes) => {
					return {
						'data-type': attributes.kind,
						class: kindClassMap[attributes.kind] + ''
					};
				}
			}
		};
	},

	parseHTML() {
		return [
			{
				tag: 'mark'
			}
		];
	},

	renderHTML({ HTMLAttributes }) {
		return ['mark', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
	},

	addCommands() {
		return {
			setTag:
				(attributes) =>
				({ commands }) => {
					return commands.setMark(this.name, attributes);
				},
			toggleTag:
				(attributes) =>
				({ commands }) => {
					return commands.toggleMark(this.name, attributes);
				},
			unsetTag:
				() =>
				({ commands }) => {
					return commands.unsetMark(this.name);
				}
		};
	},

	addKeyboardShortcuts() {
		return {
			'Mod-Shift-h': () => this.editor.commands.toggleTag()
		};
	},

	addInputRules() {
		return [
			markInputRule({
				find: generalInputRegex,
				type: this.type,
				getAttributes: (match) => {
					if (statusRegex.test(match[0])) {
						return {
							kind: 'status'
						};
					} else if (spectrumRegex.test(match[0])) {
						return {
							kind: 'spectrum'
						};
					} else {
						return {
							kind: 'tag'
						};
					}
				}
			})
		];
	},

	addPasteRules() {
		return [
			markPasteRule({
				find: generalPasteRegex,
				type: this.type,
				getAttributes: (match) => {
					if (statusRegex.test(match[0])) {
						return {
							kind: 'status'
						};
					} else if (spectrumRegex.test(match[0])) {
						return {
							kind: 'spectrum'
						};
					} else {
						return {
							kind: 'tag'
						};
					}
				}
			})
		];
	}
});
