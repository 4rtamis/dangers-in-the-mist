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

	type Slot = {
		id: string;
		rowSpan: number;
		colSpan: number;
	};

	let initialSlots: Slot[] = [
		{ id: 'slot-1', rowSpan: 1, colSpan: 1 },
		{ id: 'slot-2', rowSpan: 1, colSpan: 1 },
		{ id: 'slot-3', rowSpan: 1, colSpan: 1 },
		{ id: 'slot-4', rowSpan: 1, colSpan: 1 },
		{ id: 'slot-5', rowSpan: 1, colSpan: 1 },
		{ id: 'slot-6', rowSpan: 1, colSpan: 1 },
		{ id: 'slot-7', rowSpan: 1, colSpan: 1 },
		{ id: 'slot-8', rowSpan: 1, colSpan: 1 },
		{ id: 'slot-9', rowSpan: 1, colSpan: 1 },
		{ id: 'slot-10', rowSpan: 1, colSpan: 1 },
		{ id: 'slot-11', rowSpan: 1, colSpan: 1 },
		{ id: 'slot-12', rowSpan: 1, colSpan: 1 }
	];

	const initialItems: Item[] = [
		{ id: '1', type: 'placeholder' },
		{ id: '2', type: 'placeholder' },
		{ id: '3', type: 'placeholder' },
		{ id: '4', type: 'placeholder' },
		{ id: '5', type: 'placeholder' },
		{ id: '6', type: 'placeholder' },
		{ id: '7', type: 'placeholder' }
	];

	function initSlotItemMap<Item>(
		slots: Slot[],
		items: Item[],
		idField: keyof Item
	): SlotItemMapArray {
		return slots.map((slot, index) => ({
			item: items[index] ? (items[index][idField] as string) : '',
			slot: slot.id
		}));
	}

	let slots = $state(initialSlots);
	let items = $state(initialItems);
	let slotItemMap = $state(initSlotItemMap(initialSlots, initialItems, 'id'));
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

	// Resizing Logic
	let resizingSlot: string | null = null;

	function startResizing(event: MouseEvent, slotId: string) {
		event.preventDefault();
		resizingSlot = slotId;

		window.addEventListener('mousemove', resizeSlot);
		window.addEventListener('mouseup', stopResizing);
	}

	function resizeSlot(event: MouseEvent) {
		if (!resizingSlot) return;

		let slot = slots.find((s) => s.id === resizingSlot);
		if (!slot) return;

		// Calculate new size based on cursor movement
		if (event.movementX > 5) slot.colSpan = Math.min(slot.colSpan + 1, 4);
		if (event.movementX < -5) slot.colSpan = Math.max(slot.colSpan - 1, 1);
		if (event.movementY > 5) slot.rowSpan = Math.min(slot.rowSpan + 1, 4);
		if (event.movementY < -5) slot.rowSpan = Math.max(slot.rowSpan - 1, 1);

		// Update state
		slots = [...slots];
	}

	function stopResizing() {
		resizingSlot = null;
		window.removeEventListener('mousemove', resizeSlot);
		window.removeEventListener('mouseup', stopResizing);
	}
</script>

<button onclick={toggleDrag} class="bg-mist-status mb-4 cursor-pointer rounded p-2 text-black">
	{dragEnabled ? 'Disable Drag' : 'Enable Drag'}
</button>

<div class="h-full w-full" bind:this={container}>
	<div class="grid h-full w-full auto-rows-[100px] grid-cols-4 gap-1">
		{#each slottedItems as { slotId, itemId, item }, index}
			{#key slotId}
				{#if slots[index]}
					<div
						class="bg relative rounded bg-black/5 p-2"
						data-swapy-slot={slotId}
						style="grid-column: span {slots[index].colSpan}; grid-row: span {slots[index].rowSpan};"
					>
						{#if item}
							{#key itemId}
								<div class="h-full w-full" data-swapy-item={itemId}>
									{#if item.type === 'editor'}
										<Tiptap />
									{:else if item.type === 'placeholder'}
										<Placeholder />
									{/if}
									<!-- Resize Handle -->
									<div
										class="resize-handle absolute right-0 bottom-0 h-4 w-4 cursor-se-resize bg-blue-500"
										onmousedown={(event) => startResizing(event, slotId)}
									></div>
								</div>
							{/key}
						{/if}
					</div>
				{/if}
			{/key}
		{/each}
	</div>
</div>

<style>
	.resize-handle {
		width: 12px;
		height: 12px;
		background: blue;
		position: absolute;
		bottom: 2px;
		right: 2px;
		cursor: se-resize;
		border-radius: 50%;
	}
</style>
