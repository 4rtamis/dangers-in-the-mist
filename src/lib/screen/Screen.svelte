<script lang="ts">
	import { createSwapy, type SlotItemMapArray, type Swapy, utils } from 'swapy';
	import { onDestroy, onMount, untrack } from 'svelte';

	let container: HTMLElement;
	let swapy: Swapy | null = null;

	type Item = {
		id: string;
		title: string;
	};

	const initialItems: Item[] = [
		{ id: '1', title: '1' },
		{ id: '2', title: '2' },
		{ id: '3', title: '3' },
		{ id: '4', title: '4' },
		{ id: '5', title: '5' },
		{ id: '6', title: '6' },
		{ id: '7', title: '7' },
		{ id: '8', title: '8' },
		{ id: '9', title: '9' },
		{ id: '10', title: '10' },
		{ id: '11', title: '11' },
		{ id: '12', title: '12' }
	];

	let items = $state(initialItems);
	let id = $state(4);

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
				// animation: 'dynamic'
				// autoScrollOnDrag: true,
				swapMode: 'drop'
				// enabled: true,
				// dragAxis: 'x',
				// dragOnHold: true
			});

			swapy.onSwapStart((event) => {
				console.log('start', event);
			});

			swapy.onSwap((event) => {
				requestAnimationFrame(() => {
					slotItemMap = event.newSlotItemMap.asArray;
				});
			});

			swapy.onSwapEnd((event) => {
				console.log('end', event);
			});
		}
	});

	onDestroy(() => {
		swapy?.destroy();
	});
</script>

<div class="h-full w-full" bind:this={container}>
	<div class=" w-fulll grid h-full grid-cols-4">
		{#each slottedItems as { slotId, itemId, item }}
			{#key slotId}
				<div class="slot h-full data-swapy-highlighted:bg-red-300" data-swapy-slot={slotId}>
					{#if item}
						{#key itemId}
							<div
								class="item flex h-full w-full items-center justify-center border-2 border-red-600 bg-red-400"
								data-swapy-item={itemId}
							>
								<span class="font-title text-center text-5xl font-black">{item.title}</span>
								<button
									aria-label="delete"
									class="hidden"
									data-swapy-no-drag
									onclick={() => {
										items = items.filter((i) => i.id !== item.id);
									}}
								></button>
							</div>
						{/key}
					{/if}
				</div>
			{/key}
		{/each}
	</div>
	<button
		class="item item--add"
		onclick={() => {
			const newItem: Item = { id: `${id}`, title: `${id}` };
			items.push(newItem);
			id++;
		}}>+</button
	>
</div>
