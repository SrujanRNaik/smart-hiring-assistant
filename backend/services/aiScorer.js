const model = require('../config/ai');
const scoreResume = async (resumeText, jobTitle, jobDescription, jobRequirements) => {
    const prompt = `
You are an expert technical recruiter with 10 years of experience.
Evaluate the candidate's resume against the job posting below.
JOB TITLE: ${jobTitle}
JOB DESCRIPTION: ${jobDescription}
JOB REQUIREMENTS: ${jobRequirements.join(', ')}
CANDIDATE RESUME:
${resumeText}
Evaluate the candidate and respond with ONLY a valid JSON object.
No explanation. No markdown. No code blocks. Raw JSON only.
Use exactly this format:
{
"fitScore": 78,
// number 0-100. 80+ = strong match, 50-79 = partial, below 50 = weak
"verdict": "shortlist",
// exactly one of: "shortlist", "maybe", "reject"
"strengths": ["Strong React experience", "Good project portfolio"],
// array of 2-4 specific strengths from the resume
"weaknesses": ["No backend experience", "Missing system design skills"]
// array of 2-4 specific gaps vs the job requirements
}
`;
    try {
        const result = await model.generateContent(prompt);
        const reply = result.response.text();
        // Strip markdown code blocks Gemini sometimes adds
        const cleaned = reply.replace(/```json|```/g, '').trim();
        const parsed = JSON.parse(cleaned);
        // Validate the response has all required fields
        if (
            typeof parsed.fitScore !== 'number' ||
            !['shortlist', 'maybe', 'reject'].includes(parsed.verdict) ||
            !Array.isArray(parsed.strengths) ||
            !Array.isArray(parsed.weaknesses)
        ) {
            throw new Error('Invalid AI response format');
        }
        return parsed;
    } catch (error) {
        console.error('AI scoring failed:', error.message);
        // Return a safe fallback so the application still saves
        return {
            fitScore: null,
            verdict: null,
            strengths: [],
            weaknesses: [],
        };
    }
};
module.exports = { scoreResume };