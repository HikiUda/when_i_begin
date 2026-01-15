// kingIsUnderAttack2(whitePlayer: Player | null, blackPlayer: Player | null) {
// 	for (let i = 0; i < this.cells.length; i++) {
// 		const row = this.cells[i];
// 		for (let j = 0; j < row.length; j++) {
// 			const checkFigure = row[j];
// 			if (checkFigure.figure) {
// 				for (let i2 = 0; i2 < this.cells.length; i2++) {
// 					const row2 = this.cells[i2];
// 					for (let j2 = 0; j2 < row2.length; j2++) {
// 						const checkFigure2 = row2[j2];
// 						checkFigure.figure.canMove(checkFigure2);
// 					}
// 				}
// 			}
// 		}
// 	}

// 	if (whitePlayer && blackPlayer) {
// 		if (this.whiteKing?.cell.available) {
// 			whitePlayer.isCheck = true;
// 		} else {
// 			whitePlayer.isCheck = false;
// 		}
// 		if (this.blackKing?.cell.available) {
// 			blackPlayer.isCheck = true;
// 			console.log('w', blackPlayer.isCheck);
// 		} else {
// 			blackPlayer.isCheck = false;
// 		}
// 	}
// }

export const u = 1;
