import { useQuery } from "@tanstack/react-query";
import * as skillModel from "../dataModel/skillModel";
import { ISkill } from "../interfaces";
import { wait } from "../tools";

export const PageSkills = () => {
	const skillsQuery = useQuery<ISkill[]>({
		queryKey: ["skills"],
		queryFn: () => wait(1000).then(() => skillModel.getSkills()),
	});

	if (skillsQuery.isLoading) {
		return (
			<p>
				{skillsQuery.failureCount > 0
					? "Retrying" + "...".repeat(skillsQuery.failureCount * 3)
					: "Loading..."}
			</p>
		);
	} else {
		skillModel.addSkill();
	}
	
	return (
		<>
			{skillsQuery.data && skillsQuery.data.length > 0 && (
				<>
					<p>There are {skillsQuery.data.length} skills.</p>
				</>
			)}
		</>
	);
};
