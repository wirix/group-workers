
class GroupController {
	async create(req, res, next) {
		try {
			console.log('2');
		} catch (e) {
			next(e);
		}
	}

	async remove(req, res, next) {
		try {
			console.log('2');
		} catch (e) {
			next(e);
		}
	}

	async changeSettings(req, res, next) {
		try {
			console.log('2');
		} catch (e) {
			next(e);
		}
	}

}

export const groupController = new GroupController();
