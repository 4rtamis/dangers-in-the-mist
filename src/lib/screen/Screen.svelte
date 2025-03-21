<script lang="ts">
	import { createSwapy, type SlotItemMapArray, type Swapy, utils } from 'swapy';
	import { onDestroy, onMount, untrack } from 'svelte';
	import Tiptap from './widgets/tiptap/Tiptap.svelte';
	import Placeholder from './widgets/Placeholder.svelte';

	let container: HTMLElement;
	let swapy: Swapy | null = null;
	let dragEnabled = $state(true);

	type Item = {
		id: string;
		type: 'placeholder' | 'editor';
	};

	const initialItems: Item[] = [
		{ id: '1', type: 'placeholder' },
		{ id: '2', type: 'placeholder' },
		{ id: '3', type: 'editor' },
		{ id: '4', type: 'placeholder' }
	];

	let items = $state(initialItems);
	let slotItemMap = $state(utils.initSlotItemMap(initialItems, 'id'));
	let slottedItems = $derived(utils.toSlottedItems(items, 'id', slotItemMap));

	let setSlotItemMap = (value: SlotItemMapArray) => (slotItemMap = value);

	$effect(() => {
		utils.dynamicSwapy(
			swapy,
			items,
			'id',
			untrack(() => slotItemMap),
			setSlotItemMap
		);
	});

	onMount(() => {
		if (container) {
			swapy = createSwapy(container, {
				manualSwap: true,
				swapMode: 'drop',
				enabled: dragEnabled
			});

			swapy.onSwap((event) => {
				requestAnimationFrame(() => {
					slotItemMap = event.newSlotItemMap.asArray;
				});
			});
		}
	});

	onDestroy(() => {
		swapy?.destroy();
	});

	function toggleDrag() {
		dragEnabled = !dragEnabled;
		if (swapy) {
			swapy.enable(dragEnabled);
		}
	}
</script>

<button onclick={toggleDrag} class="mb-4 rounded bg-blue-500 p-2 text-white">
	{dragEnabled ? 'Disable Drag' : 'Enable Drag'}
</button>

<div class="h-full w-full" bind:this={container}>
	<div class="grid grid-cols-4 gap-2">
		{#each slottedItems as { slotId, itemId, item }}
			{#key slotId}
				<div class="slot border p-2" data-swapy-slot={slotId}>
					{#if item}
						{#key itemId}
							<div
								class="flex items-center justify-center border bg-gray-200 p-4"
								data-swapy-item={itemId}
							>
								{#if item.type === 'editor'}
									<Tiptap />
								{:else if item.type === 'placeholder'}
									<Placeholder />
								{/if}
							</div>
						{/key}
					{/if}
				</div>
			{/key}
		{/each}
	</div>
</div>
