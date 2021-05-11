/*
	This file is for importing and exporting
	add and edit card callback functions used
	by event listeners associated with callbacks
*/

import {
	addPastCardListener as addPastCard, addAnecdoteCardListener as addAnecdoteCard, 
	addCollaboratorCardListener as addCollaboratorCard, addPresentCardListener as addPresentCard, 
	addFutureCardListener as addFutureCard, addEditingLiteratureTypeListener as addEditingLitTypeCard,
	addEditingGenreListener as addEditingGenreCard, addEditingRateListener as addEditingRateCard,
	addReedmakingCardListener as addReedmakingCard
} from './add';
import {
	editPastCardListener as editPastCard, editAnecdoteCardListener as editAnecdoteCard, 
	editCollaboratorCardListener as editCollaboratorCard, editPresentCardListener as editPresentCard, 
	editFutureCardListener as editFutureCard, editEditingLiteratureTypeListener  as editEditingLitTypeCard,
	editEditingGenreListener as editEditingGenreCard, editEditingRateListener as editEditingRateCard,
	editReedmakingCardListener as editReedmakingCard
} from './edit';

export { 
	addPastCard, addAnecdoteCard, addCollaboratorCard, 
	addPresentCard, addFutureCard, addEditingLitTypeCard,
	addEditingGenreCard, addEditingRateCard, addReedmakingCard,

	editPastCard, editAnecdoteCard, editCollaboratorCard, 
	editPresentCard, editFutureCard, editEditingLitTypeCard,
	editEditingGenreCard, editEditingRateCard, editReedmakingCard
}