<script lang="ts">
	import type { Content, Editor } from '@tiptap/core';
	import type { Transaction } from '@tiptap/pm/state';
	import { Edra, EdraToolbar, EdraBubbleMenu } from '$lib/components/edra/headless/index.js';
	import DragHandle from '$lib/components/edra/drag-handle.svelte';
	import EdraToolBarIcon from '$lib/components/edra/headless/components/EdraToolBarIcon.svelte';
	import { isMac } from '$lib/components/edra/utils.js';
	import defaultContent from './defaultContent';

	// Editor states
	let content = $state<Content>(defaultContent);
	let editor = $state<Editor>();
	let showSlashCommands = $state(true);
	let showLinkBubbleMenu = $state(true);
	let showTableBubbleMenu = $state(true);

	function onUpdate(props: { editor: Editor; transaction: Transaction }) {
		content = props.editor.getJSON();
	}
</script>

<div class="bg-mist-note-box mx-auto flex h-full w-full flex-col rounded-lg p-2">
	{#if editor}
		<!--<div class="p-1">
			
			<EdraToolbar {editor}>
				<EdraToolBarIcon
					command={{
						iconName: 'Bold',
						name: 'bold',
						label: 'Bold',
						shortCuts: [`${isMac ? 'Cmd' : 'Ctrl'}+B`],
						action: (editor) => {
							editor.chain().focus().toggleBold().run();
						}
					}}
					{editor}
				/>
			</EdraToolbar>
		</div>-->
		<!-- Add bubble menu -->
		<EdraBubbleMenu {editor} />
		<!--<DragHandle {editor} /> -->
	{/if}
	<div class="w-full flex-1 overflow-scroll">
		<Edra
			class="edra-note-editor"
			bind:editor
			{content}
			{showSlashCommands}
			{showLinkBubbleMenu}
			{showTableBubbleMenu}
			{onUpdate}
		/>
	</div>
</div>

<style>
	@reference "../../../../app.css";

	:global {
		.edra-note-editor {
			@apply h-full w-full overflow-scroll;
		}

		.edra-note-editor .edra-editor {
			@apply border-mist-note-border h-full w-full space-y-2 overflow-scroll rounded-lg border-3 p-0 font-sans outline-none;

			/* Headings */
			h1 {
				@apply bg-mist-note-border text-mist-note-box font-title w-full py-1 text-2xl font-bold uppercase;
			}

			h2 {
				@apply text-lg font-semibold text-black;
			}

			h3 {
				@apply text-base font-semibold text-black;
			}

			/* Table */
			.tableWrapper {
				@apply m-0 p-0 px-0!;
				margin: 0;
			}

			table {
				border-collapse: collapse;
				margin: 0;
				overflow: hidden;
				table-layout: fixed;
				width: 100%;
				border: none;

				th {
					@apply py-2 text-left align-top font-bold;
				}

				tr {
					@apply odd:bg-black/10 even:bg-transparent;
				}

				td,
				th {
					@apply relative border-0 py-2 text-left align-top;
				}

				td:nth-child(n + 2),
				th:nth-child(n + 2) {
					@apply border-mist-note-border border-l-2;
				}

				.selectedCell:after {
					background: var(--gray-2);
					content: '';
					left: 0;
					right: 0;
					top: 0;
					bottom: 0;
					pointer-events: none;
					position: absolute;
					z-index: 2;
				}

				.column-resize-handle {
					background-color: var(--color-mist-note-border);
					bottom: 0px;
					pointer-events: none;
					position: absolute;
					right: -3px;
					top: 0;
					width: 4px;
				}
			}

			&.resize-cursor {
				cursor: ew-resize;
				cursor: col-resize;
			}

			.tiptap > * {
				@apply px-3;
			}

			th,
			td {
				@apply px-3;
			}

			/* Lines */
			hr {
				@apply border-mist-note-border bg-mist-note-border mx-3 my-2 h-0.5;
			}

			/* Blockquote */
			blockquote {
				@apply border-mist-note-border mx-3 my-2 rounded-lg bg-black/10 p-3 text-black;
			}

			/* Lists */
			ul {
				@apply mb-4 list-inside list-disc pl-6;
			}

			ol {
				@apply mb-4 list-inside list-decimal pl-6;
			}

			/* Style for list items */
			li {
				@apply mb-2 text-base leading-relaxed text-gray-800;
			}

			/* Nested unordered list */
			ul ul {
				@apply mt-2 list-disc pl-5;
			}

			/* Nested ordered list */
			ol ol {
				@apply mt-2 list-decimal pl-5;
			}

			/* Nested unordered inside ordered (and vice versa) */
			ul ol,
			ol ul {
				@apply mt-2 pl-5;
			}

			ul p,
			ol p {
				@apply inline;
			}
		}
	}
</style>
