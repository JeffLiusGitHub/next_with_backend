import fs from 'fs';
import path from 'path';

export const buildFeedbackPath = () => {
	const filePath = path.join(process.cwd(), 'data', 'feedback.json');
	return filePath;
};

export const extractFeedback = (filePath) => {
	const fileData = fs.readFileSync(filePath);
	const data = JSON.parse(fileData);
	return data;
};

function handler(req, res) {
	if (req.method === 'POST') {
		const email = req.body.email;
		const feedbackText = req.body.text;
		const newFeedback = {
			id: new Date().toISOString(),
			email: email,
			text: feedbackText,
		};
		const filePath = buildFeedbackPath();
		const data = extractFeedback(filePath);
		data.push(newFeedback);
		fs.writeFileSync(filePath, JSON.stringify(data));
		res.status(201).json({ message: 'success', feedback: newFeedback });
	}
	if (req.method === 'GET') {
		const filePath = buildFeedbackPath();
		const data = extractFeedback(filePath);
		res.status(200).json({ message: 'success', feedback: data });
	}
	// res.status(200).json({ message: 'success' });
}
export default handler;
