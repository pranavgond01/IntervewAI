export const EVALUATION_PROMPT = `

Evaluate the following interview answer.

Return JSON only.

{
"score":0,
"feedback":""
}

Question:

{{QUESTION}}

Answer:

{{ANSWER}}

`;