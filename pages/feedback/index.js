import { useState } from 'react';
import { buildFeedbackPath, extractFeedback } from '../api/feedback';
export default function Feedback(props) {
	const loadFeedbackHandler = async (id) => {
		const res = await fetch(`/api/${id}`);
		const { feedback } = await res.json();
		setFeedbackData(feedback);
	};
	const [feedbackData, setFeedbackData] = useState();
	console.log(feedbackData);
	return (
		<div>
			{feedbackData && <p>{feedbackData.email}</p>}
			<ul>
				{props.data.map((f) => (
					<li key={f.id}>
						{f.text}
						<button onClick={loadFeedbackHandler.bind(null, f.id)}>
							Show details
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export async function getStaticProps(ctx) {
	// const res = await fetch('http://localhost:3000/api/feedback');
	// const { feedback } = await res.json();
	const filePath = buildFeedbackPath();
	const data = extractFeedback(filePath);
	return {
		props: {
			data,
		},
	};
}
