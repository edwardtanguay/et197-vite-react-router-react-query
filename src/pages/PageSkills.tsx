import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as skillModel from "../dataModel/skillModel";
import { INewSkill, ISkill } from "../interfaces";
import { wait } from "../tools";

export const PageSkills = () => {
	const queryClient = useQueryClient();

	const skillsQuery = useQuery<ISkill[]>({
		queryKey: ["skills"],
		queryFn: () => wait(1000).then(() => skillModel.getSkills()),
	});

	const newSkillMutation = useMutation({
		mutationFn: async () => {
			const skill: INewSkill = {
				idCode: "from newSkillMutation222",
				name: "NEW SKILL: " + new Date().toISOString(),
				url: "https://onespace.pages.dev/techItems?id=36",
				description:
					"together with React and Vue.js one of the three most popular JavaScript frameworks",
			};
			skillModel.addSkill(skill);
			queryClient.invalidateQueries();
		},
	});

	if (skillsQuery.isLoading) {
		return (
			<p>
				{skillsQuery.failureCount > 0
					? "Retrying" + "...".repeat(skillsQuery.failureCount * 3)
					: "Loading..."}
			</p>
		);
	}

	return (
		<>
			{skillsQuery.data && skillsQuery.data.length > 0 && (
				<>
					<button onClick={() => newSkillMutation.mutate()}>
						Add new skill
					</button>
					<p>There are {skillsQuery.data.length} skills.</p>
				</>
			)}
		</>
	);
};
