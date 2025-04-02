<script lang="ts">
	import type { Content, Editor } from '@tiptap/core';
	import type { Transaction } from '@tiptap/pm/state';
	import { Edra, EdraToolbar, EdraBubbleMenu } from '$lib/components/edra/headless/index.js';
	import DragHandle from '$lib/components/edra/drag-handle.svelte';
	import EdraToolBarIcon from '$lib/components/edra/headless/components/EdraToolBarIcon.svelte';
	import { isMac } from '$lib/components/edra/utils.js';

	// Editor states
	let content = $state<Content>();
	let editor = $state<Editor>();
	let showSlashCommands = $state(true);
	let showLinkBubbleMenu = $state(true);
	let showTableBubbleMenu = $state(true);

	function onUpdate(props: { editor: Editor; transaction: Transaction }) {
		content = props.editor.getJSON();
	}
</script>

<div class="bg-mist-note-box mx-auto h-full w-full rounded-lg p-2">
	{#if editor}
		<div class=" p-1">
			<!-- Customized Edra toolbar -->
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
		</div>
		<!-- Add bubble menu -->
		<EdraBubbleMenu {editor} />
		<DragHandle {editor} />
	{/if}
	<div class="w-full">
		<Edra
			class="h-full overflow-auto"
			bind:editor
			{content}
			{showSlashCommands}
			{showLinkBubbleMenu}
			{showTableBubbleMenu}
			{onUpdate}
		/>
	</div>
</div>
