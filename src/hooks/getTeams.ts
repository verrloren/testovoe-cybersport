

// export async function getTeams() {
//   try {
//     const teams = await db.team.findMany({
//       select: {
// 				id: true,
// 				name: true,
// 				members: {
// 					select: {
// 						id: true,
// 						name: true,
// 						taroCard: true,
// 						dateOfBirth: true,
// 					},
// 				},
// 			}
//     });
//     return teams.map(team => ({
//       ...team,
//     }));
//   } catch (error) {
//     console.error("Error fetching teams:", error);
//     throw error;
//   }
// }

// export async function getTeamNameById(teamId: string): Promise<string | null> {
//   try {
//     const team = await db.team.findUnique({
//       where: {
//         id: teamId
//       },
//       select: {
//         name: true
//       }
//     });

//     if (!team) {
//       return null;
//     }

//     return team.name;
//   } catch (error) {
//     console.error(`Error fetching team name for ID ${teamId}:`, error);
//     throw error;
//   }
// }