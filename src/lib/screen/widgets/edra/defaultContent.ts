export default {
	type: 'doc',
	content: [
		{
			type: 'heading',
			attrs: { textAlign: null, level: 1 },
			content: [{ type: 'text', text: 'Player Moves' }]
		},
		{
			type: 'paragraph',
			attrs: { textAlign: null, class: null },
			content: [
				{ type: 'text', text: 'When a PC ' },
				{ type: 'text', marks: [{ type: 'bold' }], text: 'Investigates' },
				{
					type: 'text',
					text: ' and scores a 7-9, or as a hard move, you can choose to ask the player about their me that Martha knows it (per her custom move '
				},
				{ type: 'text', marks: [{ type: 'bold' }], text: 'Pain Behind the Eyes' },
				{
					type: 'text',
					text: "). This is a good chance to give the character's themes and backstory some airtime.\n"
				}
			]
		},
		{
			type: 'table',
			content: [
				{
					type: 'tableRow',
					content: [
						{
							type: 'tableCell',
							attrs: { colspan: 3, rowspan: 1, colwidth: null, style: null },
							content: [
								{
									type: 'paragraph',
									attrs: { textAlign: null, class: null },
									content: [{ type: 'text', text: "When the PC's action primary goal is to..." }]
								}
							]
						}
					]
				},
				{
					type: 'tableRow',
					content: [
						{
							type: 'tableCell',
							attrs: { colspan: 1, rowspan: 1, colwidth: null, style: null },
							content: [
								{
									type: 'paragraph',
									attrs: { textAlign: null, class: null },
									content: [
										{
											type: 'text',
											marks: [{ type: 'bold' }],
											text: 'Gain an advantage or remedy a disadvantage'
										},
										{ type: 'text', text: '(generate Juice)' }
									]
								}
							]
						},
						{
							type: 'tableCell',
							attrs: { colspan: 1, rowspan: 1, colwidth: null, style: null },
							content: [
								{
									type: 'paragraph',
									attrs: { textAlign: null, class: null },
									content: [
										{
											type: 'text',
											text: 'Heal an ally, shake off a negative effect, create or obtain something useful, weaken a foe, change the environment as support (add/burn tag, give/remove status)'
										}
									]
								}
							]
						},
						{
							type: 'tableCell',
							attrs: { colspan: 1, rowspan: 1, colwidth: null, style: null },
							content: [
								{
									type: 'paragraph',
									attrs: { textAlign: null, class: null },
									content: [{ type: 'text', marks: [{ type: 'bold' }], text: 'CHANGE THE GAME' }]
								}
							]
						}
					]
				},
				{
					type: 'tableRow',
					content: [
						{
							type: 'tableCell',
							attrs: { colspan: 1, rowspan: 1, colwidth: null, style: null },
							content: [
								{
									type: 'paragraph',
									attrs: { textAlign: null, class: null },
									content: [
										{ type: 'text', marks: [{ type: 'bold' }], text: 'Get someone to do something' }
									]
								}
							]
						},
						{
							type: 'tableCell',
							attrs: { colspan: 1, rowspan: 1, colwidth: null, style: null },
							content: [
								{
									type: 'paragraph',
									attrs: { textAlign: null, class: null },
									content: [
										{
											type: 'text',
											text: 'Intimidate, persuade, command, charm, seduce, negotiate'
										}
									]
								}
							]
						},
						{
							type: 'tableCell',
							attrs: { colspan: 1, rowspan: 1, colwidth: null, style: null },
							content: [
								{
									type: 'paragraph',
									attrs: { textAlign: null, class: null },
									content: [{ type: 'text', marks: [{ type: 'bold' }], text: 'CONVINCE' }]
								}
							]
						}
					]
				},
				{
					type: 'tableRow',
					content: [
						{
							type: 'tableCell',
							attrs: { colspan: 1, rowspan: 1, colwidth: null, style: null },
							content: [
								{
									type: 'paragraph',
									attrs: { textAlign: null, class: null },
									content: [
										{
											type: 'text',
											marks: [{ type: 'bold' }],
											text: 'Reduce or avoid an incoming status'
										}
									]
								}
							]
						},
						{
							type: 'tableCell',
							attrs: { colspan: 1, rowspan: 1, colwidth: null, style: null },
							content: [
								{
									type: 'paragraph',
									attrs: { textAlign: null, class: null },
									content: [
										{
											type: 'text',
											text: 'Block, dodge, parry, resist effect, withstand or ignore an attack or an attempt to influence'
										}
									]
								}
							]
						},
						{
							type: 'tableCell',
							attrs: { colspan: 1, rowspan: 1, colwidth: null, style: null },
							content: [
								{
									type: 'paragraph',
									attrs: { textAlign: null, class: null },
									content: [{ type: 'text', marks: [{ type: 'bold' }], text: 'FACE DANGER' }]
								}
							]
						}
					]
				},
				{
					type: 'tableRow',
					content: [
						{
							type: 'tableCell',
							attrs: { colspan: 1, rowspan: 1, colwidth: null, style: null },
							content: [
								{
									type: 'paragraph',
									attrs: { textAlign: null, class: null },
									content: [
										{ type: 'text', marks: [{ type: 'bold' }], text: 'Overcome the opposition' },
										{ type: 'text', text: '(whether to secure a goal or to harm someone)' }
									]
								}
							]
						},
						{
							type: 'tableCell',
							attrs: { colspan: 1, rowspan: 1, colwidth: null, style: null },
							content: [
								{
									type: 'paragraph',
									attrs: { textAlign: null, class: null },
									content: [
										{
											type: 'text',
											text: 'Seize an object, person, or position under contention, outrun / outsmart / outmaneuver / overpower someone, attack a defensive opponent'
										}
									]
								}
							]
						},
						{
							type: 'tableCell',
							attrs: { colspan: 1, rowspan: 1, colwidth: null, style: null },
							content: [
								{
									type: 'paragraph',
									attrs: { textAlign: null, class: null },
									content: [{ type: 'text', marks: [{ type: 'bold' }], text: 'GO TOE TO TOE' }]
								}
							]
						}
					]
				},
				{
					type: 'tableRow',
					content: [
						{
							type: 'tableCell',
							attrs: { colspan: 1, rowspan: 1, colwidth: null, style: null },
							content: [
								{
									type: 'paragraph',
									attrs: { textAlign: null, class: null },
									content: [
										{
											type: 'text',
											marks: [{ type: 'bold' }],
											text: 'Harm someone or something that is open to attack'
										},
										{ type: 'text', text: '(give a status)' }
									]
								}
							]
						},
						{
							type: 'tableCell',
							attrs: { colspan: 1, rowspan: 1, colwidth: null, style: null },
							content: [
								{
									type: 'paragraph',
									attrs: { textAlign: null, class: null },
									content: [
										{
											type: 'text',
											text: 'Attack at a moment of opportunity or vulnerability: punch, blast, shoot, stab, put a spell on someone, cause social or financial harm'
										}
									]
								}
							]
						},
						{
							type: 'tableCell',
							attrs: { colspan: 1, rowspan: 1, colwidth: null, style: null },
							content: [
								{
									type: 'paragraph',
									attrs: { textAlign: null, class: null },
									content: [
										{ type: 'text', marks: [{ type: 'bold' }], text: "HIT WITH ALL YOU'VE GOT" }
									]
								}
							]
						}
					]
				},
				{
					type: 'tableRow',
					content: [
						{
							type: 'tableCell',
							attrs: { colspan: 1, rowspan: 1, colwidth: null, style: null },
							content: [
								{
									type: 'paragraph',
									attrs: { textAlign: null, class: null },
									content: [
										{
											type: 'text',
											marks: [{ type: 'bold' }],
											text: 'Gather any kind of information'
										},
										{ type: 'text', text: '(generate Clues)' }
									]
								}
							]
						},
						{
							type: 'tableCell',
							attrs: { colspan: 1, rowspan: 1, colwidth: null, style: null },
							content: [
								{
									type: 'paragraph',
									attrs: { textAlign: null, class: null },
									content: [
										{
											type: 'text',
											text: 'Observe, search, study, call contacts, ask around, contact or tap into otherworldly knowledge'
										}
									]
								}
							]
						},
						{
							type: 'tableCell',
							attrs: { colspan: 1, rowspan: 1, colwidth: null, style: null },
							content: [
								{
									type: 'paragraph',
									attrs: { textAlign: null, class: null },
									content: [
										{ type: 'text', marks: [{ type: 'bold' }], text: 'INVESTIGATE' },
										{ type: 'text', text: 'or' },
										{ type: 'text', marks: [{ type: 'bold' }], text: 'LOOK BEYOND THE MIST' }
									]
								}
							]
						}
					]
				},
				{
					type: 'tableRow',
					content: [
						{
							type: 'tableCell',
							attrs: { colspan: 1, rowspan: 1, colwidth: null, style: null },
							content: [
								{
									type: 'paragraph',
									attrs: { textAlign: null, class: null },
									content: [
										{ type: 'text', marks: [{ type: 'bold' }], text: 'Hide' },
										{ type: 'text', text: 'herself, her motives, her actions, or her allies' }
									]
								}
							]
						},
						{
							type: 'tableCell',
							attrs: { colspan: 1, rowspan: 1, colwidth: null, style: null },
							content: [
								{
									type: 'paragraph',
									attrs: { textAlign: null, class: null },
									content: [
										{
											type: 'text',
											text: 'Lie undetected, sneak, pickpocket, impersonate, follow someone, avoid electronic or magical detection'
										}
									]
								}
							]
						},
						{
							type: 'tableCell',
							attrs: { colspan: 1, rowspan: 1, colwidth: null, style: null },
							content: [
								{
									type: 'paragraph',
									attrs: { textAlign: null, class: null },
									content: [{ type: 'text', marks: [{ type: 'bold' }], text: 'SNEAK AROUND' }]
								}
							]
						}
					]
				},
				{
					type: 'tableRow',
					content: [
						{
							type: 'tableCell',
							attrs: { colspan: 1, rowspan: 1, colwidth: null, style: null },
							content: [
								{
									type: 'paragraph',
									attrs: { textAlign: null, class: null },
									content: [
										{
											type: 'text',
											marks: [{ type: 'bold' }],
											text: 'Perform a dangerous task under pressure'
										}
									]
								}
							]
						},
						{
							type: 'tableCell',
							attrs: { colspan: 1, rowspan: 1, colwidth: null, style: null },
							content: [
								{
									type: 'paragraph',
									attrs: { textAlign: null, class: null },
									content: [
										{
											type: 'text',
											text: 'Acrobatics, athletics, break a fall, climbing, high-speed or combat driving or piloting, picking a lock or cracking a safe, gambling, anything involving high risk'
										}
									]
								}
							]
						},
						{
							type: 'tableCell',
							attrs: { colspan: 1, rowspan: 1, colwidth: null, style: null },
							content: [
								{
									type: 'paragraph',
									attrs: { textAlign: null, class: null },
									content: [{ type: 'text', marks: [{ type: 'bold' }], text: 'TAKE THE RISK' }]
								}
							]
						}
					]
				},
				{
					type: 'tableRow',
					content: [
						{
							type: 'tableCell',
							attrs: { colspan: 3, rowspan: 1, colwidth: null, style: null },
							content: [
								{
									type: 'paragraph',
									attrs: { textAlign: null, class: null },
									content: [
										{ type: 'text', text: "When the PC's action" },
										{
											type: 'text',
											marks: [{ type: 'bold' }],
											text: 'exceeds the agreed scope or use of her powers'
										},
										{ type: 'text', text: ', the player must' },
										{ type: 'text', marks: [{ type: 'bold' }], text: 'STOP. HOLDING. BACK.' },
										{ type: 'text', text: 'and hope!' }
									]
								}
							]
						}
					]
				},
				{
					type: 'tableRow',
					content: [
						{
							type: 'tableCell',
							attrs: { colspan: 3, rowspan: 1, colwidth: null, style: null },
							content: [
								{
									type: 'paragraph',
									attrs: { textAlign: null, class: null },
									content: [
										{ type: 'text', text: "When the PC's action" },
										{
											type: 'text',
											marks: [{ type: 'bold' }],
											text: 'goes against her Mysteries or Identities'
										},
										{ type: 'text', text: ', the player can, at his option,' },
										{ type: 'text', marks: [{ type: 'bold' }], text: 'MAKE A HARD CHOICE' },
										{ type: 'text', text: '.' }
									]
								}
							]
						}
					]
				}
			]
		}
	]
};
