import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as flashcardModel from "../dataModel/flashcardModel";
import { INewFlashcard, IFlashcard } from "../interfaces";
import { wait } from "../tools";
import { useEffect } from "react";

export const PageFlashcards = () => {
	const queryClient = useQueryClient();

	useEffect(() => {
		queryClient.invalidateQueries({ queryKey: ["flashcards"] });
	}, [queryClient]);

	const flashcardsQuery = useQuery<IFlashcard[]>({
		queryKey: ["flashcards"],
		queryFn: () => wait(1000).then(() => flashcardModel.getFlashcards()),
	});

	const newFlashcardMutation = useMutation({
		mutationFn: async () => {
			const flashcard: INewFlashcard = {
				front: 'fff',
				back: "ccc",
			};
			flashcardModel.addFlashcard(flashcard);
			queryClient.invalidateQueries({ queryKey: ["flashcards"] });
		},
	});

	if (flashcardsQuery.isLoading) {
		return (
			<p>
				{flashcardsQuery.failureCount > 0
					? "Retrying" + "...".repeat(flashcardsQuery.failureCount * 3)
					: "Loading..."}
			</p>
		);
	}

	return (
		<>
			{flashcardsQuery.data && flashcardsQuery.data.length > 0 && (
				<>
					<button onClick={() => newFlashcardMutation.mutate()}>
						Add new flashcard
					</button>
					<p>There are {flashcardsQuery.data.length} flashcards.</p>
				</>
			)}
		</>
	);
};
