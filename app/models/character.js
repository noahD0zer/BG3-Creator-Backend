const mongoose = require('mongoose')


const charSchema = new mongoose.Schema(
	{
		name: {
			type: String,
		},
		background: {
			type: String,

		},
		race: {
			type: String,

		},
        characterClass: {
			type: String,

		},
        weaponProficiencies: [String],
		armorProficiencies: [String],
		skillProficiencies: [String],
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
	},
	{
		timestamps: true,
		toObject: { virtuals: true },
		toJSON: { virtuals: true }
	}
)


module.exports = mongoose.model('Character', charSchema)