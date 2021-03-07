const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

exports.createChat = functions.https.onCall(async (data, context) => {
	try{
		if (!context.auth.uid) {
			return { succes: false, error: 'Invalid Cretentials!' }
		}
		
		const currentUser = await admin.auth().getUser(context.auth.uid)
		const otherUser = await admin.auth().getUserByEmail(data.email)
		
		const members = {}
		members[context.auth.uid] = currentUser.email
		members[otherUser.uid] = otherUser.email
		
		const col = await admin.firestore().collection('Conversations').add({
			members: members
		})
		
		return({success: true, body: {
			id: col.id
		}})
		
	}catch(err){
		console.error(err)
		return {success: false, error: err.message}
	}
	
})