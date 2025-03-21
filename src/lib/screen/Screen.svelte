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
		{ id: '3', type: 'placeholder' },
		{ id: '4', type: 'placeholder' },
		{ id: '5', type: 'placeholder' },
		{ id: '6', type: 'placeholder' },
		{ id: '7', type: 'placeholder' },
		{ id: '8', type: 'placeholder' },
		{ id: '9', type: 'placeholder' },
		{ id: '10', type: 'placeholder' },
		{ id: '11', type: 'placeholder' },
		{ id: '12', type: 'placeholder' }
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

<button onclick={toggleDrag} class="bg-mist-status mb-4 cursor-pointer rounded p-2 text-black">
	{dragEnabled ? 'Disable Drag' : 'Enable Drag'}
</button>

<div class="h-full w-full" bind:this={container}>
	<div class="grid h-full w-full grid-cols-4 place-items-stretch gap-1">
		{#each slottedItems as { slotId, itemId, item }}
			{#key slotId}
				<div class="bg rounded bg-black/5 p-2" data-swapy-slot={slotId}>
					{#if item}
						{#key itemId}
							<div class="h-full w-full" data-swapy-item={itemId}>
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
